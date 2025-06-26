'use client'

import CipherTable from "@/app/ui/playgrounds/ciphertable";
import { Footnote, FootnoteList, FootnoteProvider } from "@/app/ui/playgrounds/footnote";
import Heading from "@/app/ui/playgrounds/heading";

import { RangeSlider } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const secret = 'ASABOVESOBELOW';

function shiftText(text: string, shift: number): string {
  text = text.toUpperCase();
  var output = '';

  const start = 'A'.charCodeAt(0);
  for (var ch of text) {
    if (ch > 'Z' || ch < 'A') {
      output += ch;
    } else {
      var index = ch.charCodeAt(0) - start;
      var shiftIndex = (index + shift) % 26;
      output += String.fromCharCode(shiftIndex + start);
    }
  }

  return output;
}

export default function Component() {
  const [key1, setKey1] = useState(1);
  const [key2, setKey2] = useState(1);
  const [secretKey, setSecret] = useState(2);

  // Set secret key on page load
  useEffect(() => {
    setSecret(1 + Math.floor(Math.random() * 24));
  }, []);

  const shiftedSecret = shiftText(secret, secretKey);

  return (
    <FootnoteProvider>
      <div className="flex flex-col gap-3">
        <Heading level={1} name="Caeser Cipher" />
        <p>
          Famously used by Julius Caeser, the Caeser cipher is a simple substitution cipher.
          First, a key is determined, which is a number between 1 and 25.
          Then, each letter in the alphabet is shifted right by that many letters.
          This cipher is still popular today due to its simplicity.
          <Footnote>
            See <Link className="text-primary-800 hover:text-primary-700" href="https://www.britannica.com/topic/Caesar-cipher">https://www.britannica.com/topic/Caesar-cipher</Link>
          </Footnote>
        </p>
        <Heading level={2} name="Example" />
        <p>
          Let's try an example. Pick a key by using the slider below, and watch the cipher table change.
        </p>
        <p>
          Key: A <FaLongArrowAltRight className="inline" /> {shiftText('A', key1)}
        </p>
        <RangeSlider id="key1" sizing="lg" min={1} max={25} value={key1} onChange={(evt) => setKey1(Number(evt.target.value))} />
        <CipherTable
          plaintext={alphabet}
          ciphertext={shiftText(alphabet, key1)}
        />
        <Heading level={2} name="Security" />
        <p>
          Since there are only 25 possible keys, it is rather easy to try all combinations until the text is readable.
          Additionally, the ciphertext is very obviously encrypted, so there is little steganographic security.
          Try it below:
        </p>
        <p>
          Key: A <FaLongArrowAltRight className="inline" /> {shiftText('A', key2)}
        </p>
        <RangeSlider id="key2" sizing="lg" min={1} max={25} value={key2} onChange={(evt) => setKey2(Number(evt.target.value))} />
        <CipherTable
          plaintext={shiftText(shiftedSecret, 26 - key2)}
          ciphertext={shiftedSecret}
          reverse={true}
        />
        <FootnoteList></FootnoteList>
      </div>
    </FootnoteProvider>
  );
}
