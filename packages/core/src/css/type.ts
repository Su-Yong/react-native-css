import { DimensionType } from './dimension';
import { ImageType } from './image';

export type IdentType = '<ident>';
export const IdentType: IdentType = '<ident>';

export type PercentageType = '<percentage>';
export const PercentageType: PercentageType = '<percentage>';

export type CSSType = DimensionType | ImageType | IdentType | PercentageType;
