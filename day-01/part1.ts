export default function run(lines: string[]) {
  
  const parsed = lines.map(x => ({isDirLeft: x[0] == 'L', steps: Number.parseInt(x.substring(1))}));
  let pos = 50;
  let zeroTimes = 0;

  for (const a of parsed) {
    const mod = a.steps % 100;
    
    if (a.isDirLeft)
      pos = (pos - mod) % 100;
    else
      pos = (pos + mod) % 100;

    if (pos == 0)
      zeroTimes++;
  }

  return zeroTimes.toString();
}
