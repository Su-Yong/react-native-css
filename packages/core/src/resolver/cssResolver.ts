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
} from '../css/model';

export const resolveCSSValue = (value: Value): unknown => {
  if (value.type === LengthType) return value.value;
  if (value.type === AngleType) return value.radian;
  if (value.type === TimeType) return value.ms;

  if (value.type === PercentageType) return `${value.value}%`;
  if (value.type === FunctionType) return '--not-supported';

  if (value.type === ColorType) {
    if ('red' in value) {
      return `rgba(${value.red}, ${value.green}, ${value.blue}, ${value.alpha})`;
    } else {
      return '--not-supported';
    }
  }
  if (value.type === GradientType) return '--not-supported';
  if (value.type === URLType) return '--not-supported';

  if (value.type === IdentType) return value.identifier;
  if (value.type === StringType) return value.value;
  if (value.type === NumberType) return value.value;

  return '--invalid';
};
