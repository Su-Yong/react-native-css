// https://www.w3.org/TR/css-syntax-3/#tokenization
export interface BaseToken<T extends string> {
  type: `<${T}-token>`;
  value: string;
}

export type IdentToken = BaseToken<'ident'>;
export type FunctionToken = BaseToken<'function'>;
export type AtKeywordToken = BaseToken<'at-keyword'>
export type HashToken = BaseToken<'hash'>
export type StringToken = BaseToken<'string'>
export type BadStringToken = BaseToken<'bad-string'>
export type UrlToken = BaseToken<'url'>
export type BadUrlToken = BaseToken<'bad-url'>
export type DelimToken = BaseToken<'delim'>
export type NumberToken = BaseToken<'number'>
export type PercentageToken = BaseToken<'percentage'>
export type DimensionToken = BaseToken<'dimension'>
export type WhitespaceToken = BaseToken<'whitespace'>
export type CDOToken = BaseToken<'CDO'>
export type CDCToken = BaseToken<'CDC'>
export type ColonToken = BaseToken<'colon'>
export type SemicolonToken = BaseToken<'semicolon'>
export type CommaToken = BaseToken<'comma'>
export type LeftBracketToken = BaseToken<'['>
export type RightBracketToken = BaseToken<']'>
export type LeftParenthesisToken = BaseToken<'('>
export type RightParenthesisToken = BaseToken<')'>
export type LeftBraceToken = BaseToken<'{'>;
export type RightBraceToken = BaseToken<'}'>;
