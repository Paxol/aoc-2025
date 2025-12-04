export default function run(lines: string[]) {

  const rows = lines.length;
  const cols = lines[0]!.length;

  let map = lines.flatMap(mapRow);
  let seed = [] as { x: number, y: number }[];

  let reachable = 0, change = false;

  // Optimization: 
  // after the first scan we can check only
  // the cell adiacent to the ones just removed

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (map[index(x, y, cols)] == Cell.Empty)
        continue;

      const count = getAdiacentPaperCount(map, x, y, rows, cols);
      if (count < 4) {
        map[index(x, y, cols)] = Cell.Empty;
        seed.push({ x, y });
        reachable++;
      }
    }
  }

  do {
    change = false;

    const newSeeds = [];

    for (const s of seed) {
      for (let i = s.x - 1; i < s.x + 2; i++) {
        if (i < 0 || i >= cols)
          continue

        for (let j = s.y - 1; j < s.y + 2; j++) {
          if (j < 0 || j >= rows || (i == s.x && j == s.y))
            continue

          if (map[index(i, j, cols)] != Cell.Empty && getAdiacentPaperCount(map, i, j, rows, cols) < 4) {
            map[index(i, j, cols)] = Cell.Empty;
            newSeeds.push({ x: i, y: j })
            reachable++;
            change = true;
          }
        }
      }
    }

    seed = newSeeds;

  } while (change);

  // printMap(map, rows, cols);
  return reachable.toString();
}

enum Cell {
  Empty,
  Paper,
  ReachablePaper
}

function mapRow(row: string) {
  const parsed = []

  for (const c of row) {
    if (c == "@")
      parsed.push(Cell.Paper)
    else
      parsed.push(Cell.Empty)
  }

  return parsed;
}

function index(x: number, y: number, cols: number) {
  return y * cols + x
}

function coords(i: number, cols: number) {
  const y = Math.floor(i / cols);
  const x = i % cols;

  return { x, y };
}

function printMap(map: Cell[], rows: number, cols: number) {
  for (let y = 0; y < rows; y++) {
    const acc = [];
    for (let x = 0; x < cols; x++) {
      const c = map[index(x, y, cols)]
      if (c == Cell.ReachablePaper)
        acc.push('x')
      if (c == Cell.Paper)
        acc.push('@')
      if (c == Cell.Empty)
        acc.push('.')
    }
    console.log(acc.join(''))
  }
}

function getAdiacentPaperCount(map: Cell[], x: number, y: number, rows: number, cols: number) {
  let count = 0;

  for (let i = x - 1; i < x + 2; i++) {
    if (i < 0 || i >= cols)
      continue

    for (let j = y - 1; j < y + 2; j++) {
      if (j < 0 || j >= rows || (i == x && j == y))
        continue

      if (map[index(i, j, cols)] != Cell.Empty)
        count++;
    }
  }

  return count;
}