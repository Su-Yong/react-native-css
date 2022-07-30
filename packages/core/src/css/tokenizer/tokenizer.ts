interface TokenizeOptions {
  dividers: string[];
  escape: string[];
  level: {
    open: string;
    close: string;
  }[];
}
const defaultTokenizeOption = {
  dividers: [' '],
  escape: ['\'', '"'],
  level: [{
    open: '(',
    close: ')',
  }],
};

export const tokenizeValue = (source: string, options: TokenizeOptions = defaultTokenizeOption): string[] => {
  let levels: number[] = [];
  let escape: string | null = null;

  const str: string[] = [''];
  Array.from(source)
    .forEach((char, index) => {
      if (levels.every((level) => level === 0) && escape === null && options.dividers.includes(char)) {
        str.push('');
        return;
      }

      str[str.length - 1] += char;

      if (escape ? escape === char : options.escape.includes(char)) {
        if (index > 0 && str[index - 1] === '\\') return;

        if (escape === null) escape = char;
        else escape = null;
      } else {
        const openLevelIndex = options.level.findIndex((it) => it.open === char);
        const closeLevelIndex = options.level.findIndex((it) => it.close === char);

        if (levels[openLevelIndex] === undefined) levels[openLevelIndex] = 0;
        if (openLevelIndex >= 0) levels[openLevelIndex] += 1;
        if (closeLevelIndex >= 0) levels[closeLevelIndex] -= 1;
      }
    });
 
  return str;
};
