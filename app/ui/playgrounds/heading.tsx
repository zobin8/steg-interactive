import { stripLinkName } from "@/app/lib/navutils";

import Link from "next/link";
import { ReactElement } from "react";

const elements: ReactElement[] = [<span></span>, <h1></h1>, <h2></h2>, <h3></h3>];
const textSize: string[] = ['', 'text-2xl', 'text-xl', 'text-lg'];

export default function Heading({level, name}: {level: 1|2|3, name: string}) {
  const element: ReactElement = elements[level];
  const id: string = stripLinkName(name);

  return (
    <element.type id={id} className={`group ${textSize[level]}`}>
      {name}
        <Link
          href={`#${id}`}
          aria-label="Link to this section"
          className="ms-1 opacity-0 group-hover:opacity-100 text-primary-900 dark:text-primary-200"
        >#</Link>
    </element.type>
  );
}
