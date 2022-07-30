import { BaseValue } from './value';

export type IdentType = '<ident>';
export type NumberType = '<number>';
export type StringType = '<string>';
export const IdentType: IdentType = '<ident>';
export const NumberType: NumberType = '<number>';
export const StringType: StringType = '<string>';

export interface IdentValue extends BaseValue<IdentType> {
  identifier: string;
}
export interface NumberValue extends BaseValue<NumberType> {
  value: number;
}
export interface StringValue extends BaseValue<StringType> {
  quoteType: 'single' | 'double';
  value: string;
}

export type KeywordType = IdentType | NumberType | StringType;
export type KeywordValue = IdentValue | NumberValue | StringValue;
