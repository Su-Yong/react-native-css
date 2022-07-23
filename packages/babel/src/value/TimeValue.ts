import CSSValue from './CSSValue';
import { types } from '@babel/core';
import UnitValue from './UnitValue';

// https://developer.mozilla.org/ko/docs/Web/CSS/time
const TimeValue: CSSValue = UnitValue({
  type: '<time>',
  resolve(value, converter) {
    const result = converter(value);
    return types.numericLiteral(result);
  },
  convert: {
    ms: (it) => it,
    s: (it) => it * 1000,
  },
});

export default TimeValue;
