import { countUniqueQuestions, countCommonQuestions } from './solution';

describe.each([
  [['abc'], 3, 3],
  [['a','b','c'], 3, 0],
  [['ab', 'ac'], 3, 1],
  [['a', 'a', 'a', 'a'], 1, 1],
  [['b'], 1, 1]
])('day06', (answers, uniqueCount, commonCount) => {
  it(`should count unique question ${answers}`, () => {
    expect(countUniqueQuestions(answers)).toEqual(uniqueCount);
  });

  it(`should count common questions ${answers}`, () => {
    expect(countCommonQuestions(answers)).toEqual(commonCount);
  });
});
