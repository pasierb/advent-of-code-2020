import * as fs from 'fs';
import * as path from 'path';
import { argv } from 'process';

const solutionPath = path.resolve(__dirname, `../solutions/${argv[2]}`);
const solutionTemplatePath = path.resolve(__dirname, "../template/solution.ts.tmpl");
const solutionTemplate = fs.readFileSync(solutionTemplatePath);

fs.mkdirSync(solutionPath);
fs.writeFileSync(path.resolve(solutionPath, 'solution.ts'), solutionTemplate);
fs.writeFileSync(path.resolve(solutionPath, 'input.txt'), '');
