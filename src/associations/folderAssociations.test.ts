import { beforeEach, describe, expect, it } from 'bun:test';
import { clearCache, getFolderAssociation, getFolderIconName } from '~associations/folderAssociations';

describe('getFolderAssociation', () => {
  beforeEach(() => {
    clearCache();
  });

  it('matches common folder names case-insensitively', () => {
    expect(getFolderAssociation('src').name).toBe('Sources');
    expect(getFolderAssociation('SRC').name).toBe('Sources');
    expect(getFolderAssociation('tests').name).toBe('Tests');
    expect(getFolderAssociation('dist').name).toBe('Dist');
  });

  it('falls back to the Default association for unknown names', () => {
    const assoc = getFolderAssociation('a-totally-unknown-folder-xyz');
    expect(assoc.name).toBe('Default');
    expect(getFolderIconName(assoc)).toBe('default');
  });

  it('handles an undefined name without throwing', () => {
    expect(() => getFolderAssociation(undefined)).not.toThrow();
    expect(getFolderAssociation(undefined).name).toBe('Default');
  });

  it('returns the same cached instance for repeated lookups', () => {
    const first = getFolderAssociation('src');
    const second = getFolderAssociation('SRC');
    expect(second).toBe(first);
  });

  it('is stateless across repeated calls (no lingering regex lastIndex)', () => {
    // Regression guard for the previous global-flag regex bug.
    for (let i = 0; i < 5; i++) {
      expect(getFolderAssociation('src').name).toBe('Sources');
    }
  });
});
