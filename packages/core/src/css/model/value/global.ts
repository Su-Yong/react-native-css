import { BaseValue, Value } from './value';

export type PercentageType = '<percentage>';
export type FunctionType = '<function>';

export const PercentageType: PercentageType = '<percentage>';
export const FunctionType: FunctionType = '<function>';

export interface PercentageValue extends BaseValue<PercentageType> {
  value: number;
}

export interface FunctionValue<Parameters extends BaseValue<string>[] = Value[]> extends BaseValue<FunctionType> {
  name: string;
  parameters: Parameters;
}
