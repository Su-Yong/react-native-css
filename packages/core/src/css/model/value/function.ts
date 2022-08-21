import { BaseValue, Value } from './value';

export type FunctionType = '<function>';
export type CalcType = '<calc>';

export const FunctionType: FunctionType = '<function>';
export const CalcType: CalcType = '<calc>';

export interface FunctionValue<Parameters extends BaseValue<string>[] = Value[]> extends BaseValue<FunctionType> {
  name: string;
  parameters: Parameters;
}

export type CalcOperatorType = '<calc-op>';
export interface CalcOperatorValue extends BaseValue<CalcOperatorType> {
  operator: '+' | '-' | '*' | '/';
}

export interface CalcValue extends BaseValue<CalcType> {
  node: (Value | CalcOperatorValue)[];
}
