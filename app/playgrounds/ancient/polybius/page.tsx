'use client'

import { alphabets, twoWayCipher } from "@/app/lib/substitution";
import { AlphabetContext, AlphabetProvider, AlphabetSelect } from "@/app/ui/playgrounds/alphabet-select";
import CipherTable from "@/app/ui/playgrounds/ciphertable";
import { Footnote, FootnoteList, FootnoteProvider } from "@/app/ui/playgrounds/footnote";
import Heading from "@/app/ui/playgrounds/heading";
import PolybiusTable from "@/app/ui/playgrounds/polybius";
import { TryItOut, TryItOutContext, TryItOutProvider } from "@/app/ui/playgrounds/tryitout";
import { Alert } from "flowbite-react";

import Link from "next/link";
import { useContext } from "react";

const polybiusHeader = ['1', '2', '3', '4', '5'];

// 11, 12, 13, 14, 15, 21, ...
const polybiusAlphabet = polybiusHeader.flatMap((ch1) => polybiusHeader.map((ch2) => ch1 + ch2));

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

function joinCipher(cipher: (arg0: string) => string[]): ((arg0: string) => string) {
  return (arg0) => cipher(arg0).join('');
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

  function getExampleText(alphabet: string[]): string {
    if (alphabet == alphabets.greek) {
      return 'Πυθαγόρας';
    }
    return 'Pythagoras';
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

function TryPolybiusWithContext({alphabet}: {alphabet: string[]}) {
  const context = useContext(TryItOutContext);
  if(!context) {
    throw new Error("Missing TryItOut context");
  }

  // TODO: Add key selection
  return (
    <>
      <TryItOut alphabet={alphabet} cipherAlphabet={polybiusAlphabet}/>
    </>
  )
}

function TryPolybius() {
  const context = useContext(AlphabetContext);
  if(!context) {
    throw new Error("Missing Alphabet context");
  }

  const ciphers = makeEncoderDecoder(context.alphabet);

  return (
    <TryItOutProvider encode={joinCipher(ciphers.encode)} decode={joinCipher(ciphers.decode)}>
      <TryPolybiusWithContext alphabet={context.alphabet}/>
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
          <p>
            
          </p>

          <Heading level={2} name="Variation with Key" />
          <p>
            
          </p>

          <Heading level={2} name="Try it Out" />
          <TryPolybius />

          <FootnoteList></FootnoteList>
        </div>
      </AlphabetProvider>
    </FootnoteProvider>
  );
}
