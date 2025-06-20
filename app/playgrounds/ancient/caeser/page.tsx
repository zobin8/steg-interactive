'use client'

import { Footnote, FootnoteList, FootnoteProvider } from "@/app/ui/playgrounds/footnote";
import Heading from "@/app/ui/playgrounds/heading";

import { Alert, RangeSlider, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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
  const [key, setKey] = useState(1);

  var alphabetParts = [];
  for (var start = 0; start < alphabet.length; start += 13) {
    alphabetParts.push(alphabet.slice(start, start + 13));
  }

  return (
    <FootnoteProvider>
      <div className="flex flex-col gap-3">
        <Alert color="warning">
          <span className="font-medium me-1">Under Construction!</span>
          Parts of this page are unfinished. Sections may be missing or incomplete.
        </Alert>
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
          Key: A <FaLongArrowAltRight className="inline" /> {shiftText('A', key)}
        </p>
        <RangeSlider id="key1" sizing="lg" min={1} max={25} value={key} onChange={(evt) => setKey(Number(evt.target.value))} />
        <p>Cipher table:</p>
        <Table>
          {alphabetParts.map((plaintext) => (
            <>
              <TableHead>
                <TableRow>
                  {plaintext.map((ch) => (
                    <TableHeadCell key={ch}>{ch}</TableHeadCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                <TableRow>
                  {plaintext.map((ch) => (
                    <TableCell key={ch}>{shiftText(ch, key)}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </>
          ))}
        </Table>
        <Heading level={2} name="Security" />
        <p>

        </p>
        <FootnoteList></FootnoteList>
      </div>
    </FootnoteProvider>
  );
}
