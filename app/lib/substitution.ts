export const alphabets = {
  latin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
};

export function affineCipher(text: string, alphabet: string, func: ((x: number) => number)) {
  text = text.toUpperCase();
  let output = '';

  for (const ch of text) {
    const index = alphabet.indexOf(ch);
    if (index < 0) {
      output += ch;
    } else {
      let newIndex = func(index);
      while (newIndex < 0) newIndex += alphabet.length;
      newIndex = newIndex % alphabet.length;
      output += alphabet[newIndex];
    }
  }

  return output;
}