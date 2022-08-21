import { NumberType } from '../../../css/model';
import { CSSContext } from '../../model/context';
import { resolveNCSSValue } from '../ncssValueResolver';
import { FunctionResolver } from './function';

export const paramResolver: FunctionResolver = (value, scope) => {
  if (value.parameters[0].type !== NumberType) return Error(`"param" function's param type must be ${NumberType}, <any>?`);
      
  const index = value.parameters[0].value;
  if (!Number.isFinite(index)) return Error(`index must be finite number`);

  return (context: CSSContext) => {
    let result = context.params.at(index);

    if (result === undefined) {
      const resolvedValue = resolveNCSSValue(value.parameters[1], scope);

      if (typeof resolvedValue === 'function') result = resolvedValue(context);
      else result = resolvedValue;
    }

    return result;
  };
};
