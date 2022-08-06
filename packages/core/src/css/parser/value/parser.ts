import { Value } from '../../model/value';
import { tokenizeValue } from '../../tokenizer/tokenizer';
import { isLengthValue, lengthValue, isAngleValue, angleValue, isTimeValue, timeValue } from './dimension';
import { isFunctionValue, functionValue } from './function';
import { isPercentageValue, percentageValue } from './global';
import { isColorValue, colorValue, isGradientValue, gradientValue, isURLValue, urlValue } from './image';
import { isNumberValue, numberValue, isStringValue, stringValue, identValue } from './keyword';

export const parseValue = (source: string): Value[] => {
  const result: Value[] = [];

  const str = tokenizeValue(source, {
    dividers: [' '],
    escape: ['\'', '"'],
    level: [{
      open: '(',
      close: ')',
    }],
  });

  str.forEach((value) => {
    const word = value.trim();

    if (isLengthValue(word)) result.push(lengthValue(word));
    else if (isAngleValue(word)) result.push(angleValue(word));
    else if (isTimeValue(word)) result.push(timeValue(word));
    else if (isColorValue(word)) result.push(colorValue(word));
    else if (isGradientValue(word)) result.push(gradientValue(word));
    else if (isURLValue(word)) result.push(urlValue(word));
    else if (isPercentageValue(word)) result.push(percentageValue(word));
    else if (isFunctionValue(word)) result.push(functionValue(word));
    else if (isNumberValue(word)) result.push(numberValue(word));
    else if (isStringValue(word)) result.push(stringValue(word));
    else result.push(identValue(word));
  });

  return result;
};
