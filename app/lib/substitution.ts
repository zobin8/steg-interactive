// TODO: Fix final letters

export const alphabets = {
  latin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  latin25: 'ABCDEFGHIKLMNOPQRSTUVWXYZ',
  hebrew: '' +
    '\u05D0' + // aleph
    '\u05D1' + // bet
    '\u05D2' + // gimel
    '\u05D3' + // dalet
    '\u05D4' + // he
    '\u05D5' + // vav
    '\u05D6' + // zayin
    '\u05D7' + // het
    '\u05D8' + // tet
    '\u05D9' + // yod
    '\u05DB' + // kaph
    '\u05DC' + // lamed
    '\u05DE' + // mem
    '\u05E0' + // nun
    '\u05E1' + // samekh
    '\u05E2' + // ayin
    '\u05E4' + // pe
    '\u05E6' + // tzadi
    '\u05E7' + // kof
    '\u05E8' + // resh
    '\u05E9' + // shin
    '\u05EA' // tav
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