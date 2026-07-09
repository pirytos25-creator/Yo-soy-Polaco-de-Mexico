import type { ReinoId } from '../data/vocab.generated';

export type Route =
  | { name: 'portada' }
  | { name: 'mapa' }
  | { name: 'reino'; reino: ReinoId }
  | { name: 'biblioteca'; reino?: ReinoId }
  | { name: 'curandera'; persona?: string }
  | { name: 'talismanes' }
  | { name: 'pacto' }
  | { name: 'game'; game: 'loteria' | 'mercado' | 'tejedora' | 'carnaval'; reino?: ReinoId };

const reinoIds = ['pueblo', 'selva', 'desierto', 'montanas', 'ciudad'] as const;

export function parseRoute(hash: string): Route {
  const clean = hash.replace(/^#\/?/, '');
  const parts = clean.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'portada' };
  if (parts[0] === 'mapa') return { name: 'mapa' };
  if (parts[0] === 'reino' && isReino(parts[1])) return { name: 'reino', reino: parts[1] };
  if (parts[0] === 'biblioteka') return { name: 'biblioteca', reino: isReino(parts[1]) ? parts[1] : undefined };
  if (parts[0] === 'curandera') return { name: 'curandera', persona: parts[1] };
  if (parts[0] === 'talismanes') return { name: 'talismanes' };
  if (parts[0] === 'pacto') return { name: 'pacto' };
  if (parts[0] === 'gra' && isGame(parts[1])) return { name: 'game', game: parts[1], reino: isReino(parts[2]) ? parts[2] : undefined };
  return { name: 'mapa' };
}

export function routeToHash(route: Route): string {
  if (route.name === 'portada') return '#/';
  if (route.name === 'mapa') return '#/mapa';
  if (route.name === 'reino') return `#/reino/${route.reino}`;
  if (route.name === 'biblioteca') return route.reino ? `#/biblioteka/${route.reino}` : '#/biblioteka';
  if (route.name === 'curandera') return route.persona ? `#/curandera/${route.persona}` : '#/curandera';
  if (route.name === 'game') return route.reino ? `#/gra/${route.game}/${route.reino}` : `#/gra/${route.game}`;
  return `#/${route.name}`;
}

function isReino(value: string | undefined): value is ReinoId {
  return reinoIds.includes(value as ReinoId);
}

function isGame(value: string | undefined): value is 'loteria' | 'mercado' | 'tejedora' | 'carnaval' {
  return value === 'loteria' || value === 'mercado' || value === 'tejedora' || value === 'carnaval';
}
