import { Value, LengthType, AngleType, TimeType, PercentageType, FunctionType, NumberType, ColorType, GradientType, URLType, IdentType, StringType } from '../../css/model';
import { CSSContext, Scope, Variable } from '../model/context';
import { paramResolver } from './functions/param';
import { varResolver } from './functions/var';

export const resolveNCSSValue = (
  value: Value,
  scope: Scope,
): Error | unknown | ((context: CSSContext) => unknown) => {
  if (value.type === LengthType) return value.value;
  if (value.type === AngleType) return value.radian;
  if (value.type === TimeType) return value.ms;

  if (value.type === PercentageType) return `${value.value}%`;
  if (value.type === FunctionType) {
    if (value.name === 'param') return paramResolver(value, scope);
    if (value.name === 'var') return varResolver(value, scope);
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
