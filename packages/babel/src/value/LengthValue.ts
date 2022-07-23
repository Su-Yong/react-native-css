import CSSValue from './CSSValue';
import { types } from '@babel/core';
import UnitValue from './UnitValue';

// https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Types
// https://www.w3.org/TR/css3-values/#component-types
const LengthValue: CSSValue = UnitValue({
  type: '<length>',
  resolve(value, converter) {
    const result = converter(value);
    return types.numericLiteral(result);
  },
  convert: {
    px: (it) => it,
    pt: (it) => it * 96 / 72,
    pc: (it) => it * 96 / 16,
    in: (it) => it * 96,
    Q: (it) => it * 96 / 40,
    mm: (it) => it * 96 / 25.4,
    cm: (it) => it * 96 / 2.54,
  },
});

export default LengthValue;
