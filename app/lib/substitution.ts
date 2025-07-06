// TODO: Fix final letters

export const alphabets = {
  latin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  latin25: 'ABCDEFGHIKLMNOPQRSTUVWXYZ'.split(''),
  greek: [
    '\u0391', // alpha
    '\u0392', // beta
    '\u0393', // gamma
    '\u0394', // delta
    '\u0395', // epsilon
    '\u0396', // zeta
    '\u0397', // eta
    '\u0398', // theta
    '\u0399', // iota
    '\u039A', // kappa
    '\u039B', // lambda
    '\u039C', // mu
    '\u039D', // nu
    '\u039E', // xi
    '\u039F', // omicron
    '\u03A0', // pi
    '\u03A1', // rho
    '\u03A3', // sigma
    '\u03A4', // tau
    '\u03A5', // upsilon
    '\u03A6', // phi
    '\u03A7', // chi
    '\u03A8', // psi
    '\u03A9',  // omega
  ],
  hebrew: [
    '\u05D0', // aleph
    '\u05D1', // bet
    '\u05D2', // gimel
    '\u05D3', // dalet
    '\u05D4', // he
    '\u05D5', // vav
    '\u05D6', // zayin
    '\u05D7', // het
    '\u05D8', // tet
    '\u05D9', // yod
    '\u05DB', // kaph
    '\u05DC', // lamed
    '\u05DE', // mem
    '\u05E0', // nun
    '\u05E1', // samekh
    '\u05E2', // ayin
    '\u05E4', // pe
    '\u05E6', // tzadi
    '\u05E7', // kof
    '\u05E8', // resh
    '\u05E9', // shin
    '\u05EA',  // tav
  ],
};

export function standardize(text: string): string {
  return text.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function affineCipher(text: string, alphabet: string[], func: ((x: number) => number)) {
  text = standardize(text);
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

export function twoWayCipher(text: string, plainAlphabet: string[], cipherAlphabet: string[], step: number = 1): string[] {
  text = standardize(text);
  const output: string[] = [];

  for (let textIndex = 0; textIndex < text.length; textIndex += step) {
    const ch = text.slice(textIndex, textIndex + step);
    const plainIndex = plainAlphabet.indexOf(ch);
    if (plainIndex < 0) {
      output.push(ch);
    } else {
      output.push(cipherAlphabet[plainIndex]);
    }
  }

  return output;
}
