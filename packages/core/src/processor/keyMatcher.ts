import equal from 'fast-deep-equal';

import { CSSType } from '../css/type';

export type UnionCSSType = {
  type: 'union';
  types: CSSType[];
};
export const Union = (...types: CSSType[]): UnionCSSType => ({
  type: 'union',
  types,
});

export type AliasKey = {
  name: string;
  types?: (CSSType | UnionCSSType)[];
};

export type Matcher<T> = [AliasKey, (data: AliasKey) => T];
export const matchAliasKey = <T>(matchers: Matcher<T>[], value: AliasKey): T | null => {
  let result: T | null = null;

  matchers.forEach(([key, callback]) => {
    if (result) return;

    const isKeyMatched = key.name === value.name;
    const isTypeMatched = key.types
      ? key.types.every((type, index) => typeof type !== 'string'
        ? type.types.some((it) => it === value.types?.[index])
        : type === value.types?.[index]
      )
      : true;
    
    if (isKeyMatched && isTypeMatched) {
      result = callback(value);
    }
  });

  return result;
};
