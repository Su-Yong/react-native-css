import { Value } from './value';

export interface BaseElement<T extends string> {
  type: T;
  raw: string;
}

export interface DeclarationElement extends BaseElement<'declaration'> {
  property: string;
  values: Value[];
}
export interface RuleElement extends BaseElement<'rule'> {
  selector: string;
  elements: Element[];
}
export interface CommentElement extends BaseElement<'comment'> {
  comment: string;
}

export type Element = DeclarationElement | RuleElement | CommentElement;

export const declarationRegex = /([a-zA-Z\-]+)\s*:\s*([^:{}]+)$/;
export const isDeclarationElement = (str: string): boolean => {
  return !!str.match(declarationRegex);
};
export const ruleRegex = /^([^{]+)\s*\{((?:.|\s)*)\}$/;
export const isRuleElement = (str: string): boolean => {
  return !!str.match(ruleRegex);
};
export const commentRegex = /\/\*((?:(?:.|\s)(?!\*\/))+.|\s)\*\//g;
export const isCommentElement = (str: string): boolean => {
  return !!str.match(commentRegex);
};
