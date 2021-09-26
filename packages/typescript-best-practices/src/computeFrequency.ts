function computeFrequency(input: string) {
  const freqTable = new Map()
  for (const ch of input) {
    freqTable.set(ch, !freqTable.has(ch) ? 1 : freqTable.get(ch) + 1)
  }
  return freqTable;
}

console.log(computeFrequency("12345"))
