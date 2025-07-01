import { alphabets } from "@/app/lib/substitution";
import { Button, Kbd, Label, Textarea } from "flowbite-react";
import { createContext, MouseEvent, ReactNode, useContext, useState } from "react";

interface ChangedArguments {
  newPlaintext?: string
  newCiphertext?: string
}

interface TryItOutContextType {
  plaintext: string
  ciphertext: string
  handleUpdate: ({newPlaintext, newCiphertext}: ChangedArguments) => void
}

interface TryItOutProps {
  encode: ((text: string) => string)
  decode: ((text: string) => string)
  children: ReactNode
}

export const TryItOutContext = createContext<TryItOutContextType | undefined>(undefined);

export function TryItOutProvider({encode, decode, children}: TryItOutProps) {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [lastDirection, setLastDirection] = useState(1);

  function handleUpdate({newPlaintext, newCiphertext}: ChangedArguments) {
    let direction = 0;
    let text = '';
    if (newPlaintext !== undefined) {
      direction = 1;
      text = newPlaintext;
    } else if (newCiphertext !== undefined) {
      direction = -1;
      text = newCiphertext;
    } else {
      direction = lastDirection;
      text = direction > 0 ? plaintext : ciphertext;
    }

    setLastDirection(direction);

    if (direction > 0) {
      setPlaintext(text);
      setCiphertext(encode(text));
    } else {
      setCiphertext(text);
      setPlaintext(decode(text));
    }
  }

  return (
    <TryItOutContext.Provider value={{plaintext: plaintext, ciphertext: ciphertext, handleUpdate: handleUpdate}}>
      {children}
    </TryItOutContext.Provider>
  )
}

function Keyboard({onKey, alphabet}: {onKey: ((key: string) => void), alphabet: string}) {
  function onClick(evt: MouseEvent<HTMLElement>) {
    const target = evt.target as HTMLElement;
    onKey(target.innerText);
  }

  return (
    <div className="flex-col" aria-label="Custom keyboard">
      {alphabet.split('').map((ch) => 
        <Kbd
          key={ch}
          className="text-center cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-500 select-none"
          aria-label={`insert ${ch}`}
          onClick={onClick}
        >
          {ch}
        </Kbd>
      )}
    </div>
  )
}

export function TryItOut({alphabet = alphabets.latin}: {alphabet?: string}) {
  const context = useContext(TryItOutContext);
  if(!context) {
    throw new Error("Missing TryItOut context");
  }

  function updatePlaintext(plaintext: string) {
    context?.handleUpdate({newPlaintext: plaintext});
  }
  function updateCiphertext(ciphertext: string) {
    context?.handleUpdate({newCiphertext: ciphertext});
  }

  return (
    <>
      <Label htmlFor="plaintext">Plaintext:</Label>
      <Keyboard alphabet={alphabet} onKey={(key) => updatePlaintext(context.plaintext + key)} />
      <Textarea
        id="plaintext"
        placeholder="Type here..."
        rows={3}
        value={context.plaintext}
        onChange={(evt) => updatePlaintext(evt.target.value)}
      />
      <Label htmlFor="ciphertext">Ciphertext:</Label>
      <Keyboard alphabet={alphabet} onKey={(key) => updateCiphertext(context.ciphertext + key)} />
      <Textarea
        id="ciphertext"
        placeholder="Type here..."
        rows={3}
        value={context.ciphertext}
        onChange={(evt) => updateCiphertext(evt.target.value)}
      />
    </>
  );
}