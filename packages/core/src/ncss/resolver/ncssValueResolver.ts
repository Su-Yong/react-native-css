import { Value, LengthType, AngleType, TimeType, PercentageType, FunctionType, NumberType, ColorType, GradientType, URLType, IdentType, StringType } from '../../css/model';
import { CSSContext, Scope } from '../model/context';

export const resolveNCSSValue = (
  value: Value,
  scope: Scope,
): Error | unknown | ((context: CSSContext) => unknown) => {
  if (value.type === LengthType) return value.value;
  if (value.type === AngleType) return value.radian;
  if (value.type === TimeType) return value.ms;

  if (value.type === PercentageType) return `${value.value}%`;
  if (value.type === FunctionType) {
    if (value.name === 'param') {
      if (value.parameters[0].type !== NumberType) return Error(`"param" function's param type must be ${NumberType}, <any>?`);
      
      const index = value.parameters[0].value;
      if (!Number.isFinite(index)) return Error(`index must be finite number`);
 
      return (context: CSSContext) => {
        let result = context.params.at(index);

        if (result === undefined) {
          const resolvedValue = resolveNCSSValue(value.parameters[1], scope);

          if (typeof resolvedValue === 'function') result = resolvedValue;
          else result = resolvedValue;
        }

        return result;
      };
    }
    if (value.name === 'var') {
      if (value.parameters[0].type !== '<ident>') return Error(`"param" function's param type must be <ident>, <any>?`);

      return (context: CSSContext) => {
        throw Error('TODO');
      };
    }
  }

  if (value.type === ColorType) {
    if ('red' in value) {
      return `rgba(${value.red}, ${value.green}, ${value.blue}, ${value.alpha})`;
    } else {
      return '';
    }
  }
  if (value.type === GradientType) return {};
  if (value.type === URLType) return {};

  if (value.type === IdentType) return value.identifier;
  if (value.type === StringType) return value.value;
  if (value.type === NumberType) return value.value;

  return () => {};
};
