export default function run(lines: string[]) {
  const ranges = lines[0]!.split(',').map(parseRange);
  
  const invalidIdsIter = ranges.map(getInvalidIdsSum)

  const result = invalidIdsIter
    .reduce((sum, items) => sum + items, 0)

  return result.toString();
}

type Range = [number, number]

function parseRange(r: string): Range {
  const [a, b] = r.split('-') as [string, string];

  return [
    Number.parseInt(a),
    Number.parseInt(b),
  ]
}

function getInvalidIdsSum(r: Range) {
  let acc = 0;
  for (let i = r[0]; i <= r[1]; i++) {
    const str = i.toString();
    if (str.length % 2 != 0) continue;

    const a = str.substring(0, str.length / 2);
    const b = str.substring(str.length / 2);

    if (a == b)
      acc += i;
  }
  return acc;
}
