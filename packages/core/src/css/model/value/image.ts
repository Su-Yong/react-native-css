import { FunctionValue } from './global';
import { BaseValue } from './value';

export type ColorType = '<color>';
export type GradientType = '<gradient>';
export type URLType = '<url>';

export const ColorType: ColorType = '<color>';
export const GradientType: GradientType = '<gradient>';
export const URLType: URLType = '<url>';

export type ImageType = ColorType | GradientType | URLType;

export interface HexColorValue extends BaseValue<ColorType> {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}
export interface ColorFunctionValue extends BaseValue<ColorType> {
  function: string;
  values: (ColorValue | FunctionValue)[];
}
export type ColorValue = HexColorValue | ColorFunctionValue;

export interface GradientValue extends BaseValue<GradientType> {
  gradientType: 'linear' | 'radial' | 'conic';
  values: (ColorValue | FunctionValue)[];
  // TODO direction, point
}
export interface URLValue extends BaseValue<URLType> {
  url: string;
}

export type ImageValue = ColorValue | GradientValue | URLValue;
