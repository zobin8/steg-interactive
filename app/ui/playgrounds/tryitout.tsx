import { Label, Textarea } from "flowbite-react";
import { createContext, ReactNode, useContext, useState } from "react";

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
    var direction = 0;
    var text = '';
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

export function TryItOut() {
  const context = useContext(TryItOutContext);
  if(!context) {
    throw new Error("Missing TryItOut context");
  }

  return (
    <>
      <Label htmlFor="plaintext">Plaintext:</Label>
      <Textarea
        id="plaintext"
        placeholder="Type here..."
        rows={3}
        value={context.plaintext}
        onChange={(evt) => context.handleUpdate({newPlaintext: evt.target.value})}
      />
      <Label htmlFor="ciphertext">Ciphertext:</Label>
      <Textarea
        id="ciphertext"
        placeholder="Type here..."
        rows={3}
        value={context.ciphertext}
        onChange={(evt) => context.handleUpdate({newCiphertext: evt.target.value})}
      />
    </>
  );
}