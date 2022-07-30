import { BaseValue } from '.';

export type LengthType = '<length>';
export type AngleType = '<angle>';
export type TimeType = '<time>';

export const LengthType: LengthType = '<length>';
export const AngleType: AngleType = '<angle>';
export const TimeType: TimeType = '<time>';

export type DimensionType = LengthType | AngleType | TimeType;

export interface LengthValue extends BaseValue<LengthType> {
  unit: string;
  value: number;
}
export interface AngleValue extends BaseValue<AngleType> {
  radian: number;
}
export interface TimeValue extends BaseValue<TimeType> {
  ms: number;
}

export type DimensionValue = LengthValue | AngleValue | TimeValue;
