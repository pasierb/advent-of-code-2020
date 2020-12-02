import { argv } from "process";
import * as path from 'path';
import * as fs from 'fs';

const solutionsPath = path.resolve(__dirname, '../solutions');

let day = argv[2];

console.log(`Solution for ${day}`);

const solution = require(path.join(solutionsPath, day, 'solution.ts')) as { default: () => void };

solution.default();
