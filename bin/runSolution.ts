import { argv } from "process";
import * as path from 'path';

const day = argv[2];
const solution: { default: () => void } = require(path.resolve(__dirname, `../solutions/${day}/solution.ts`));

solution.default();
