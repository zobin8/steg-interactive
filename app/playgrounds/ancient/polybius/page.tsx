'use client'

import { alphabets, standardize, twoWayCipher } from "@/app/lib/substitution";
import { AlphabetContext, AlphabetProvider, AlphabetSelect } from "@/app/ui/playgrounds/alphabet-select";
import CipherTable from "@/app/ui/playgrounds/ciphertable";
import { Footnote, FootnoteList, FootnoteProvider } from "@/app/ui/playgrounds/footnote";
import Heading from "@/app/ui/playgrounds/heading";
import PolybiusTable from "@/app/ui/playgrounds/polybius";
import { TryItOut, TryItOutContext, TryItOutProvider } from "@/app/ui/playgrounds/tryitout";
import { Alert, Blockquote, Kbd, Label, TextInput } from "flowbite-react";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const covertext = 'There is use for cryptography, both in history and the modern day, when you want to hide text from someone.';
const polybiusHeader = ['1', '2', '3', '4', '5'];
const polybiusAlphabet = polybiusHeader.flatMap(
  (ch1) => polybiusHeader.map((ch2) => ch1 + ch2) // 11, 12, 13, 14, 15, 21, ...
);

// Methods

function makeEncoderDecoder(alphabet: string[]) {
  function encode(text: string) {
    return twoWayCipher(text, alphabet, polybiusAlphabet, 1);
  }

  function decode(text: string) {
    return twoWayCipher(text, polybiusAlphabet, alphabet, 2);
  }

  return {encode, decode}
}

function createKeyedAlphabet(key: string, alphabet: string[]): string[] {
  var newAlphabet: string[] = [];
  const standardKey = standardize(key);
  const items = [...standardKey.split(''), ...alphabet];
  for (const ch of items) {
    if (!newAlphabet.includes(ch) && alphabet.includes(ch)) {
      newAlphabet.push(ch);
    }
  }

  return newAlphabet;
}

function joinCipher(cipher: (arg0: string) => string[]): ((arg0: string) => string) {
  return (arg0) => cipher(arg0).join('');
}

function getExampleText(alphabet: string[]): string {
  if (alphabet == alphabets.greek) {
    return 'Πυθαγόρας';
  }
  return 'Pythagoras';
}

function getDefaultKey(alphabet: string[]): string {
  if (alphabet == alphabets.greek) {
    return 'Τρισμέγιστος';
  }
  return 'Trismegistus';
}

function getSecretText(alphabet: string[]): string {
  var key = 'APHRRODITE OURANIA';
  var text = '1324115124314254,2242422545231422152545,4211253513232414-421551223135 4425242431';
  if (alphabet == alphabets.greek) {
    key = 'Ἀφροδίτη Οὐρανία';
    text = '14241311252123,4514422424432533,1221421443433321152351 1112131415212223';
  }
  return makeEncoderDecoder(createKeyedAlphabet(key, alphabet)).decode(text).join('');
}

function pickRandomKey(alphabet: string[], length: number): string {
  var remaining = [...alphabet];
  var key = ''
  while (key.length < length) {
    const index = Math.floor(Math.random() * remaining.length);
    key += remaining[index];
    remaining.splice(index, 1);
  }

  return key;
}

// Subcomponents

function OriginalSection() {
  const context = useContext(AlphabetContext);
  if(!context) {
    throw new Error("Missing Alphabet context");
  }

  function getExampleContents(alphabet: string[]): string[] {
    return alphabet.map(item => item.replace('I', 'I/J'));
  }

  const ciphers = makeEncoderDecoder(context.alphabet);

  return (
    <>
      <p>
        To construct a Polybius square, create a 5x5 table with the rows and columns labelled 1 through 5.
        Then, write the letters of the alphabet in left-to-right reading order.
        The resulting table should look like this:
      </p>
      <PolybiusTable
        headerRow={polybiusHeader}
        headerCol={polybiusHeader}
        contents={getExampleContents(context.alphabet)}
      />
      <p>
        Note that since the latin alphabet has 26 characters, I and J are merged into one cell.
        The original greek did not have this issue.
        To encode a phrase using the square, replace each letter with its row and column number.
        The final ciphertext should consist only of a series of numbers.
      </p>
      <CipherTable
        plaintext={getExampleText(context.alphabet)}
        ciphertext={ciphers.encode(getExampleText(context.alphabet))}
        highlightFullCol={true}
      />
    </>
  );
}

function HideText({coverText, hideChars}: {coverText: string, hideChars: string[]}) {
  const context = useContext(AlphabetContext);
  if(!context) {
    throw new Error("Missing Alphabet context");
  }

  const hiddenText = getExampleText(context.alphabet);
  const ciphers = makeEncoderDecoder(context.alphabet);
  const hiddenNumbers = ciphers.encode(hiddenText).join('').split('').map((ch) => Number(ch));

  const words = coverText.split(' ');
  while (words.length < hiddenNumbers.length) {
    words.push(' ');
  }

  let text = words.map((word, index) => 
    word + (hideChars[hiddenNumbers[index]] || '')
  ).join('');

  return (
    <Blockquote className="border-l-4 p-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
      {text}
    </Blockquote>
  );
}

function UseSection() {
  const context = useContext(AlphabetContext);
  if(!context) {
    throw new Error("Missing Alphabet context");
  }

  return (
    <>
      <p>
        The Polybius cipher can be useful in steganography.
        It fractionalizes a text to only contain the numbers 1 through 5.
        These numbers can be much easier to hide than regular letters.
        For example, here is the example text above, encoded as dots:
      </p>
      <HideText
        coverText=""
        hideChars={["", ".", "..", "...", "....", "....."]}
      />
      <p>
        This is still pretty visible, so we will hide it in some covertext.
        Try counting the spaces in the text below (Use text highlighting):
      </p>
      <HideText
        coverText={covertext}
        hideChars={[
          "",
          "\u2003",
          "\u2002\u2002",
          "\u2004\u2004\u2004",
          "\u2005\u2005\u2005\u2005",
          "\u2006\u2006\u2006\u2006\u2006"
        ]}
      />
      <p>
        Apart from these steganographic uses, however, the original Polybius cipher is cryptographically weak.
        We don't have a key, so if an attacker knows the Polybius cipher, they can instantly decrypt the text.
        Let's try changing that.
      </p>
    </>
  );
}

function KeySection() {
  const context = useContext(AlphabetContext);
  if(!context) {
    throw new Error("Missing Alphabet context");
  }

  const secretText = getSecretText(context.alphabet);
  const blankText = '.'.repeat(secretText.length).split('');

  const [key, setKey] = useState('');
  const [secretKey, setSecret] = useState('ZXYWV');
  const [plaintext, setPlaintext] = useState<string[]>(blankText);
  const [ciphertext, setCiphertext] = useState<string[]>(blankText);

  // Set secret key on page load
  useEffect(() => {
    const newKey = pickRandomKey(context.alphabet, 5);
    setSecret(newKey);
    console.log(newKey);

    const secretAlphabet = createKeyedAlphabet(newKey, context.alphabet);
    const secretCiphers = makeEncoderDecoder(secretAlphabet);
    const newText = secretCiphers.encode(secretText);
    setCiphertext(newText);
  }, [context.alphabet]);

  // Update ciphers for user key
  useEffect(() => {
    const userAlphabet = createKeyedAlphabet(key, context.alphabet);
    const userCiphers = makeEncoderDecoder(userAlphabet);
    setPlaintext(userCiphers.decode(ciphertext.join('')));
  }, [key, secretKey, ciphertext, context.alphabet])

  const defaultKey = getDefaultKey(context.alphabet);
  const defaultAlphabet = createKeyedAlphabet(defaultKey, context.alphabet);

  return (
    <>
      <p>
        One way to add a key to a Polybius cipher is by writing a key word into the Polybius square.
        For example, let's try the key "{defaultKey}".
        We first drop any duplicate letters, and then append any unused letters in order to the key.
        This gives us a new ordering of the alphabet: "{defaultAlphabet.join('')}".
        We can now plug this into the Polybius square.
      </p>
      <PolybiusTable
        headerRow={polybiusHeader}
        headerCol={polybiusHeader}
        contents={defaultAlphabet}
      />
      <p>
        Now, to encode a letter, we take the row and column number from this table.
        This gives us a substitution cipher with a relatively large number of possible keys.
        While the Caeser cipher only had 26 possible keys, this has 26! (or about 4x10<sup>26</sup>).
        Surely this cipher is unbreakable, right?
      </p>
      <Heading level={3} name="Attack 1: Bad Keys"/>
      <p>
        Look at the last row of our new Polybius square. It's the same as the original.
        Since our key was less than 26 letters, the last few letters had to be filled in from the alphabet.
        While the first row is mostly encrypted, the last row is not.
        A smart attacker could use those letters to maybe figure out the rest of the message.
        To avoid this, our key would need to contain all letters of the alphabet out of order.
      </p>
      <p>
        The ciphertable below contains a message created with a bad key (only 5 letters in length).
        Can you figure out what it says?
      </p>
      <Label htmlFor="key1">Key:</Label>
      <TextInput id="key1" placeholder="Key?" onChange={(evt) => setKey(evt.target.value)} value={key}/>
      <CipherTable
        plaintext={plaintext}
        ciphertext={ciphertext}
        highlightFullCol={true}
      />
      <Heading level={3} name="Attack 2: Frequency Analysis"/>
      <p>
        Even if the key was perfect, this cipher can be broken.
        In this substitution cipher, all instances of the same letter always have the same ciphertext (Known as a monoalphabetic substition cipher).
        All ciphers of this type are vulnerable to frequency analysis.
        Polybius, however, most certainly did not know about this.
        We will cover Frequency analysis in a
        <Link
          className="text-primary-800 hover:text-primary-700 ms-1"
          href="/playgrounds/postclassical/frequency-analysis"
        >
          later section
        </Link>.
      </p>
    </>
  );
}

function TryPolybiusWithContext({alphabet, value, setValue}: {alphabet: string[], value: string, setValue: ((arg0: string) => void)}) {
  const tryContext = useContext(TryItOutContext);
  if(!tryContext) {
    throw new Error("Missing TryItOut context");
  }

  useEffect(() => {tryContext.handleUpdate({})}, [tryContext, value]);

  return (
    <>
      <Label htmlFor="key2">Key:</Label>
      <TextInput id="key2" onChange={(evt) => setValue(evt.target.value)} value={value}/>
      <TryItOut alphabet={alphabet} cipherAlphabet={polybiusAlphabet}/>
    </>
  )
}

function TryPolybius() {
  const alphaContext = useContext(AlphabetContext);
  if(!alphaContext) {
    throw new Error("Missing Alphabet context");
  }

  const [key, setKey] = useState('');

  const keyAlphabet = createKeyedAlphabet(key, alphaContext.alphabet);
  const ciphers = makeEncoderDecoder(keyAlphabet);

  return (
    <TryItOutProvider encode={joinCipher(ciphers.encode)} decode={joinCipher(ciphers.decode)}>
      <TryPolybiusWithContext alphabet={alphaContext.alphabet} value={key} setValue={setKey}/>
    </TryItOutProvider>
  );
}

// Export

export default function Component() {
  return (
    <FootnoteProvider>
      <AlphabetProvider defaultAlphabet={alphabets.latin25}>
        <div className="flex flex-col gap-3">
          <Alert color="warning">
            <span className="font-medium me-1">Under Construction!</span>
            Parts of this page are unfinished. Sections may be missing or incomplete.
          </Alert>

          <Heading level={1} name="Polybius Square" />
          <p>
            The Polybius Square, popularized by the ancient greek historian Polybius, is a table used for substitution ciphers.
            Its original use was to reduce the alphabet into the numbers 1 through 5, for easier use in fire signaling.
            However, this ability to fractionalize the alphabet into smaller symbols was used throughout an entire family of ciphers.
            <Footnote>
              The paper
              <Link
                className="text-primary-800 hover:text-primary-700 mx-1"
                href="https://www.researchgate.net/publication/342637897_Polybius_Square_in_Cryptography_A_Brief_Review_of_Literature"
              >
                &quot;Polybius Square in Cryptography: A Brief Review of Literature&quot;
              </Link>
              covers this in depth.
            </Footnote>
          </p>

          <AlphabetSelect
            options={[alphabets.latin25, alphabets.greek]}
          >
            This page is available in multiple alphabets.
            The original polybius square was made in Greek, but Latin variants have also been used throughout history.
          </AlphabetSelect>

          <Heading level={2} name="Original Design" />
          <OriginalSection />

          <Heading level={2} name="Uses" />
          <UseSection />

          <Heading level={2} name="Variation with Key" />
          <KeySection />

          <Heading level={2} name="Try it Out" />
          <TryPolybius />

          <FootnoteList></FootnoteList>
        </div>
      </AlphabetProvider>
    </FootnoteProvider>
  );
}
