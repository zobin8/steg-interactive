import { stripLinkName } from "@/app/lib/navutils";

import Link from "next/link";
import { ReactElement } from "react";

const elements = {
  1: <h1 />,
  2: <h2 />,
  3: <h3 />
};
const textSize: string[] = ['', 'text-2xl', 'text-xl', 'text-lg'];

export default function Heading({level, name, className}: {
  level: 1|2|3,
  name: string,
  className?: string
}) {
  const element: ReactElement = elements[level];
  const id: string = stripLinkName(name);

  return (
    <element.type id={id} className={`group ${textSize[level]} ${className || ''}`}>
      {name}
        <Link
          href={`#${id}`}
          aria-label="Link to this section"
          className="ms-1 opacity-0 group-hover:opacity-100 text-primary-900 dark:text-primary-200"
        >#</Link>
    </element.type>
  );
}
