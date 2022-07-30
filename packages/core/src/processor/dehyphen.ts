import { Element } from '../css/model/declaration';

import Processor from './processor';

const dehyphenRegex = /(\-[a-z])/g;

export class DehyphenProcessor implements Processor {
  process(element: Element): Element | Element[] {
    if (element.type !== 'declaration') return element;

    element.property = element.property.replace(
      dehyphenRegex,
      (_, match) => match.slice(1).toUpperCase(),
    );

    return element;
  }
};
