export default function run(lines: string[]) {

  const rows = lines.length;
  const cols = lines[0]!.length;

  const map = lines.flatMap(mapRow);

  let reachable = 0, change = false, iters = 0;

  do {
    change = false;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (map[coords(x, y, cols)] == Cell.Empty)
          continue;
  
        const count = getAdiacentPaperCount(map, x, y, rows, cols);
        if (count < 4) {
          map[coords(x, y, cols)] = Cell.Empty
          reachable++;
          change = true;
        }
      }
    }
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

function coords(x: number, y: number, cols: number) {
  return y * cols + x
}

function printMap(map: Cell[], rows: number, cols: number) {
  for (let y = 0; y < rows; y++) {
    const acc = [];
    for (let x = 0; x < cols; x++) {
      const c = map[coords(x, y, cols)]
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

      if (map[coords(i, j, cols)] != Cell.Empty)
        count++;
    }
  }

  return count;
}