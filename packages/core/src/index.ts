export const css = (array: TemplateStringsArray, ...args: unknown[]) => {
  if (__DEV__) console.warn('css is running in compile time');
};
