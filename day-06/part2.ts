export default function run(lines: string[]) {
  const maxLen = lines[0]!.length;
  const operations = lines[lines.length - 1]!.split('').map((operation, index) => ({operation, index})).filter(x => x.operation !== " ");
  
  let globalSum = 0;

  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i]!.operation;
    const start = operations[i]!.index;
    const end = (operations.at(i + 1)?.index ?? (maxLen + 1)) - 1;

    const isColumnOperationSum = operation == '+';
    let columnResult = isColumnOperationSum ? 0 : 1;

    for (let j = start; j < end; j++) {
      let num = "";
      for (let k = 0; k < lines.length - 1; k++) {
        const char = lines[k]![j]!;
        if (char == " ")
          continue;

        num += char
      }

      if (isColumnOperationSum) {
        columnResult += Number.parseInt(num);
      } else {
        columnResult *= Number.parseInt(num);
      }
    }

    globalSum += columnResult;
  }

  return globalSum.toString();
}
