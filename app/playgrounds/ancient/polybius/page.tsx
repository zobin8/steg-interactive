'use client'

import { alphabets } from "@/app/lib/substitution";
import { Footnote, FootnoteList, FootnoteProvider } from "@/app/ui/playgrounds/footnote";
import Heading from "@/app/ui/playgrounds/heading";
import PolybiusTable from "@/app/ui/playgrounds/polybius";
import { Alert } from "flowbite-react";

import Link from "next/link";

// Methods
const polybiusHeader = ['1', '2', '3', '4', '5'];

// Subcomponents

// Export

export default function Component() {
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

        <Heading level={2} name="Original Design" />
        <p>

        </p>
        <PolybiusTable
          headerRow={polybiusHeader}
          headerCol={polybiusHeader}
          contents={alphabets.latin25.split('')}
        />

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
