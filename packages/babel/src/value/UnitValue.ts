import { types } from '@babel/core';
import { ValueElement } from '../types/tree';
import CSSValue from './CSSValue';

const unitRegex = /^((?:[0-9]*\.[0-9]+)|(?:[0-9]+\.?[0-9]*))([a-zA-Z]+)$/;
interface UnitValueProps extends Omit<CSSValue, 'is' | 'resolve'> {
  convert: Record<string, (value: number) => number>;
  resolve: (value: number, converter: (value: number) => number) => types.Expression | types.PatternLike;
}
const UnitValue = ({
  type,
  convert,
  resolve,
}: UnitValueProps): CSSValue => {
  const is = (value: string | ValueElement) => {
    let str = '';
    if (typeof value === 'string') str = value;
    else if (value.type === 'string') str = value.value;

    const matcher = str.match(unitRegex);

    if (matcher) {
      const [_, num, unit] = matcher;
      const value = Number(num);
      const converter = convert[unit];

      return !Number.isNaN(value) && !!converter;
    }

    return false;
  };

  const resolver: CSSValue['resolve'] = (data: string) => {
    const matcher = data.match(unitRegex);

    if (matcher) {
      const [_, num, unit] = matcher;
      const value = Number(num);
      const converter = convert[unit];

      if (!Number.isNaN(value) && converter) {
        return resolve(value, converter);
      }
    }

    throw Error(`"${data}" is not ${type}`);
  };

  return {
    type,
    resolve: resolver,
    is,
  };
};

export default UnitValue;
