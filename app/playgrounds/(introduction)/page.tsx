import Heading from "@/app/ui/playgrounds/heading";
import { HR } from "flowbite-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col gap-3">
      <Heading level={1} name="Introduction" />
      <p>
        This collection will explore a variety of steganographic and cryptographic techniques throughout history.
        Each section will include a small interactive widget to play around with each concept, learn how it works, and how it may be defeated.
        Since these are historical techniques, they are generally not considered cryptographically secure by modern standards.
        However, some of them still find use in Alternate Reality Games and can be quite fun to use.
      </p>
      <Heading level={2} name="What is Cryptography?" />
      <p>
        Cryptography is the practice of obscuring information from third parties.
        If an adversary finds a cryptographic message, they should not be able to decipher it.
        <sup id="citation-1-ref"><Link className="text-primary-800 me-1" href="#citation-1-note">[1]</Link></sup>
        In contemporary uses, it should be virtually impossible to decipher the original message.
        This guarantee should hold even if the adversary knows which technique is being used.
      </p>
      <Heading level={2} name="What is Steganography?" />
      <p>
        While cryptography hides the meaning of information, steganography attempts to hide the presence of information.
        When an adversary sees people communicating steganographically, they should not be able to tell that they are having a conversation.
        Steganography usually conceals the message within something else, such as an unimportant text or image.
      </p>
      <Heading level={2} name="A Note on Structure" />
      <p>
        The information provided is loosely sorted in chronological order, broken up into three major time periods.
        Feel free to skip around!
        While some concepts are continuations of earlier ideas, links will be provided to read up on what you missed.
      </p>
      <Heading level={2} name="Footnotes" className="mt-8"/>
      <HR className="my-0"/>
      <ol className="list-decimal list-inside">
        <li>
          <sup id="citation-1-note"><Link className="text-primary-800 me-1" href="#citation-1-ref">^</Link></sup>
          This is known as <Link href="https://en.wikipedia.org/wiki/Kerckhoffs%27s_principle">Kerckhoff's Principle</Link>
        </li>
      </ol>
    </div>
  );
}
