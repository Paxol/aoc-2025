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


    for (let j = 1; j <= str.length / 2; j++) {
      if (str.length % j != 0) continue;

      let prefix = str.substring(0, j)

      // Cursor that points to the nth group
      let n = 1;
      let matched = true
      let next = str.substring(j * n, j * (n + 1))

      while (matched && next.length > 0) {
        matched = prefix == next

        n++;
        next = str.substring(j * n, j * (n + 1))
      }

      if (matched) {
        acc += i;
        break;
      }
    }

  }
  return acc;
}
