import { Element, DeclarationElement, declarationRegex, isDeclarationElement, isRuleElement, ruleRegex, RuleElement } from '../model/element';
import { tokenizeValue } from '../tokenizer/tokenizer';
import { parseSelector } from './selector/parse';
import { parseValue } from './value/parser';

const commentRegex = /\/\*((?:(?:.|\s)(?!\*\/))+.|\s)\*\//g;
export const parseElement = (str: string): Element[] => {
  const groups = tokenizeValue(
    str,
    {
      dividers: [';'],
      escape: [],
      level: [
        {
          open: '{',
          close: '}',
        },
      ],
    },
  )
    .flatMap((it) => it.replace(commentRegex, ''))
    .map((it) => it.trim());

  const elements: Element[] = [];
  groups.forEach((raw) => {
    if (isDeclarationElement(raw)) {
      const [_, property, value] = Array.from(raw.match(declarationRegex) ?? []);
      const parameters = parseValue(value.trim());
      const declarationElement: DeclarationElement = {
        type: 'declaration',
        raw,
        property: property.trim(),
        values: parameters,
      };

      elements.push(declarationElement);
    }

    if (isRuleElement(raw)) {
      const [_, selector, body] = Array.from(raw.match(ruleRegex) ?? []);
      const ruleElement: RuleElement = {
        type: 'rule',
        raw,
        selectors: parseSelector(selector.trim()),
        elements: parseElement(body.trim()),
      };

      elements.push(ruleElement);
    }
  });

  return elements;
};
