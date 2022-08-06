import { ReactNativeStyle } from '../../types';
import {
  Value,
  LengthType,
  AngleType,
  TimeType,
  PercentageType,
  FunctionType,
  ColorType,
  GradientType,
  URLType,
  IdentType,
  StringType,
  NumberType,
} from '../model';

export const resolveCSSValue = (value: Value): ReactNativeStyle[keyof ReactNativeStyle] | Error => {
  if (value.type === LengthType) return value.value;
  if (value.type === AngleType) return value.radian;
  if (value.type === TimeType) return value.ms;

  if (value.type === PercentageType) return `${value.value}%`;
  if (value.type === FunctionType) return Error(`<function> is not supported in css. Try to use "ncss" instead "css"`);

  if (value.type === ColorType) {
    if ('red' in value) {
      return `rgba(${value.red}, ${value.green}, ${value.blue}, ${value.alpha})`;
    } else {
      return Error(`This <color> seem to be calculated. Try to use "ncss" instead "css"`);
    }
  }
  if (value.type === GradientType) return Error(`<gradient> is not supported in css. Try to use "ncss" instead "css"`);
  if (value.type === URLType) return Error(`<url> is not supported in css. Try to use "ncss" instead "css"`);

  if (value.type === IdentType) return value.identifier;
  if (value.type === StringType) return value.value;
  if (value.type === NumberType) return value.value;

  return Error(`Invalid value. Try to use "ncss" instead "css"`);
};
