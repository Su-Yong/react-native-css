import { Element, DeclarationElement, declarationRegex, isDeclarationElement } from '../model/element';
import { tokenizeValue } from '../tokenizer/tokenizer';
import { parseValue } from './value/valueParser';

const commentRegex = /\/\*((?:(?:.|\s)(?!\*\/))+.|\s)\*\//g;
export const parse = (str: string): Element[] => {
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
  });

  return elements;
};
