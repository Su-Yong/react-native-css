import Color from 'color';
import { ColorType, FunctionType, NumberType, ColorFunctionValue, GradientValue, URLValue, StringType, IdentType, ColorValue } from '../../model/value';
import { isFunctionValue, functionValue } from './function';

const gradientFunctions = [
  'linear-gradient',
  'radial-gradient',
  'conic-gradient',
];
const colorFunctions = [
  'rgb',
  'rgba',
  'hsl',
  'hsla',
  'hwb',
  'hwba',
];

const gradientTypes: string[] = [
  ColorType,
  FunctionType,
];
const colorTypes: string[] = [
  NumberType,
  FunctionType,
];

const urlRegex = /url\(((?:"|')?)([^"')]+)\1\)/;

export const colorValue = (str: string): ColorValue => {
  try {
    const color = Color(str);
  
    return {
      type: '<color>',
      raw: str,
      red: color.red(),
      green: color.green(),
      blue: color.blue(),
      alpha: color.alpha(),
    };
  } catch {}

  if (!isFunctionValue(str)) throw Error(`"${str}" is not <color>`);
  const preValue = functionValue(str);

  for (const param of preValue.parameters) {
    if (!colorTypes.includes(param.type)) throw Error(`"${param.raw}"(${param.type}) is not allowed parameter type in <color>`);
  }

  return {
    type: '<color>',
    raw: str,
    function: preValue.name,
    values: preValue.parameters as ColorFunctionValue['values'],
  };
};
export const gradientValue = (str: string): GradientValue => {
  const preValue = functionValue(str);
  console.log('gradient function', preValue, str);

  if (!gradientFunctions.includes(preValue.name)) throw Error(`"${str}" is not <gradient>`);
  for (const param of preValue.parameters) {
    if (!gradientTypes.includes(param.type)) throw Error(`"${param.raw}"(${param.type}) is not allowed parameter type in <gradient>`);
  }
  const gradientType = preValue.name.split('-')[0] as GradientValue['gradientType'];

  return {
    type: '<gradient>',
    raw: str,
    gradientType,
    values: preValue.parameters as GradientValue['values'],
  };
};
export const urlValue = (str: string): URLValue => {
  const { name, parameters } = functionValue(str);
  
  if (name !== 'url') throw Error(`"${str}" is not <url>`);
  if (
    parameters[0].type !== StringType
    && parameters[0].type !== IdentType
  ) throw Error(`"${parameters[0].raw}" is not allowed type`);

  return {
    type: '<url>',
    raw: str,
    url: (
      parameters[0].type === StringType
        ? parameters[0].value
        : parameters[0].raw
    ),
  };
};

export const isColorValue = (str: string): boolean => {
  let isValid = true;
  try {
    Color(str);
  } catch {
    if (isFunctionValue(str)) {
      const { name } = functionValue(str);

      return colorFunctions.includes(name);
    }

    isValid = false;
  }

  return isValid;
};
export const isGradientValue = (str: string): boolean => {
  if (!isFunctionValue(str)) return false;

  return gradientFunctions.includes(str.split('(')[0]);
};
export const isURLValue = (str: string): boolean => !!str.match(urlRegex);
