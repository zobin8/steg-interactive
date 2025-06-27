'use client';

import { makeNavText, NavItem } from "@/app/lib/navutils";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Dropdown, DropdownHeader, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, ToggleSwitch, useThemeMode } from "flowbite-react";
import { MdSettings } from "react-icons/md";

const links: NavItem[] = [
  {href: '/', name: 'Home'},
  {href: '/playgrounds', name: 'Playgrounds'},
]

export default function Header() {
  const navText = makeNavText(usePathname());

  const themeHook = useThemeMode();

  return (
    <header className="dark shadow-md">
      <Navbar fluid>
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
        <div className="flex md:order-2">
          <NavbarToggle />
          <Dropdown
            inline
            arrowIcon={false}
            label={<MdSettings className="dark:text-gray-400 dark:hover:text-white text-2xl" />}
            dismissOnClick={false}
          >
            <DropdownHeader>Settings</DropdownHeader>
            <DropdownItem as="div">
              <ToggleSwitch
                checked={themeHook.computedMode == 'dark'}
                label="Dark Mode"
                onChange={themeHook.toggleMode}
              />
            </DropdownItem>
          </Dropdown>
        </div>
        <NavbarCollapse>
          {links.map((link) => (
            <NavbarLink key={link.href} as={Link} className={navText(link)} href={link.href}>{link.name}</NavbarLink>
          ))}
        </NavbarCollapse>
      </Navbar>
    </header>
  );
}
