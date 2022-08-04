import { Specificity } from './specificity';

export interface Selector {
  id?: string[];
  class?: string[];
  attributes?: Record<string, unknown>;
  pseudoClass?: string[];
  specificity: Specificity;
}
