import { DimensionValue } from './dimension';
import { PercentageValue, FunctionValue } from './global';
import { ImageValue } from './image';
import { KeywordValue } from './keyword';

export interface BaseValue<T extends string> {
  type: T;
  raw: string;
}

export type Value = DimensionValue | ImageValue | PercentageValue | KeywordValue | FunctionValue;
