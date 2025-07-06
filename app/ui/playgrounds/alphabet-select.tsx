import { ReactNode } from "react";
import Heading from "./heading";
import { Label, Select } from "flowbite-react";
import { alphabets } from "@/app/lib/substitution";

interface ComponentProps {
  options: string[],
  children: ReactNode,
  alphabet: string,
  setAlphabet: (arg0: string) => void,
}
export default function AlphabetSelect({options, children, alphabet, setAlphabet}: ComponentProps) {

  var friendlyNames = new Map<string, string>();
  for (const [key, value] of Object.entries(alphabets)) {
    const stripped = key.replaceAll(/[^a-zA-Z]/g, '');
    const friendly = stripped[0].toUpperCase() + stripped.slice(1);
    friendlyNames.set(value, friendly);
  }

  return (
    <>
      <Heading level={2} name="Alphabet Selection" />
      <p>
        {children}
      </p>
      <Label htmlFor="select-alphabet">Select Alphabet:</Label>
      <Select
        id="select-alphabet"
        value={alphabet}
        onChange={(evt) => setAlphabet(evt.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {friendlyNames.get(option) || option}
          </option>
        ))}
      </Select>
    </>
  );
}