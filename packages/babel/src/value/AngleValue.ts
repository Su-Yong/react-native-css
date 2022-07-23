import CSSValue from './CSSValue';
import { types } from '@babel/core';
import UnitValue from './UnitValue';

// https://developer.mozilla.org/ko/docs/Web/CSS/angle
const AngleValue: CSSValue = UnitValue({
  type: '<angle>',
  resolve(value, converter) {
    const result = converter(value);
    return types.numericLiteral(result);
  },
  convert: {
    deg: (it) => it / 180 * Math.PI,
    grad: (it) => it / 200 * Math.PI,
    rad: (it) => it,
    turn: (it) => it * 2 * Math.PI,
  },
});

export default AngleValue;
