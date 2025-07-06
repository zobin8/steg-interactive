'use client'

import { affineCipher, alphabets } from "@/app/lib/substitution";
import CipherTable from "@/app/ui/playgrounds/ciphertable";
import { Footnote, FootnoteList, FootnoteProvider } from "@/app/ui/playgrounds/footnote";
import Heading from "@/app/ui/playgrounds/heading";
import { TryItOut, TryItOutContext, TryItOutProvider } from "@/app/ui/playgrounds/tryitout";

import { RangeSlider } from "flowbite-react";
import Link from "next/link";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const secret = 'RJRSFMVJFSVCFN';
const secretOffset = 17;

// Methods
function shiftText(text: string, shift: number): string {
  return affineCipher(text, alphabets.latin, (x) => x + shift);
}


// Subcomponents
interface KeySliderProps {
  value: number,
  setValue: ((arg0: number) => void),
  id: string,
  onChange?: ((evt: ChangeEvent<HTMLInputElement>) => void)
}
function KeySlider({value, setValue: setValue, id, onChange = undefined}: KeySliderProps) {
  return (
    <>
      <p>
        Key: A <FaLongArrowAltRight className="inline" /> {shiftText('A', value)} (+{value})
      </p>
      <RangeSlider
        id={id}
        sizing="lg"
        min={1}
        max={25}
        value={value}
        onChange={(evt) => {
          setValue(Number(evt.target.value));
          if (onChange) onChange(evt);
        }}
      />
    </>
  );
}

function ExampleTable() {
  const [key, setKey] = useState(1);

  return (
    <>
      <KeySlider value={key} setValue={setKey} id="key1"/>
      <CipherTable
        plaintext={alphabets.latin}
        ciphertext={shiftText(alphabets.latin.join(''), key)}
      />
    </>
  );
}

function DecodingChallenge() {
  const [key, setKey] = useState(1);
  const [secretKey, setSecret] = useState(2);

  // Set secret key on page load
  useEffect(() => {
    setSecret(1 + Math.floor(Math.random() * 24));
  }, []);

  const plaintext = shiftText(secret, -secretOffset);
  const shiftedSecret = shiftText(plaintext, secretKey);

  return (
    <>
      <KeySlider value={key} setValue={setKey} id="key2"/>
      <CipherTable
        plaintext={shiftText(shiftedSecret, -key)}
        ciphertext={shiftedSecret}
        reverse={true}
        highlightFullCol={true}
      />
    </>
  );
}

function TryCaeserWithContext({value, setValue}: {value: number, setValue: ((arg0: number) => void)}) {
  const context = useContext(TryItOutContext);
  if(!context) {
    throw new Error("Missing TryItOut context");
  }

  useEffect(() => {context.handleUpdate({})}, [context, value]);

  return (
    <>
      <KeySlider
        value={value}
        setValue={setValue}
        id="key3"
        onChange={(evt) => setValue(Number(evt.target.value))}
      />
      <TryItOut/>
    </>
  )
}

function TryCaeser() {
  const [key, setKey] = useState(1);

  return (
    <TryItOutProvider encode={(text) => shiftText(text, key)} decode={(text) => shiftText(text, -key)}>
      <TryCaeserWithContext value={key} setValue={setKey}></TryCaeserWithContext>
    </TryItOutProvider>
  );
}

// Export

export default function Component() {
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
            See
            <Link
              className="text-primary-800 hover:text-primary-700 mx-1"
              href="https://www.britannica.com/topic/Caesar-cipher"
            >
              https://www.britannica.com/topic/Caesar-cipher
            </Link>
          </Footnote>
        </p>

        <Heading level={2} name="Encryption" />
        <p>
          Let&apos;s try an example. Pick a key by using the slider below, and watch the cipher table change.
        </p>
        <ExampleTable/>

        <Heading level={2} name="Security" />
        <p>
          Since there are only 25 possible keys, it is rather easy to try all combinations until the text is readable.
          Additionally, the ciphertext is very obviously encrypted, so there is little steganographic security.
          Try it below:
        </p>
        <DecodingChallenge />

        <Heading level={2} name="Try it out" />
        <TryCaeser />

        <FootnoteList></FootnoteList>
      </div>
    </FootnoteProvider>
  );
}
