import { beforeEach, describe, expect, it } from 'bun:test';
import { clearCache, getAssociation, getFileIconName } from '~associations/fileAssociations';
import type { IconPacks } from '~associations/IconPack';

const allPacksOff: IconPacks = {
  angular: false,
  angular2: false,
  nest: false,
  nextjs: false,
  ngrx: false,
  recoil: false,
  rails: false,
  redux: false,
  tests: false,
};

describe('getAssociation', () => {
  beforeEach(() => {
    clearCache();
  });

  it('matches a known extension to its icon', () => {
    const assoc = getAssociation('Main.java');
    expect(assoc.name).toBe('Java');
    expect(getFileIconName(assoc)).toBe('java');
  });

  it('falls back to the Default association for unknown names', () => {
    const assoc = getAssociation('some-totally-unknown-thing.zzz');
    expect(assoc.name).toBe('Default');
    expect(getFileIconName(assoc)).toBe('default');
  });

  it('returns the same cached instance for repeated lookups', () => {
    const first = getAssociation('Main.java');
    const second = getAssociation('Main.java');
    expect(second).toBe(first);
  });

  it('respects the iconPacks filter for pack-scoped associations', () => {
    // `foo.test.coffee` only matches the tests-pack "Test Coffee" association;
    // with the pack disabled it must fall back to the generic CoffeeScript icon.
    const withPacksOff = getAssociation('foo.test.coffee', allPacksOff);
    clearCache();
    const withTestsOn = getAssociation('foo.test.coffee', { ...allPacksOff, tests: true });
    expect(withPacksOff.name).toBe('CoffeeScript');
    expect(withTestsOn.name).toBe('Test Coffee');
  });

  it('produces a defined association with an icon path for any input', () => {
    const assoc = getAssociation('README.md');
    expect(assoc.icon).toContain('/icons/files/');
    expect(assoc.enabled).toBe(true);
  });
});

describe('getFileIconName', () => {
  it('strips the path and extension', () => {
    const assoc = getAssociation('Main.java');
    expect(getFileIconName(assoc)).toBe('java');
  });
});
