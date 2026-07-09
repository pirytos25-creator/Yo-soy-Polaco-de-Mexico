import type { UserState } from '../core/state';

export interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

export async function healthCheck(): Promise<{ ok: boolean; preferredModel: string; fallbackModel: string; models: string[] }> {
  const res = await fetch('/api/health');
  if (!res.ok) throw new Error('curandera_asleep');
  return (await res.json()) as { ok: boolean; preferredModel: string; fallbackModel: string; models: string[] };
}

export async function* streamChat(persona: string, messages: Msg[], userState: UserState): AsyncGenerator<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      persona,
      messages,
      userLevel: {
        ranga: userState.ranga,
        ostatnieKrolestwo: favoriteReino(userState),
        slowaDzis: userState.learnedEntries.length,
        slabosci: ['rodzajniki', 'ser vs estar', 'naturalne pytania'],
      },
    }),
  });

  if (!res.ok || !res.body) throw new Error('curandera_asleep');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) return;
    buffer += decoder.decode(value);
    const lines = buffer.split('\n\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (payload === '[DONE]') return;
      const chunk = JSON.parse(payload) as { error?: string; message?: { content?: string } };
      if (chunk.error === 'curandera_asleep') throw new Error('curandera_asleep');
      if (chunk.message?.content) yield chunk.message.content;
    }
  }
}

function favoriteReino(state: UserState): string {
  const [id] = Object.entries(state.reputacja).sort((a, b) => b[1] - a[1])[0] ?? ['pueblo'];
  return id;
}
