import { Element } from '../css/model/element';

import Processor from './processor';

const dehyphenRegex = /(\-[a-z])/g;

export class DehyphenProcessor implements Processor {
  process(element: Element): Element | Element[] {
    if (element.type === 'declaration') {
      element.property = element.property.replace(
        dehyphenRegex,
        (_, match) => match.slice(1).toUpperCase(),
      );
    }

    if (element.type === 'rule') {
      element.elements = element.elements.flatMap((it) => this.process(it));
    }

    return element;
  }
};
