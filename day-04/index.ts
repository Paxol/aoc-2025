import part1 from './part1';
import part2 from './part2-optimized';

import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    test: {
      type: "boolean",
    },
    part: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

const input = await getInput(values.test);

const isPart1 = getPart(values.part) == 1;

const t0 = performance.now();
const output = isPart1 ? part1(input) : part2(input);
const t1 = performance.now();

console.log("Answare:", output);
console.log(`Took ${t1 - t0} ms.`);

function getPart(part: string | undefined) {
  const parsed = Number.parseInt(part ?? '1');

  if (parsed != 1 && parsed != 2)
    throw new Error("Invalid part number");

  return parsed;
}

async function getInput(test: boolean | undefined) {
  const path = test ? "./test.txt" : "./input.txt"
  const content = await Bun.file(path).text();
  return content.split('\n');
}