import type { EntryKind, ReinoId } from './vocab.generated';

export interface Talisman {
  id: string;
  nombre: string;
  reino: ReinoId;
  descripcion: string;
  condition: {
    type: 'reputation' | 'kind' | 'games' | 'streak' | 'chispas';
    reino?: ReinoId;
    kind?: EntryKind;
    amount: number;
  };
}

export const talismanes: Talisman[] = [
  {
    id: 'colibri-del-alba',
    nombre: 'Colibrí del Alba',
    reino: 'pueblo',
    descripcion: 'Pierwszy talizman za rozmowy, rodzinę i codzienne przedmioty.',
    condition: { type: 'reputation', reino: 'pueblo', amount: 18 },
  },
  {
    id: 'garra-de-jade',
    nombre: 'Garra de Jade',
    reino: 'selva',
    descripcion: 'Jaguar rozpoznaje cierpliwość w nauce natury i ciała.',
    condition: { type: 'reputation', reino: 'selva', amount: 18 },
  },
  {
    id: 'nudo-del-tiempo',
    nombre: 'Nudo del Tiempo',
    reino: 'desierto',
    descripcion: 'Węzeł za liczby, pytania i pierwsze reguły gramatyczne.',
    condition: { type: 'reputation', reino: 'desierto', amount: 18 },
  },
  {
    id: 'eco-del-corazon',
    nombre: 'Eco del Corazón',
    reino: 'montanas',
    descripcion: 'Echo za opisywanie ludzi, emocji i relacji.',
    condition: { type: 'reputation', reino: 'montanas', amount: 18 },
  },
  {
    id: 'espejo-parcero',
    nombre: 'Espejo Parcero',
    reino: 'ciudad',
    descripcion: 'Lustro za kolumbijski luz i miejskie wyrażenia.',
    condition: { type: 'reputation', reino: 'ciudad', amount: 18 },
  },
  {
    id: 'llama-sagrada',
    nombre: 'Llama Sagrada',
    reino: 'pueblo',
    descripcion: 'Płomień za trzy dni powrotu do nauki.',
    condition: { type: 'streak', amount: 3 },
  },
  {
    id: 'moneda-de-cobre',
    nombre: 'Moneda de Cobre',
    reino: 'desierto',
    descripcion: 'Moneta za pierwsze sto iskier.',
    condition: { type: 'chispas', amount: 100 },
  },
  {
    id: 'libro-vivo',
    nombre: 'Libro Vivo',
    reino: 'montanas',
    descripcion: 'Księga za poznanie co najmniej pięćdziesięciu haseł.',
    condition: { type: 'kind', kind: 'noun', amount: 35 },
  },
  {
    id: 'mascara-de-carnaval',
    nombre: 'Máscara de Carnaval',
    reino: 'ciudad',
    descripcion: 'Maska za rozegranie trzech prób.',
    condition: { type: 'games', amount: 3 },
  },
  {
    id: 'serpiente-emplumada',
    nombre: 'Serpiente Emplumada',
    reino: 'selva',
    descripcion: 'Pióropusz za dwieście pięćdziesiąt iskier.',
    condition: { type: 'chispas', amount: 250 },
  },
  {
    id: 'aguja-de-la-tejedora',
    nombre: 'Aguja de la Tejedora',
    reino: 'desierto',
    descripcion: 'Igła za czasowniki i sploty zdań.',
    condition: { type: 'kind', kind: 'verb', amount: 25 },
  },
  {
    id: 'flor-amate',
    nombre: 'Flor Amate',
    reino: 'montanas',
    descripcion: 'Kwiat za przymiotniki, kolory i uczucia.',
    condition: { type: 'kind', kind: 'adjective', amount: 20 },
  },
  {
    id: 'vaso-de-tinto',
    nombre: 'Vaso de Tinto',
    reino: 'ciudad',
    descripcion: 'Mała czarna kawa za kolumbijskie zwroty.',
    condition: { type: 'kind', kind: 'colombian', amount: 8 },
  },
  {
    id: 'brujula-de-los-cinco',
    nombre: 'Brújula de los Cinco',
    reino: 'pueblo',
    descripcion: 'Kompas dla podróżnika, który zdobył reputację w każdym królestwie.',
    condition: { type: 'reputation', amount: 12 },
  },
  {
    id: 'corona-de-papel-picado',
    nombre: 'Corona de Papel Picado',
    reino: 'ciudad',
    descripcion: 'Korona za pięć rozegranych prób.',
    condition: { type: 'games', amount: 5 },
  },
];
