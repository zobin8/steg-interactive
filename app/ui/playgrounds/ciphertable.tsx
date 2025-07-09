import clsx from "clsx";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { MouseEvent, useState } from "react";


interface CipherProps {
  plaintext: string[]|string,
  ciphertext: string[]|string,
  reverse?: boolean,
  highlightFullCol?: boolean
}
export default function CipherTable({plaintext, ciphertext, reverse, highlightFullCol}: CipherProps) {
  // State

  const [selected, setSelected] = useState('');

  function makeHandleMouseEnter(text: string) {
    function handleMouseEnter(event: MouseEvent<HTMLElement>) {
      if (!event) return;

      setSelected(text);
    }

    return handleMouseEnter;
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

  while (plaintext.length < ciphertext.length) {
    plaintext.push(' ');
  }
  while (ciphertext.length < plaintext.length) {
    ciphertext.push(' ');
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

  function getSelectedText(index: number) {
    if (highlightFullCol) {
      return contents1[index];
    }
    return contents2[index];
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
              <TableHeadCell onMouseEnter={makeHandleMouseEnter(text)} className={hoverStyle(text)}>{text}</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell onMouseEnter={makeHandleMouseEnter(getSelectedText(index))} className={hoverStyle(getSelectedText(index))}>{contents2[index]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  )
}