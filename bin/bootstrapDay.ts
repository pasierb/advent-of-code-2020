import * as fs from 'fs';
import * as path from 'path';
import { argv } from 'process';
import { render } from 'mustache';

let name = argv[2];
if (!name) {
  console.log("Usage: `npm run bootstrap dayXX`")

  throw new Error("Missing day name")
}

const dayNumber = +name.match(/\d+/)[0];
const description = `https://adventofcode.com/2020/day/${dayNumber}`;
const view = { name, dayNumber, description };

const templatesPath = path.resolve(__dirname, '../template');
const solutionPath = path.resolve(__dirname, `../solutions/${name}`);

fs.mkdirSync(solutionPath);
fs.readdirSync(templatesPath)
  .filter(t => t.endsWith('.tmpl'))
  .forEach(templatePath => {
    const destFileName = templatePath.replace(/\.tmpl$/, '');
    const template = fs.readFileSync(path.join(templatesPath, templatePath), { encoding: 'utf-8' })

    fs.writeFileSync(
      path.resolve(solutionPath, destFileName),
      render(template, view)
    );
  });

fs.writeFileSync(path.resolve(solutionPath, 'input.txt'), '');
