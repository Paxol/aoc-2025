export default function run(lines: string[]) {
  const separatorIndex = lines.indexOf("");
  const ranges = lines.filter((_, i) => i < separatorIndex).map(s => {
    const match = s.match(/(\d+)-(\d+)/);
    if (match == null || match.length != 3)
      throw new Error("malformed input");

    return [Number.parseInt(match[1] ?? '0'), Number.parseInt(match[2] ?? '0')] as const;
  });

  const availableItems = lines.filter((_, i) => i > separatorIndex).map(x => Number.parseInt(x))

  let freshCount = 0;

  for (const item of availableItems) {
    const found = ranges.find(([a, b]) => a <= item && b >= item) !== undefined;
    if (found)
      freshCount++
  }

  return freshCount.toString();
}
