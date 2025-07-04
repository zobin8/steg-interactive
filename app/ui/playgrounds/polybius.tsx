import clsx from "clsx";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { MouseEvent, useState } from "react";

interface PolybiusProps {
  headerRow: string[],
  headerCol: string[],
  contents: string[],
}
export default function PolybiusTable({headerRow, headerCol, contents}: PolybiusProps) {
  if (contents.length > headerCol.length * headerRow.length) {
    throw new Error(`Contents of length ${contents.length} are not ${headerCol.length} x ${headerRow.length}`);
  }

  // State
  
  const [selectedRow, setSelectedRow] = useState(-1);
  const [selectedCol, setSelectedCol] = useState(-1);

  function handleMouseEnter(event: MouseEvent<HTMLElement>) {
    if (!event) return;
  
    const target = event.target as HTMLElement;
    const index = contents.indexOf(target.innerText);
    setSelectedRow(Math.floor(index / headerRow.length));
    setSelectedCol(index % headerRow.length);
  }

  function handleMouseLeave() {
    setSelectedRow(-1);
    setSelectedCol(-1);
  }

  function hoverStyle({row, col, extra}: {row?: number, col?: number, extra?: string}) {
    const matchRow = (row === undefined || row == selectedRow);
    const matchCol = (col === undefined || col == selectedCol);
    return clsx(`px-2 py-2 min-w-8 text-center ${extra || ''}`, {
      'bg-primary-400 dark:bg-primary-800 text-black dark:text-white': (matchRow && matchCol),
    });
  }

  return (
    <Table className="w-fit" onMouseLeave={handleMouseLeave}>
      <TableHead>
        <TableRow>
          <TableHeadCell className={hoverStyle({row: -2})}></TableHeadCell>
          {headerRow.map((item, col) => (
            <TableHeadCell key={item} className={hoverStyle({col: col})}>
              {item}
            </TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {headerCol.map((head, row) => (
          <TableRow key={row}>
            <TableCell className={hoverStyle({
                row: row,
                extra: 'text-gray-700 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 uppercase font-bold'
              })}
            >
              {head}
            </TableCell>
            {headerRow.map((_, col) => (
              <TableCell
                key={col}
                className={hoverStyle({row: row, col: col})}
                onMouseEnter={handleMouseEnter}
              >
                {contents[row * headerRow.length + col]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}