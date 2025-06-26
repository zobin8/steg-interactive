'use-client'

import clsx from "clsx";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { MouseEvent, useState } from "react";

export default function CipherTable(
  {plaintext, ciphertext, reverse}: {plaintext: string[]|string, ciphertext: string[]|string, reverse?: boolean}
) {
  // State

  var [selected, setSelected] = useState('');

  function handleMouseEnter(event: MouseEvent<HTMLTableCellElement>) {
    if (!event) return;
  
    setSelected(event.target.innerText);
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

  var labels = ['Plaintext', 'Ciphertext'];
  var contents = [plaintext, ciphertext];

  if (plaintext.length != ciphertext.length) {
    throw new Error('CipherTable length mismatch');
  }

  if (reverse) {
    labels.reverse();
    contents.reverse();
  }

  // Style

  function hoverStyle(text: string) {
    return clsx('', {
    'bg-primary-400 dark:bg-primary-800 text-black dark:text-white': text == selected,
  });
  }

  return (
    <div className="grid md:grid-cols-14 grid-cols-7 xl:grid-cols-20" onMouseLeave={handleMouseLeave}>
      <div className="col-span-2">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>
                {labels[0]}
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {labels[1]}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {contents[0].map((text, index) => (
        <Table key={index}>
          <TableHead>
            <TableRow>
              <TableHeadCell onMouseEnter={handleMouseEnter} className={hoverStyle(text)}>{text}</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell onMouseEnter={handleMouseEnter} className={hoverStyle(contents[1][index])}>{contents[1][index]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  )
}