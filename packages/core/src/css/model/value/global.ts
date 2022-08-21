import { BaseValue } from './value';

export type PercentageType = '<percentage>';
export const PercentageType: PercentageType = '<percentage>';

export interface PercentageValue extends BaseValue<PercentageType> {
  value: number;
}
