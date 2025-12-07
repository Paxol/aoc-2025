export default function run(lines: string[]) {
  const map = lines.map(x => x.split(''));
  const rows = map.length;
  const cols = map[0]!.length;

  const startingPos = [0, map[0]!.indexOf('S')] as const;

  const result = solve(map, startingPos, new Set());
  return result.toString();
}

function solve(map: readonly string[][], pos: readonly [number, number], splitPositions: Set<string>): number {
  let newPos = [pos[0], pos[1]] as const;
  
  do {
    newPos = [newPos[0] + 1, newPos[1]];

    if (newPos[0] >= map.length)
      return 0;
    
  } while (map[newPos[0]]![newPos[1]] != '^');

  const posKey = `${newPos[0]},${newPos[1]}`;
  if (splitPositions.has(posKey))
    return splitPositions.size;

  splitPositions.add(posKey);

  const left = [newPos[0], newPos[1] - 1] as const;
  const right = [newPos[0], newPos[1] + 1] as const;

  solve(map, left, splitPositions);
  solve(map, right, splitPositions);
  return splitPositions.size;
}