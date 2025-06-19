import { Footnote, FootnoteList, FootnoteProvider } from "@/app/ui/playgrounds/footnote";
import Heading from "@/app/ui/playgrounds/heading";

import { Alert } from "flowbite-react";
import Link from "next/link";

export default function Component() {
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
        <Heading level={2} name="Construction" />
        <p>

        </p>
        <Heading level={2} name="Security" />
        <p>

        </p>
        <FootnoteList></FootnoteList>
      </div>
    </FootnoteProvider>
  );
}
