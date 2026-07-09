import Fastify, { type FastifyReply } from 'fastify';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSystemPrompt, personas, type PersonaId, type UserLevelContext } from './personas.js';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequestBody {
  persona?: PersonaId;
  messages?: ChatMessage[];
  userLevel?: UserLevelContext;
}

const port = Number(process.env.SERVER_PORT ?? 3000);
const ollamaUrl = (process.env.OLLAMA_URL ?? 'http://127.0.0.1:11434').replace(/\/$/, '');
const primaryModel = process.env.MODEL_NAME ?? 'llama3.1:8b-instruct';
const fallbackModel = process.env.FALLBACK_MODEL ?? 'qwen2.5:7b';
const app = Fastify({ logger: false });

const mimeTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ogg': 'audio/ogg',
  '.woff2': 'font/woff2',
};

function sendSse(reply: FastifyReply, payload: unknown): void {
  reply.raw.write(`data: ${JSON.stringify(payload)}\n\n`);
}

async function pingOllama(): Promise<{ ok: boolean; models: string[] }> {
  try {
    const res = await fetch(`${ollamaUrl}/api/tags`, { signal: AbortSignal.timeout(1400) });
    if (!res.ok) return { ok: false, models: [] };
    const data = (await res.json()) as { models?: Array<{ name?: string }> };
    return { ok: true, models: (data.models ?? []).map((model) => model.name ?? '').filter(Boolean) };
  } catch {
    return { ok: false, models: [] };
  }
}

app.get('/api/health', async () => {
  const health = await pingOllama();
  return {
    ok: health.ok,
    persona: personas.esperanza.displayName,
    models: health.models,
    preferredModel: primaryModel,
    fallbackModel,
  };
});

app.post<{ Body: ChatRequestBody }>('/api/chat', async (request, reply) => {
  const body = request.body ?? {};
  const persona = body.persona ?? 'esperanza';
  const system = buildSystemPrompt(persona, body.userLevel ?? {});
  const messages: ChatMessage[] = [
    { role: 'system', content: system },
    ...(body.messages ?? []).filter((msg) => msg.role !== 'system'),
  ];

  reply.raw.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  const tryModels = [primaryModel, fallbackModel].filter((value, index, arr) => value && arr.indexOf(value) === index);

  for (const model of tryModels) {
    try {
      const upstream = await fetch(`${ollamaUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages, stream: true }),
        signal: AbortSignal.timeout(90000),
      });

      if (!upstream.ok || !upstream.body) continue;

      const reader = upstream.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.trim()) continue;
          const chunk = JSON.parse(line) as { done?: boolean; message?: { content?: string } };
          if (chunk.message?.content) sendSse(reply, { message: { content: chunk.message.content } });
          if (chunk.done) {
            reply.raw.write('data: [DONE]\n\n');
            reply.raw.end();
            return reply;
          }
        }
      }
    } catch {
      continue;
    }
  }

  sendSse(reply, { error: 'curandera_asleep' });
  reply.raw.write('data: [DONE]\n\n');
  reply.raw.end();
  return reply;
});

const distDir = normalize(fileURLToPath(new URL('../dist', import.meta.url)));

app.get('/*', async (request, reply) => {
  const urlPath = decodeURIComponent(request.url.split('?')[0] ?? '/');
  const safePath = normalize(urlPath === '/' ? '/index.html' : urlPath);
  const candidate = normalize(join(distDir, safePath));
  const filePath = candidate.startsWith(distDir) && existsSync(candidate) && statSync(candidate).isFile()
    ? candidate
    : join(distDir, 'index.html');

  if (!existsSync(filePath)) {
    reply.code(503).type('text/plain; charset=utf-8');
    return 'La ruta todavía no fue tejida. Uruchom najpierw npm run build.';
  }

  const mime = mimeTypes[extname(filePath)] ?? 'application/octet-stream';
  reply.type(mime);
  if (filePath.endsWith('.html')) {
    return readFile(filePath, 'utf8');
  }
  return reply.send(createReadStream(filePath));
});

app.listen({ port, host: '127.0.0.1' }).then(() => {
  console.log(`Cinco Reinos nasłuchuje na http://127.0.0.1:${port}`);
});
