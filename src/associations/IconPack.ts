export enum IconPack {
  TESTS = 'tests',
  ANGULAR2 = 'angular2',
  ANGULAR = 'angular',
  NEST = 'nest',
  NEXTJS = 'nextjs',
  NGRX = 'ngrx',
  RAILS = 'rails',
  RECOIL = 'recoil',
  REDUX = 'redux',
}

export const iconPacks = [
  {
    name: 'Angular (Old)',
    id: IconPack.ANGULAR,
    icon: '',
  },
  {
    name: 'Angular 2',
    id: IconPack.ANGULAR2,
    icon: '',
  },
  {
    name: 'NestJS',
    id: IconPack.NEST,
    icon: '',
  },
  {
    name: 'NextJS',
    id: IconPack.NEXTJS,
    icon: '',
  },
  {
    name: 'NGRX',
    id: IconPack.NGRX,
    icon: '',
  },
  {
    name: 'Rails',
    id: IconPack.RAILS,
    icon: '',
  },
  {
    name: 'Recoil',
    id: IconPack.RECOIL,
    icon: '',
  },
  {
    name: 'Redux',
    id: IconPack.REDUX,
    icon: '',
  },
  {
    name: 'Tests',
    id: IconPack.TESTS,
    icon: '',
  },
];

export type IconPacks = Record<IconPack, boolean>;