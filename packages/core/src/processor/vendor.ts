import { Element } from '../css/model/declaration';
import Processor from './processor';

const webkitVendor = /^\-webkit\-/;
const mozVendor = /^\-moz\-/;
const msVendor = /^\-ms\-/;
const operaVendor = /^\-o\-/;

export class VendorIgnoreProcessor implements Processor {
  process(element: Element): Element | Element[] {
    if (element.type !== 'declaration') return element;

    element.property = element.property
      .replace(webkitVendor, '')
      .replace(mozVendor, '')
      .replace(msVendor, '')
      .replace(operaVendor, '');

    return element;
  }
}
