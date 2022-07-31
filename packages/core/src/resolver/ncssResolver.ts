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
  DeclarationElement,
} from '../css/model';

export const resolveNCSSValue = <Arguments extends unknown[]>(element: DeclarationElement, args: Arguments): Record<string, unknown> | Record<string, unknown>[] => {
  const [value] = element.values;

  if (value.type === LengthType) return { [element.property]: value.value };
  if (value.type === AngleType) return { [element.property]: value.radian };
  if (value.type === TimeType) return { [element.property]: value.ms };

  if (value.type === PercentageType) return { [element.property]: `${value.value}%` };
  if (value.type === FunctionType) {
    if (value.name === 'param') {
      const [index, path] = value.parameters;
      if (index.type !== NumberType) throw Error('The first argument type for the param function must be <number>');

      let target: unknown = args[index.value];
      if (path) {
        if (path.type !== StringType) throw Error('The second argument type for the param function must be <string>');
  
        target = path.value
          .split('.')
          .reduce((prev, curr) => {
            if (prev && typeof prev === 'object') return (prev as Record<string, unknown>)[curr];
  
            throw Error(`param(${index}) does not have "${path.value}"`);
          }, args[index.value]); 
      }

      return { [element.property]: target };
    }
  }

  if (value.type === ColorType) {
    if ('red' in value) {
      return { [element.property]: `rgba(${value.red}, ${value.green}, ${value.blue}, ${value.alpha})` };
    } else {
      return {};
    }
  }
  if (value.type === GradientType) return {};
  if (value.type === URLType) return {};

  if (value.type === IdentType) return { [element.property]: value.identifier };
  if (value.type === StringType) return { [element.property]: value.value };
  if (value.type === NumberType) return { [element.property]: value.value };

  return {};
};