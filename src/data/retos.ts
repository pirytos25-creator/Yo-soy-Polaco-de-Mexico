import type { EntryKind, ReinoId } from './vocab.generated';

export interface Reto {
  id: string;
  reino: ReinoId;
  nombre: string;
  tipo: 'loteria' | 'mercado' | 'tejedora' | 'carnaval' | 'biblioteca';
  descripcion: string;
  reward: number;
  focusKinds: EntryKind[];
}

export const retos: Reto[] = [
  {
    id: 'loteria-pueblo',
    reino: 'pueblo',
    nombre: 'Lotería del Alba',
    tipo: 'loteria',
    descripcion: 'Cztery na cztery: usłysz polskie znaczenie, odnajdź hiszpański papierito.',
    reward: 18,
    focusKinds: ['noun', 'phrase'],
  },
  {
    id: 'mercado-pueblo',
    reino: 'pueblo',
    nombre: 'Mercado de Cobre',
    tipo: 'mercado',
    descripcion: 'Kupujesz jedzenie i prosisz o cenę, zanim kupiec zamknie stragan.',
    reward: 20,
    focusKinds: ['noun', 'phrase'],
  },
  {
    id: 'tejedora-desierto',
    reino: 'desierto',
    nombre: 'Splot Tejedory',
    tipo: 'tejedora',
    descripcion: 'Ułóż zdanie z rozsypanych słów i zobacz, gdzie końcówka pasuje do osnowy.',
    reward: 22,
    focusKinds: ['verb', 'preposition', 'question'],
  },
  {
    id: 'carnaval-ciudad',
    reino: 'ciudad',
    nombre: 'Máscaras del Parcero',
    tipo: 'carnaval',
    descripcion: 'Dopasuj kolumbijskie zwroty do znaczeń, zanim orkiestra zmieni rytm.',
    reward: 24,
    focusKinds: ['colombian', 'phrase'],
  },
  {
    id: 'biblioteca-selva',
    reino: 'selva',
    nombre: 'Retablo del Jaguar',
    tipo: 'biblioteca',
    descripcion: 'Przejrzyj retabla natury, ciała i zwierząt; każde słowo ma swój znak.',
    reward: 12,
    focusKinds: ['noun', 'adjective'],
  },
];
