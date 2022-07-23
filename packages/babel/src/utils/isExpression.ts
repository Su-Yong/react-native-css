const expressionRegex = /^expression\((.*)\)$/;
export const isExpression = (str: string): boolean => !!str.match(expressionRegex);

export const extractExpression = (str: string): string => {
  const [_, matcher] = Array.from(str.match(expressionRegex) ?? []);

  return matcher;
};
