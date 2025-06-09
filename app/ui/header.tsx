'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

import { makeNavText, NavItem } from "@/app/lib/navutils";

const links: NavItem[] = [
  {href: '/', name: 'Home'},
  {href: '/playgrounds', name: 'Playgrounds'},
]

export default function Header() {
  const navText = makeNavText(usePathname());

  return (
    <header className="dark shadow-md">
      <Navbar className="">
        <NavbarBrand as={Link} href="/">
          <Image
            src="/icon.png"
            width={256}
            height={256}
            className="flex max-h-10 max-w-10 mr-3"
            alt="Icon of steg-interactive, resembling a cipher wheel"
          ></Image>
          <span className="dark:text-white text-xl font-bold self-center">
            Steg Interactive
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          {links.map((link) => (
            <NavbarLink key={link.href} as={Link} className={navText(link)} href={link.href}>{link.name}</NavbarLink>
          ))}
        </NavbarCollapse>
      </Navbar>
    </header>
  );
}
