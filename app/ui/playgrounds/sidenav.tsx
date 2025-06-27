'use-client';

import { makeNavText, NavItem } from '@/app/lib/navutils';

import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface NavGroup {
  name: string
  intro?: NavItem
  items: Record<string, NavItem[]>
}

const pageGroups: NavGroup[] = [
  {
    name: 'Introduction',
    intro: {href: '/playgrounds', name: 'Introduction'},
    items: {},
  }, {
    name: 'Ancient',
    items: {
      'Ancient History': [
        {href: '/playgrounds/ancient/atbash', name: 'Atbash Cipher'},
        {href: '/playgrounds/ancient/caeser', name: 'Caeser Cipher'},
        {href: '/playgrounds/ancient/polybius', name: 'Polybius Square'},
        {href: '/playgrounds/ancient/pgm', name: 'PGM Cipher'},
        {href: '/playgrounds/ancient/scytale', name: 'Scytale Transposition'},
      ]
    },
  }, {
    name: 'Post-Classical',
    items: {
      'Post-Classical History': [
        {href: '/playgrounds/postclassical/ave-maria', name: 'Ave Maria Cipher'},
        {href: '/playgrounds/postclassical/john-dee', name: 'John Dee'},
        {href: '/playgrounds/postclassical/frequency-analysis', name: 'Frequency Analysis'},
        {href: '/playgrounds/postclassical/homophonic', name: 'Homophonic Cipher'},
        {href: '/playgrounds/postclassical/polyalphabetic', name: 'Polyalphabetic Ciphers'},
        {href: '/playgrounds/postclassical/tabula-recta', name: 'The Tabula Recta'},
        {href: '/playgrounds/postclassical/vigenere', name: 'Vigenère Cipher'},
      ],
    }
  }, {
    name: 'Modern',
    items: {
      'Modern History': [
        {href: '/playgrounds/modern/bacons', name: 'Bacon\'s Cipher'},
        {href: '/playgrounds/modern/sudoku', name: 'Sudoku Steg'},
        {href: '/playgrounds/modern/least-bit', name: 'Least Bit Steg'},
        {href: '/playgrounds/modern/steghide', name: 'Steghide'},
        {href: '/playgrounds/modern/otp', name: 'One-Time Pads'},
        {href: '/playgrounds/modern/enigma', name: 'Enigma Machine'},
        {href: '/playgrounds/modern/des', name: 'DES'},
        {href: '/playgrounds/modern/aes', name: 'AES'},
      ],
    }
  },
];

function getNavItems(group: NavGroup): NavItem[] {
  const items = [];

  if (group.intro) {
    items.push(group.intro);
  }

  for (const key in group.items) {
    items.push(...group.items[key]);
  }

  return items;
}

export const pages: NavItem[] = pageGroups.flatMap(getNavItems);

export default function SideNav({pad}: {pad: boolean}) {
  const padClass = pad ? '' : '[&>div]:bg-transparent [&>div]:p-0';
  const pathName = usePathname();

  const navText = makeNavText(pathName);

  return (
    <Sidebar aria-label="Playground navigation sidebar" className={`${padClass}`}>
      <SidebarItems>
        {pageGroups.map((group) => (
          <SidebarItemGroup key={group.name}>
            {
              group.intro
               ? <SidebarItem key={group.name} className={navText(group.intro)} href={group.intro.href}>{group.intro.name}</SidebarItem>
               : <></>
            }
            {
              Object.entries(group.items).map(([key, items]) => (
                <SidebarCollapse label={key} key={key} className={clsx('', {'hidden': items.length == 0})}>
                  {items.map((page) => (
                    <SidebarItem key={page.href} className={navText(page)} href={page.href}>{page.name}</SidebarItem>
                  ))}
                </SidebarCollapse>
              ))
            }
          </SidebarItemGroup>
        ))}
      </SidebarItems>
    </Sidebar>
  );
}
