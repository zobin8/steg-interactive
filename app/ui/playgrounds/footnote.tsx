'use client';

import { HR } from "flowbite-react";
import Link from "next/link";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

interface FootnoteContextType {
  notes: ReactNode[]
  addNote: ((children: ReactNode) => number)
}

export const FootnoteContext = createContext<FootnoteContextType | undefined>(undefined);

export function FootnoteProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<ReactNode[]>([]);

  function addNote(child: ReactNode) {
    const size = notes.length + 1;
    setNotes([...notes, child]);
    return size;
  }

  return (
    <FootnoteContext.Provider value={{ notes, addNote }}>
      {children}
    </FootnoteContext.Provider>
  )
}

export function Footnote({ children }: { children: ReactNode }) {
  const context = useContext(FootnoteContext);
  const [index, setIndex] = useState<number | undefined>(undefined);
  if(!context) {
    throw new Error("Missing footnote context");
  }

  const alreadyAdded = useRef(false);
  useEffect(() => {
    if(!alreadyAdded.current) {
      alreadyAdded.current = true;
      setIndex(context.addNote(children));
    };
  }, [children, context]);

  return (
    <sup id={`citation-${index}-ref`}>
      <Link className="text-primary-800 me-1" href={`#citation-${index}-note`}>
        {`[${index}]`}
      </Link>
    </sup>
  );
}

export function FootnoteList() {
  const context = useContext(FootnoteContext);
  if(!context) {
    throw new Error("Missing footnote context");
  }

  return (
    <>
      <HR className="my-0"/>
      <ol className="list-decimal list-inside">
        {context.notes.map((note, index) => (
          <li key={index}>
            <sup id={`citation-${index + 1}-note`}>
              <Link className="text-primary-800 me-1" href={`#citation-${index + 1}-ref`}>
                ^
              </Link>
            </sup>
            {note}
          </li>
        ))}
      </ol>
    </>
  );
}