import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

/**
 * https://adventofcode.com/2020/day/6
 */

const inputPath = path.resolve(__dirname, './input.txt');

export function countUniqueQuestions(answers: string[]): number {
  const set = new Set();

  answers.forEach(answer => {
    answer.split('').forEach(char => set.add(char));
  });

  return set.size;
}

export function countCommonQuestions(answers: string[]): number {
  const a = new Map<string, number>();
  const b = new Map<number, Set<string>>();

  for(let i=0; i<answers.length; i++) {
    for(let j=0; j<answers[i].length; j++) {
      let q = answers[i][j];
      let count = a.get(q) || 0
      b.get(count)?.delete(q);

      count += 1;

      const n = b.get(count) || new Set();
      n.add(q);
      a.set(q, count);
      b.set(count, n);
    }
  }

  return b.get(answers.length)?.size || 0;
}

export default function() {
  let answerSets: string[][] = [[]];

  readline.createInterface({
    input: fs.createReadStream(inputPath )
  }).on('line', (line) => {
    if (!line) {
      answerSets.push([]);
      return;
    }

    answerSets[answerSets.length-1].push(line);
  }).on('close', () => {
    const part1 = answerSets.reduce((acc, answers) => countUniqueQuestions(answers) + acc, 0);
    const part2 = answerSets.reduce((acc, answers) => countCommonQuestions(answers) + acc, 0);

    console.log(`part 1: ${part1}`);
    console.log(`part 2: ${part2}`);
  });
}
