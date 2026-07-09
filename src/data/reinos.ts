import type { ReinoId } from './vocab.generated';

export interface Reino {
  id: ReinoId;
  nombre: string;
  tituloPl: string;
  tema: string;
  foco: string;
  color: string;
  secondary: string;
  accent: string;
  shadow: string;
  elemento: string;
  persona: 'esperanza' | 'jaguar' | 'tejedora' | 'cantor' | 'diego';
  entrada: string;
  promesa: string;
}

export const reinos: Reino[] = [
  {
    id: 'pueblo',
    nombre: 'El Pueblo del Alba',
    tituloPl: 'Miasto Świtu',
    tema: 'gliniane domy, targ i pierwsze rozmowy przy porannym ogniu',
    foco: 'powitania, rodzina, dom, jedzenie i najprostsze zdania',
    color: '#D2691E',
    secondary: '#F4A261',
    accent: '#FCE38A',
    shadow: '#6B2A0B',
    elemento: 'ogień',
    persona: 'esperanza',
    entrada: 'Brama z terakoty pachnie kawą, chlebem i świeżym dymem.',
    promesa: 'Tu uczysz się mówić pierwsze zdania tak, żeby brzmiały żywo, nie podręcznikowo.',
  },
  {
    id: 'selva',
    nombre: 'La Selva de Jade',
    tituloPl: 'Nefrytowa Dżungla',
    tema: 'mokre liście, jaguarze ślady, kolory i ciało zanurzone w zieleni',
    foco: 'natura, zwierzęta, kolory, ciało i uważne opisywanie świata',
    color: '#0F7A5A',
    secondary: '#2A9D8F',
    accent: '#B7E4C7',
    shadow: '#063D2A',
    elemento: 'woda',
    persona: 'jaguar',
    entrada: 'Nad kamiennymi schodami paruje las; oczy jaguara świecą między liśćmi.',
    promesa: 'Tu słowa mają kształt, skórę, barwę i ruch.',
  },
  {
    id: 'desierto',
    nombre: 'El Desierto de los Huesos',
    tituloPl: 'Pustynia Kości',
    tema: 'misje, krosna, liczby i reguły zapisane jak ślady na piasku',
    foco: 'czas, liczby, przyimki, pytania, ser/estar i sploty gramatyki',
    color: '#B8621B',
    secondary: '#D4A574',
    accent: '#F5DEB3',
    shadow: '#52260B',
    elemento: 'ziemia',
    persona: 'tejedora',
    entrada: 'Wiatr niesie piasek przez dziedziniec misji, gdzie Tejedora wiąże czas w nici.',
    promesa: 'Tu chaos zdań zamienia się w wzór, który da się powtarzać.',
  },
  {
    id: 'montanas',
    nombre: 'Las Montañas del Corazón',
    tituloPl: 'Góry Serca',
    tema: 'śpiew, relacje, uczucia i słowa wypowiadane z oddechem',
    foco: 'emocje, przymiotniki, relacje, gustar i zdania o tym, co czujesz',
    color: '#6B4C93',
    secondary: '#A55B7E',
    accent: '#F2C6D3',
    shadow: '#2E1A3D',
    elemento: 'powietrze',
    persona: 'cantor',
    entrada: 'Most z wełnianych lin prowadzi ku wiosce, gdzie każdy przymiotnik ma melodię.',
    promesa: 'Tu uczysz się mówić o sobie bez sztywności.',
  },
  {
    id: 'ciudad',
    nombre: 'La Ciudad de Espejos',
    tituloPl: 'Miasto Luster',
    tema: 'karaibskie balkony, karnawał, slang i błysk ulicznych rozmów',
    foco: 'kolumbijski hiszpański, podróże, miasto, reakcje i naturalny luz',
    color: '#17A2B8',
    secondary: '#FFC857',
    accent: '#E0FBFC',
    shadow: '#05505C',
    elemento: 'duch',
    persona: 'diego',
    entrada: 'W uliczkach wiszą lustra, papierowe chorągwie i śmiech ludzi mówiących szybko.',
    promesa: 'Tu brzmisz mniej jak aplikacja, bardziej jak ktoś, kto naprawdę rozmawia.',
  },
];

export const reinoById: Record<ReinoId, Reino> = reinos.reduce(
  (acc, reino) => ({ ...acc, [reino.id]: reino }),
  {} as Record<ReinoId, Reino>,
);

export function nextReino(id: ReinoId): Reino {
  const index = reinos.findIndex((reino) => reino.id === id);
  return reinos[(index + 1) % reinos.length];
}
