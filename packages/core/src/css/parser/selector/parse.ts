import { tokenizeValue } from '../../tokenizer';
import { Selector } from '../../model/selector/selector';

const idRegex = /#([a-zA-Z_]+)/g;
const classRegex = /\.([a-zA-Z_]+)/g;
const pseudoClassRegex = /::?([a-zA-Z_]+)/g;
const attributeRegex = /\[(?:([^=]+)=([^,\]]+),?)+\]/g;
export const parseSelector = (str: string): Selector[] => {
  const result: Selector[] = [];

  str.split(' ').forEach((raw) => {
    const ids = Array.from(raw.match(idRegex) ?? []);
    const classes = Array.from(raw.match(classRegex) ?? []);
    const pseudoClasses = Array.from(raw.match(pseudoClassRegex) ?? []);
    const attributes: Record<string, unknown> = {};
    
    let attributeMatcher = raw.match(attributeRegex);
    if (attributeMatcher) {
      const inner = attributeMatcher[0].substring(1, attributeMatcher[0].length - 1);
      tokenizeValue(
        inner,
        {
          dividers: [','],
          escape: ['\'', '"'],
          level: [],
        },
      ).forEach((token) => {
        const [key, value] = tokenizeValue(
          token,
          {
            dividers: ['='],
            escape: ['\'', '"'],
            level: [],
          },
        );
        
        attributes[key] = value.replace(/^(["']?)(?<body>[^'"]+)(\1)$/, '$<body>');
      });
    }

    result.push({
      id: ids,
      class: classes,
      pseudoClass: pseudoClasses,
      attributes,
      specificity: {
        id: ids.length,
        class: classes.length + pseudoClasses.length,
        type: Object.keys(attributes).length,
      },
    });
  });

  return result;
};
