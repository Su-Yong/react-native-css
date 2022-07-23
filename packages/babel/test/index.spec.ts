import path from 'path';
import fs from 'fs';
import prettier from 'prettier';
import { transformAsync } from '@babel/core';

const beforeDir = path.join(__dirname, 'before');
const afterDir = path.join(__dirname, 'after');

if (!fs.existsSync(afterDir)) {
  fs.mkdirSync(afterDir);
}

const testCases = fs.readdirSync(beforeDir);

describe('integration tests', () => {
  testCases.forEach((testCase) => {
    it(`Case (${testCase})`, async () => {
      const config = {
        caller: {
          name: '@suyongs/babel-plugin-react-native-css',
        },
        plugins: [
          require.resolve('../src/index.ts'),
        ],
        sourceMap: false,
      };

      const beforeFilePath = path.join(beforeDir, testCase);
      const before = fs.readFileSync(beforeFilePath, 'utf-8');

      const result = await transformAsync(before, {
        filename: beforeFilePath,
        ...config,
      }).catch((err) => {
        console.error(err);

        throw err;
      });

      const afterFilePath = path.join(afterDir, testCase);
      if (!fs.existsSync(afterFilePath)) {
        throw new Error('No snapshot found for ' + testCase);
      }
      const after = fs.readFileSync(afterFilePath, 'utf-8');

      expect(prettier.format(result?.code!, {parser: 'babel'})).toEqual(after);
    });
  });
});