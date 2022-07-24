import { Element } from 'stylis';

interface Processor {
  process(element: Element): Element;
}

export default Processor;