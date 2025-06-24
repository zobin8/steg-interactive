import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default function CipherTable(
  {plaintext, ciphertext, reverse}: {plaintext: string[]|string, ciphertext: string[]|string, reverse?: boolean}
) {
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

  return (
    <div className="grid md:grid-cols-14 grid-cols-7">
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
              <TableHeadCell>{text}</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{contents[1][index]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  )
}