export const getUniqueId = (() => {
  let id = 0;

  return () => `id-${id++}`;
})();

// https://stackoverflow.com/a/8831937
export const hash = (str: string): number => {
  let hash = 0;

  for (let i = 0, len = str.length; i < len; i++) {
      hash = hash * 31 + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
  }

  return hash;
};
