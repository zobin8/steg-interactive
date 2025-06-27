// TODO: Fix final letters

export const alphabets = {
  latin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  hebrew: '' +
    '\u05D0' + // aleph
    '\u05D1' + // bet
    '\u05D2' + // gimel
    '\u05D3' + // daleth
    '\u05D4' + // heh
    '\u05D5' + // vav
    '\u05D6' + // zayin
    '\u05D7' + // het
    '\u05D8' + // tet
    '\u05D9' + // yodh
    '\u05DB' + // kaph
    '\u05DC' + // lamed
    '\u05DE' + // mem
    '\u05E0' + // nun
    '\u05E1' + // samech
    '\u05E2' + // ayin
    '\u05E4' + // peh
    '\u05E6' + // tzady
    '\u05E7' + // koof
    '\u05E8' + // reish
    '\u05E9' + // shin
    '\u05EA' // taw
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