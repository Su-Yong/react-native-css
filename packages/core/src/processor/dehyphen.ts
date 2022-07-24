import Processor from './processor';

const dehyphenRegex = /(\-[a-z])/g;

export const DehyphenProcessor: Processor = {
  process(element) {
    if (element.type !== 'decl') return element;
    if (Array.isArray(element.props)) return element;

    element.props = element.props.replace(
      dehyphenRegex,
      (_, match) => match.slice(1).toUpperCase(),
    );

    return element;
  }
};
