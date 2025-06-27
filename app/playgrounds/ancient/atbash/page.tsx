'use client'

import { affineCipher, alphabets } from "@/app/lib/substitution";
import CipherTable from "@/app/ui/playgrounds/ciphertable";
import { Footnote, FootnoteList, FootnoteProvider } from "@/app/ui/playgrounds/footnote";
import Heading from "@/app/ui/playgrounds/heading";
import { TryItOut, TryItOutProvider } from "@/app/ui/playgrounds/tryitout";

import { Alert } from "flowbite-react";
import Link from "next/link";

const secret = '';

function atbash(x: number): number {
  return -1 - x;
}

// Subcomponents

function TryAtbash({alphabet}: {alphabet: string}) {
  function encode(text: string) {
    return affineCipher(text, alphabet, atbash);
  }

  return (
    <TryItOutProvider encode={encode} decode={encode}>
      <TryItOut></TryItOut>
    </TryItOutProvider>
  );
}

// Export

export default function Component() {
  var alphabet = alphabets.latin;

  return (
    <FootnoteProvider>
      <Alert color="warning">
        <span className="font-medium me-1">Under Construction!</span>
        Parts of this page are unfinished. Sections may be missing or incomplete.
      </Alert>
      <div className="flex flex-col gap-3">
        <Heading level={1} name="Atbash Cipher" />
        <p>
          Atbash is one of the first substitution ciphers in recorded history.
          It was most prominently used in Jeremiah of the Hebrew Bible.
          For example, Jeremiah 25:26 includes a prophecy for the city of Babylon, where Babylon is written in Atbash rather than spelled out directly.
          Some scholars argue that this was a literary device to represent an inversion of the power of words.
          <Footnote>
            Read
            <Link className="text-primary-800 hover:text-primary-700 mx-1" href="https://faculty.washington.edu/snoegel/PDFs/articles/Noegel%2015%20-%20JBQ%201996a.pdf">Atbash in Jeremiah and Its Literary Significance</Link>
            for more information.
          </Footnote>
        </p>
        <p>
          Since Atbash is a simple substitution cipher, every letter is replaced in-place by another letter.
          For Atbash, the encoded letter is derived by reversing the Alphabet. A becomes Z, and B becomes Y.
        </p>

        <Heading level={2} name="Encryption" />
        <p>
          In Atbash, there is no encryption key. Letters are always encoded in reverse order:
        </p>
        <CipherTable plaintext={alphabet} ciphertext={affineCipher(alphabet, alphabet, atbash)}/>

        <Heading level={2} name="Security" />
        <p>
          The lack of an encryption key also means that Atbash provides no cryptographic security.
          If a text is known to be written in Atbash, it can be decoded instantly.
          Nonetheless, it remains influential in later substitution ciphers.
        </p>

        <Heading level={2} name="Try it Out" />
        <TryAtbash alphabet={alphabet} />

        <FootnoteList />
      </div>
    </FootnoteProvider>
  );
}
