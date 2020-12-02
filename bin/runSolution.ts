import { argv } from "process";
import * as path from 'path';

const day = argv[2];
const solution = require(path.resolve(__dirname, `../solutions/${day}/solution.ts`));

solution['default']();
