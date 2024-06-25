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
    icon: 'angular.svg',
  },
  {
    name: 'Angular',
    id: IconPack.ANGULAR2,
    icon: 'angular2.svg',
  },
  {
    name: 'NestJS',
    id: IconPack.NEST,
    icon: 'nest.svg',
  },
  {
    name: 'NextJS',
    id: IconPack.NEXTJS,
    icon: 'nextjs.svg',
  },
  {
    name: 'NGRX',
    id: IconPack.NGRX,
    icon: 'ngrx.svg',
  },
  {
    name: 'Rails',
    id: IconPack.RAILS,
    icon: 'rails.svg',
  },
  {
    name: 'Recoil',
    id: IconPack.RECOIL,
    icon: 'recoil.svg',
  },
  {
    name: 'Redux',
    id: IconPack.REDUX,
    icon: 'redux.svg',
  },
  {
    name: 'Tests',
    id: IconPack.TESTS,
    icon: 'tests.svg',
  },
];

export type IconPacks = Record<IconPack, boolean>;
