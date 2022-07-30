import { Element } from '../css/model/declaration';

interface Processor {
  process(element: Element): Element[] | Element;
}

export default Processor;