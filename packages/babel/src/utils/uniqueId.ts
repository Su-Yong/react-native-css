export const getUniqueId = (() => {
  let id = 0;

  return () => `id-${id++}`;
})();
