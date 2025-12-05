export default function run(lines: string[]) {
  const separatorIndex = lines.indexOf("");
  let ranges = lines
    .filter((_, i) => i < separatorIndex)
    .map((s) => {
      const match = s.match(/(\d+)-(\d+)/);
      if (match == null || match.length != 3)
        throw new Error("malformed input");

      return [
        Number.parseInt(match[1] ?? "0"),
        Number.parseInt(match[2] ?? "0"),
      ] as const;
    });

  let foundOverlap = false;

  do {
    foundOverlap = false;
    const mergedRanges: (readonly [number, number])[] = [];

    for (let i = 0; i < ranges.length; i++) {
      const r1 = ranges[i]!;

      const adiacentRanges = ranges
        .map((range, index) => ({ range, index }))
        .filter(({ range }, j) => i != j && overlaps(r1, range));

      if (adiacentRanges.length == 0) {
        mergedRanges.push(r1);
        continue;
      }

      const indexesToRemove = adiacentRanges
        .filter((x) => x.index > i)
        .map((x) => x.index);
      if (indexesToRemove.length > 0)
        ranges = ranges.filter(
          (_, rindex) => !indexesToRemove.includes(rindex)
        );

      const min = Math.min(r1[0], ...adiacentRanges.map((x) => x.range[0]));
      const max = Math.max(r1[1], ...adiacentRanges.map((x) => x.range[1]));

      mergedRanges.push([min, max]);
      foundOverlap = true;
    }

    ranges = mergedRanges;
  } while (foundOverlap);

  const result = ranges.reduce((acc, [a, b]) => acc + (b - a) + 1, 0);

  return result.toString();
}

function overlaps(
  [a, b]: readonly [number, number],
  [c, d]: readonly [number, number]
) {
  return (
    (a <= c && c <= b) ||
    (c <= a && a <= d) ||
    (c <= b && b <= d) ||
    (a <= d && d <= b)
  );
}
