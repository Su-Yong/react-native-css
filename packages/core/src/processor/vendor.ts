import Processor from './processor';

const webkitVendor = /^\-webkit\-/;
const mozVendor = /^\-moz\-/;
const msVendor = /^\-ms\-/;
const operaVendor = /^\-o\-/;

export const VendorIgnoreProcessor: Processor = {
  process(element) {
    if (element.type !== 'decl') return element;
    if (Array.isArray(element.props)) return element;

    element.props = element.props
      .replace(webkitVendor, '')
      .replace(mozVendor, '')
      .replace(msVendor, '')
      .replace(operaVendor, '');

    return element;
  }
}
