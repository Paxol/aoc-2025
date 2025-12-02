export default function run(lines: string[]) {

  const parsed = lines.map(x => ({ isDirLeft: x[0] == 'L', steps: Number.parseInt(x.substring(1)) }));
  let pos = 50;
  let zeroTimes = 0;

  for (const a of parsed) {
    const [q, r] = a.steps >= 100 ? intDivision(a.steps, 100) : [0, a.steps];

    if (q > 0) {
      zeroTimes += q;
    }

    const wasZero = pos == 0;

    if (a.isDirLeft)
      pos -= r;
    else
      pos += r;

    if (pos >= 100) {
      pos -= 100;
      
      if (!wasZero)
        zeroTimes++;
    }
    else if (pos == 0) {
      zeroTimes++;
    }
    else if (pos < 0) {
      pos += 100;
      
      if (!wasZero)
        zeroTimes++;
    }
  }

  return zeroTimes.toString();
}

function intDivision(a: number, b: number) {
  const q = Math.floor(a / b);
  const r = a % b;
  return [q, r] as const;
}