'use-client'

import clsx from "clsx";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { MouseEvent, useState } from "react";

export default function CipherTable(
  {plaintext, ciphertext, reverse}: {plaintext: string[]|string, ciphertext: string[]|string, reverse?: boolean}
) {
  // State

  const [selected, setSelected] = useState('');

  function handleMouseEnter(event: MouseEvent<HTMLElement>) {
    if (!event) return;
  
    const target = event.target as HTMLElement;
    setSelected(target.innerText);
  }

  function handleMouseLeave() {
    setSelected('');
  }

  // Process Arguments

  if (typeof plaintext == 'string') {
    plaintext = plaintext.split('');
  }
  if (typeof ciphertext == 'string') {
    ciphertext = ciphertext.split('');
  }

  let [label1, label2] = ['Plaintext', 'Ciphertext'];
  let [contents1, contents2] = [plaintext, ciphertext];

  if (plaintext.length != ciphertext.length) {
    throw new Error('CipherTable length mismatch');
  }

  if (reverse) {
    [label1, label2] = [label2, label1];
    [contents1, contents2] = [contents2, contents1];
  }

  // Style

  function hoverStyle(text: string) {
    return clsx('px-2 py-2 min-w-8 text-center', {
    'bg-primary-400 dark:bg-primary-800 text-black dark:text-white': text == selected,
  });
  }

  return (
    <div className="flex flex-wrap" onMouseLeave={handleMouseLeave}>
      <div className="col-span-3">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell className="px-2 py-2 min-w-24 text-center">
                {label1}
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="px-2 py-2 min-w-24 text-center">
                {label2}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {contents1.map((text, index) => (
        <Table key={index}>
          <TableHead>
            <TableRow>
              <TableHeadCell onMouseEnter={handleMouseEnter} className={hoverStyle(text)}>{text}</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell onMouseEnter={handleMouseEnter} className={hoverStyle(contents2[index])}>{contents2[index]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  )
}