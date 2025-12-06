export default function run(lines: string[]) {
  const operands: number[][] = [];
  const operations = lines[lines.length - 1]!.split(' ').filter(x => x.length > 0);
  for (let i = 0; i < lines.length - 1; i++) {
    const row = lines[i]!;
    operands.push(row.split(' ').filter(x => x.length > 0).map(x => Number.parseInt(x)));
  }

  let globalSum = 0;
  
  for (let i = 0; i < operations.length; i++) {
    const isColumnOperationSum = operations[i] == '+';
    let result = isColumnOperationSum ? 0 : 1;
    
    for (let j = 0; j < operands.length; j++) {
      const element = operands[j]![i]!;
      if (isColumnOperationSum) {
        result += element;
      } else {
        result *= element;
      }
    }

    globalSum += result;
  }

  return globalSum.toString();
}
