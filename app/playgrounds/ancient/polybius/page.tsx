'use client'

import { alphabets, twoWayCipher } from "@/app/lib/substitution";
import CipherTable from "@/app/ui/playgrounds/ciphertable";
import { Footnote, FootnoteList, FootnoteProvider } from "@/app/ui/playgrounds/footnote";
import Heading from "@/app/ui/playgrounds/heading";
import PolybiusTable from "@/app/ui/playgrounds/polybius";
import { Alert, Label, Select } from "flowbite-react";

import Link from "next/link";
import { useState } from "react";

const polybiusHeader = ['1', '2', '3', '4', '5'];

// 11, 12, 13, 14, 15, 21, ...
const polybiusAlphabet = polybiusHeader.flatMap((ch1) => polybiusHeader.map((ch2) => ch1 + ch2));

// Methods

// Subcomponents
export function OriginalSection({alphabet}: {alphabet: string}) {
  function getExampleContents(alphabet: string): string[] {
    var exampleContents = alphabet.split('');
    return exampleContents.map(item => item.replace('I', 'I/J'));
  }

  function getExampleText(alphabet: string): string {
    if (alphabet == alphabets.greek) {
      return 'Πυθαγόρας';
    }
    return 'Pythagoras';
  }

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
        contents={getExampleContents(alphabet)}
      />
      <p>
        Note that since the latin alphabet has 26 characters, I and J are merged into one cell.
        The original greek did not have this issue.
      </p>
      <p>
        To encode a phrase using the square, replace each letter with its column and row number.
        The final ciphertext should consist only of a series of numbers.
      </p>
      <CipherTable
        plaintext={getExampleText(alphabet)}
        ciphertext={twoWayCipher(getExampleText(alphabet), alphabet.split(''), polybiusAlphabet)}
      />
    </>
  );
}

// Export

export default function Component() {
  const [alphabet, setAlphabet] = useState(alphabets.latin25);

  

  return (
    <FootnoteProvider>
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

        <Heading level={2} name="Alphabet Selection" />
        <p>
          This page is available in multiple alphabets.
          The original polybius square was made in Greek, but Latin variants have also been used throughout history.
        </p>
        <Label htmlFor="select-alphabet">Select Alphabet:</Label>
        <Select id="select-alphabet" value={alphabet} onChange={(evt) => setAlphabet(evt.target.value)}>
          <option value={alphabets.latin25}>Latin</option>
          <option value={alphabets.greek}>Greek</option>
        </Select>

        <Heading level={2} name="Original Design" />
        <OriginalSection alphabet={alphabet}/>
        

        <Heading level={2} name="Use in Steganography" />
        <p>
          
        </p>

        <Heading level={2} name="Variation with Key" />
        <p>
          
        </p>

        <Heading level={2} name="Try it Out" />
        <p>
          
        </p>

        <FootnoteList></FootnoteList>
      </div>
    </FootnoteProvider>
  );
}
