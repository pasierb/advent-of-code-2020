import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

/**
 * https://adventofcode.com/2020/day/4
 */

const inputPath = path.resolve(__dirname, './input.txt');

export function hasValidPassportFields(pass: string) {
  const keys = pass.split(/\s+/).map(kv => kv.split(/:/)[0]);
  const counts = new Map<string, number>([
    ['byr', 1],
    ['iyr', 1],
    ['eyr', 1],
    ['hgt', 1],
    ['hcl', 1],
    ['ecl', 1],
    ['pid', 1],
    ['cid', 0]
  ]);

  for(const key of keys) {
    let c = counts.get(key);

    if (c === undefined) {
      return false;
    }

    if (--c <= 0) {
      counts.delete(key);
    }
  }

  return counts.size === 0 || [...counts.values()].reduce((a, b) => a + b) === 0;
}

export function hasValidPassportData(pass: string) {
  const data = pass.split(/\s+/).map(kv => kv.split(/:/));
  let valid = true;

  for (const [key, value] of data) {
    switch(key) {
      case 'byr': {
        valid = value.match(/^\d{4}$/) && +value >= 1920 && +value <= 2002;
        break;
      }
      case 'iyr': {
        valid = value.match(/^\d{4}$/) && +value >= 2010 && +value <= 2020;
        break;
      }
      case 'eyr': {
        valid = value.match(/^\d{4}$/) && +value >= 2020 && +value <= 2030;
        break;
      }
      case 'hgt': {
        const match = value.match(/^(?<value>\d{2,})(?<unit>in|cm)$/)

        valid = !!match
          && (
            (match.groups.unit === 'cm' && +match.groups.value >= 150 && +match.groups.value <= 193)
            || (match.groups.unit === 'in' && +match.groups.value >= 59 && +match.groups.value <= 76)
          );
        break;
      }
      case 'hcl': {
        valid = !!value.match(/^#[a-f0-9]{6}/);
        break;
      }
      case 'ecl': {
        valid = !!value.match(/^amb|blu|brn|gry|grn|hzl|oth$/);
        break;
      }
      case 'pid': {
        valid = !!value.match(/^\d{9}$/);
        break;
      }
    }

    if (!valid) {
      return valid;
    }
  }

  return valid;
}

export default function() {
  let curr: string[] = [];
  const passports: string[] = []

  readline.createInterface({
    input: fs.createReadStream(inputPath )
  }).on('line', (line) => {
    if (line.length) {
      curr.push(line);
      return;
    }

    passports.push(curr.join(' '));
    curr = []
  }).on('close', () => {
    if (curr.length) {
      passports.push(curr.join(' '));
    }

    let countPart1 = 0;
    let countPart2 = 0;

    for (const passport of passports) {
      let validFields = hasValidPassportFields(passport);

      if (validFields) {
        countPart1++;
      }

      if (validFields && hasValidPassportData(passport)) {
        countPart2++;
      }
    }

    console.log(`part 1: ${countPart1}`);
    console.log(`part 2: ${countPart2}`);
  });
}
