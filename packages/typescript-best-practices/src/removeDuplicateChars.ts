function removeDuplicateChars(input: string) {
   let result: string = ""
   let seen = new Set<string>();
   for (const ch of input) {
      if(!seen.has(ch)) {
        seen.add(ch)
        result = `${result}${ch}`
      }
   }
   return result
}

console.log(removeDuplicateChars("aarfqwevzxcddd"));
