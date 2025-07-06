import { createContext, ReactNode, useContext, useState } from "react";
import Heading from "./heading";
import { Label, Select } from "flowbite-react";
import { alphabets } from "@/app/lib/substitution";

interface AlphabetContextType {
  alphabet: string[]
  setAlphabet: (arg0: string[]) => void,
}

export const AlphabetContext = createContext<AlphabetContextType | undefined>(undefined);

interface ProviderProps {
  defaultAlphabet: string[],
  children: ReactNode,
}
export function AlphabetProvider({defaultAlphabet, children}: ProviderProps) {
  const [alphabet, setAlphabet] = useState(defaultAlphabet);

  return (
    <AlphabetContext.Provider value={{alphabet: alphabet, setAlphabet: setAlphabet}}>
      {children}
    </AlphabetContext.Provider>
  )
}

interface ComponentProps {
  options: string[][],
  children: ReactNode,
}
export function AlphabetSelect({options, children}: ComponentProps) {
  const context = useContext(AlphabetContext);
  if(!context) {
    throw new Error("Missing Alphabet context");
  }

  const friendlyNames = new Map<string[], string>();
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
        value={options.indexOf(context.alphabet)}
        onChange={(evt) => context.setAlphabet(options[Number(evt.target.value)])}
      >
        {options.map((option, index) => (
          <option key={index} value={index}>
            {friendlyNames.get(option) || option}
          </option>
        ))}
      </Select>
    </>
  );
}
