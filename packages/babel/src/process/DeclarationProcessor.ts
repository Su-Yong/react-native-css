import CSSValue from '../value/CSSValue';
import { types } from '@babel/core';
import { ValueElement } from '../types/tree';
;
class DeclarationProcessor {
  private values: CSSValue<string | ValueElement>[] = [];

  process(value: ValueElement): types.Expression | types.PatternLike {
    const validValue = this.values.find((it) => it.is(value));

    if (validValue) {
      if (validValue.type === '<expression>') {
        return validValue.resolve(value);
      }

      return validValue.resolve(value.value as string);
    }

    throw Error(`"${JSON.stringify(value)}" is not css value`);
  }

  use(value: CSSValue) {
    this.values.push(value);
  }
};

export default DeclarationProcessor;
