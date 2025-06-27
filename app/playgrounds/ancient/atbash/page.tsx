'use client'

import CipherTable from "@/app/ui/playgrounds/ciphertable";
import { Footnote, FootnoteList, FootnoteProvider } from "@/app/ui/playgrounds/footnote";
import Heading from "@/app/ui/playgrounds/heading";

import { Alert, Label, RangeSlider, Textarea } from "flowbite-react";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const secret = '';

// Methods

function encode(text: string): string {
  text = text.toUpperCase();
  var output = '';

  const start = 'A'.charCodeAt(0);
  for (var ch of text) {
    if (ch > 'Z' || ch < 'A') {
      output += ch;
    } else {
      var index = ch.charCodeAt(0) - start;
      var shiftIndex = 25 - index;
      output += String.fromCharCode(shiftIndex + start);
    }
  }

  return output;
}

// Export

export default function Component() {
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
        <CipherTable plaintext={alphabet} ciphertext={encode(alphabet)}/>

        <Heading level={2} name="Security" />
        <p>
          The lack of an encryption key also means that Atbash provides no cryptographic security.
          If a text is known to be written in Atbash, it can be decoded instantly.
          Nonetheless, it remains influential in later substitution ciphers.
        </p>

        <FootnoteList />
      </div>
    </FootnoteProvider>
  );
}
