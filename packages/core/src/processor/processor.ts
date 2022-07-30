import { Element } from '../css/model/element';

interface Processor {
  process(element: Element): Element[] | Element;
}

export default Processor;