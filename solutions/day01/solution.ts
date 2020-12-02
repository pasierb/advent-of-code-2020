import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

/**
 * https://adventofcode.com/2020/day/1
 */

const inputPath = path.resolve(__dirname, './input.txt');

function find2sum(data: number[], sum: number): null | number[] {
  let i = 0;
  let j = data.length - 1;

  while (i < j) {
    if (data[i] + data[j] < sum) {
      i++;
    } else if (data[i] + data[j] > sum) {
      j--;
    } else {
      return [data[i], data[j]];
    }
  }

  return null;
}

function find3sum(data: number[], sum: number): null | number[] {
  for (let i=0; i<data.length; i++) {
    const v = data[i];
    const partData = data.slice(0, i).concat(data.slice(i+1))

    const result = find2sum(partData, sum - v);

    if (result) {
      return [...result, v];
    }
  }

  return null;
}

function multiply(items: number[]) {
  return items.reduce((product, it) => product * it);
}

export default function() {
  const data = [];
  
  readline.createInterface({
    input: fs.createReadStream(inputPath )
  }).on('line', (line) => {
    data.push(+line);
  }).on('close', () => {
    data.sort((a,b) => a > b ? 1 : -1);

    console.log(`part 1: ${multiply(find2sum(data, 2020))}`);

    console.log(`part 2: ${multiply(find3sum(data, 2020))}`);
  });
}
