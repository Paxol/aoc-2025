export default function run(lines: string[]) {
  const rows = lines.map(x => [...x].map(y => Number.parseInt(y)));
  const sum = rows.map(x => findMax(x, 2).reverse().map((x, i) => x * 10 ** i).reduce((a, b) => a + b, 0))
    .reduce((a, b) => a + b, 0)

  return sum.toString();
}

function findMax(nums: number[], searchFor = 0, currentMax = [] as number[], startIndex = 0) {
  for (let k = 0; k < searchFor; k++) {
    let cur = currentMax[k]
    for (let i = startIndex; i < nums.length + ((k + 1) - searchFor); i++) {
      if (cur == undefined || cur < nums[i]!) {
        cur = currentMax[k] = nums[i]!;
        startIndex = i + 1;
      }
    }
  }

  return currentMax;
}
