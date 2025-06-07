'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Header() {
  const pathname = usePathname();

  function navText(href: string): string {
    return clsx(
      'my-auto p-1 text-xl font-bold',
      {
        'underline': pathname == href,
      },
    );
  };

  function NavLink({href, name}: {href: string, name: string}) {
    return (
      <Link href={href} className={navText(href)}>{name}</Link>
    );
  }

  return (
    <header className="bg-primary-950 text-white py-3 px-8">
      <nav className="flex flex-row gap-8">
        <Link href="/" className="flex flex-row">
          <Image
            src="/icon.png"
            width={256}
            height={256}
            className="flex max-h-10 max-w-10"
            alt="Icon of steg-interactive, resembling a cipher wheel"
          ></Image>
          <span className={navText('/')}>
            Home
          </span>
        </Link>
        <NavLink href="/playgrounds" name="Playgrounds">
        </NavLink>
      </nav>
    </header>
  );
}
