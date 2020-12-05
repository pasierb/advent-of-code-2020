import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

/**
 * https://adventofcode.com/2020/day/5
 */

const inputPath = path.resolve(__dirname, './input.txt');

function calculate(input: string, range: [number, number], bottomMarker: string, topMarker: string) {
  const marker = input[0];
  const [min, max] = range;

  if (!marker) {
    return min;
  }

  const offset = Math.ceil((max - min) / 2);

  return calculate(
    input.substring(1),
    marker === bottomMarker ? [min, max-offset] : [min+offset, max],
    bottomMarker,
    topMarker
  );
}

function isMissing(half: number[]): boolean {
  return half.length && (half[half.length-1] - half[0]) !== half.length - 1;
}

export function findMissing(arr: number[]): number {
  if (!isMissing(arr)) return -1;

  const midIndex = Math.floor(arr.length / 2);

  const left = arr.slice(0, midIndex)
  const right = arr.slice(midIndex+1);

  if (left.length && arr[midIndex]-1 !== left[left.length-1]) {
    return arr[midIndex]-1;
  }
  if (right.length && arr[midIndex]+1 !== right[0]) {
    return arr[midIndex]+1;
  }

  return findMissing(isMissing(left) ? left : right);
}

/**
 * 
 * @param boardingPass e.g. BBFFBBFRLL
 */
export function getSeatId(boardingPass: string): number {
  const row = calculate(boardingPass.substr(0, 7), [0, 127], 'F', 'B');
  const col = calculate(boardingPass.substr(7, 3), [0, 7], 'L', 'R');

  return (row * 8) + col;
}

export default function() {
  let max = -Infinity;
  const seats = [];

  readline.createInterface({
    input: fs.createReadStream(inputPath)
  }).on('line', (line) => {
    const seatId = getSeatId(line);

    max = Math.max(seatId, max);
    seats.push(seatId);
  }).on('close', () => {
    seats.sort((a, b) => a < b ? -1 : 1);

    console.log(`part 1: ${max}`);
    console.log(`part 2: ${findMissing(seats)}`);
  });
}
