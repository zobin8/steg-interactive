'use-client';

import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { makeNavText, NavItem } from '@/app/lib/navutils';

interface NavGroup {
  intro: NavItem
  steganography: NavItem[]
  cryptography: NavItem[]
}

const pageGroups: NavGroup[] = [
  {
    intro: {href: '/playgrounds', name: 'Introduction'},
    steganography: [],
    cryptography: [],
  }, {
    intro: {href: '/playgrounds/ancient', name: 'Ancient History'},
    steganography: [
      {href: '/playgrounds/ancient/herodotus', name: 'Herodotus'},
    ],
    cryptography: [
      {href: '/playgrounds/ancient/atbash', name: 'Atbash Cipher'},
      {href: '/playgrounds/ancient/caeser', name: 'Caeser Cipher'},
      {href: '/playgrounds/ancient/polybius', name: 'Polybius Square'},
      {href: '/playgrounds/ancient/pgm', name: 'PGM Cipher'},
      {href: '/playgrounds/ancient/scytale', name: 'Scytale Transposition'},
    ],
  }, {
    intro: {href: '/playgrounds/medieval', name: 'Medieval History'},
    steganography: [
      {href: '/playgrounds/medieval/ave-maria', name: 'Ave Maria Cipher'},
      {href: '/playgrounds/medieval/john-dee', name: 'John Dee'},
    ],
    cryptography: [
      {href: '/playgrounds/medieval/frequency-analysis', name: 'Frequency Analysis'},
      {href: '/playgrounds/medieval/homophonic', name: 'Homophonic Cipher'},
      {href: '/playgrounds/medieval/polyalphabetic', name: 'Polyalphabetic Ciphers'},
      {href: '/playgrounds/medieval/tabula-recta', name: 'The Tabula Recta'},
      {href: '/playgrounds/medieval/vigenere', name: 'Vigenère Cipher'},
    ],
  }, {
    intro: {href: '/playgrounds/modern', name: 'Modern History'},
    steganography: [
      {href: '/playgrounds/modern/bacons', name: 'Bacon\'s Cipher'},
      {href: '/playgrounds/modern/sudoku', name: 'Sudoku Steg'},
      {href: '/playgrounds/modern/least-bit', name: 'Least Bit Steg'},
      {href: '/playgrounds/modern/steghide', name: 'Steghide'},
    ],
    cryptography: [
      {href: '/playgrounds/modern/otp', name: 'One-Time Pads'},
      {href: '/playgrounds/modern/enigma', name: 'Enigma Machine'},
      {href: '/playgrounds/modern/des', name: 'DES'},
      {href: '/playgrounds/modern/aes', name: 'AES'},
    ]
  },
];

export const pages: NavItem[] = pageGroups.flatMap((group) => [group.intro].concat(group.steganography, group.cryptography))

export default function SideNav({pad}: {pad: boolean}) {
  const padClass = pad ? '' : '[&>div]:bg-transparent [&>div]:p-0';
  const pathName = usePathname();

  const navText = makeNavText(pathName);

  return (
    <Sidebar aria-label="Playground navigation sidebar" className={`${padClass}`}>
      <SidebarItems>
        {pageGroups.map((group) => (
          <SidebarItemGroup key={group.intro.href}>
            <SidebarItem key={group.intro.href} className={navText(group.intro)} href={group.intro.href}>{group.intro.name}</SidebarItem>
            <SidebarCollapse label='Steganography' className={clsx('', {'hidden': group.steganography.length == 0})}>
              {group.steganography.map((page) => (
                <SidebarItem key={page.href} className={navText(page)} href={page.href}>{page.name}</SidebarItem>
              ))}
            </SidebarCollapse>
            <SidebarCollapse label='Cryptography' className={clsx('', {'hidden': group.cryptography.length == 0})}>
              {group.cryptography.map((page) => (
                <SidebarItem key={page.href} className={navText(page)} href={page.href}>{page.name}</SidebarItem>
              ))}
            </SidebarCollapse>
          </SidebarItemGroup>
        ))}
      </SidebarItems>
    </Sidebar>
  );
}
