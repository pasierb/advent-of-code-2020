import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

/**
 * https://adventofcode.com/2020/day/2
 */

const inputPath = path.resolve(__dirname, './input.txt')
const pattern = /^(?<min>\d+)-(?<max>\d+) (?<char>\w{1}): (?<pass>\w+)$/;

function isValidV1(char: string, range: [min: number, max: number], password: string) {
  let count = 0;

  for (let i=0; i<password.length; i++) {
    if (password[i] === char) {
      count++;
    }
  }

  return count >= range[0] && count <= range[1];
}

function isValidV2(char: string, positions: number[], password: string) {
  let count = 0;

  const isAtPosition = (pos) => password[pos-1] === char;

  positions.forEach(p => {
    if (isAtPosition(p)) count++;
  });

  return count === 1;
}

export default function() {
  let countV1 = 0;
  let countV2 = 0;

  readline.createInterface({
    input: fs.createReadStream(inputPath )
  }).on('line', (line) => {
    const match = line.match(pattern);
    const { min, max, char, pass } = match.groups;

    if (isValidV1(char, [+min, +max], pass)) {
      countV1++;
    }

    if (isValidV2(char, [+min, +max], pass)) {
      countV2++;
    }
  }).on('close', () => {
    console.log(`part 1: ${countV1}`);
    console.log(`part 2: ${countV2}`);
  });
}

