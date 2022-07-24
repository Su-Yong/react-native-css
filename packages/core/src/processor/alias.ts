import Processor from './processor';

export const AliasProcessor: Processor = {
  process(element) {
    if (element.type !== 'decl') return element;
    if (Array.isArray(element.props)) return element;

    element.props = 

    return element;
  }
};
