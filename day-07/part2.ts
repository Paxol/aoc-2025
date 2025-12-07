export default function run(lines: string[]) {
  const map = lines.map(x => x.split(''));
  const rows = map.length;
  const cols = map[0]!.length;

  const startingPos = [0, map[0]!.indexOf('S')] as const;

  const result = solve(map, startingPos, new Map());
  return result.toString();
}

function solve(map: readonly string[][], pos: readonly [number, number], timelinesCache: Map<string, number>): number {
  let newPos = [pos[0], pos[1]] as const;
  
  do {
    newPos = [newPos[0] + 1, newPos[1]];

    if (newPos[0] >= map.length)
      return 1;
    
  } while (map[newPos[0]]![newPos[1]] != '^');

  const posKey = `${newPos[0]},${newPos[1]}`;
  if (timelinesCache.has(posKey))
    return timelinesCache.get(posKey)!;

  const left = [newPos[0], newPos[1] - 1] as const;
  const right = [newPos[0], newPos[1] + 1] as const;

  const leftSolution = solve(map, left, timelinesCache);
  const rightSolution = solve(map, right, timelinesCache);

  timelinesCache.set(posKey, leftSolution + rightSolution);

  return leftSolution + rightSolution
}