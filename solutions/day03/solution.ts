import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

/**
 * https://adventofcode.com/2020/day/3
 */

const inputPath = path.resolve(__dirname, './input.txt');

type Map = string[];
type Coords = [x: number, y: number];
const TREE = '#';

export function getNextCoords(map: Map, start: Coords, direction: Coords): Coords | undefined {
  const next: Coords = [start[0] + direction[0], start[1] + direction[1]];

  if (next[0] >= map.length) {
    return;
  }

  const row = map[next[0]];

  if (next[1] >= row.length) {
    next[1] = next[1] - row.length;
  }

  return next;
}

export function traverse(map: Map, start: Coords, direction: Coords): number {
  let curr = start;
  let count = 0;
  const move = (start, direction) => getNextCoords(map, start, direction);

  while (curr) {
    const row = map[curr[0]];

    if (row[curr[1]] === TREE) {
      count++;
    }

    curr = move(curr, direction);
  }

  return count;
}

export default function() {
  const map: Map = [];

  readline.createInterface({
    input: fs.createReadStream(inputPath )
  }).on('line', (line) => {
    map.push(line);
  }).on('close', () => {
    console.log(`part 1: ${traverse(map, [0,0], [1,3])}`);

    const slopes: Coords[] = [
      [1,1],
      [1,3],
      [1,5],
      [1,7],
      [2,1],
    ];

    const part2 = slopes.map((slope) => {
      return traverse(map, [0,0], slope);
    }).reduce((acc, it) => it * acc);

    console.log(`part 2: ${part2}`);
  });
}
