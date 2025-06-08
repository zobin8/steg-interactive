'use-client';

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { usePathname } from 'next/navigation';

import { makeNavText } from '@/app/lib/navutils';

const pages = [
  {href: '', name: 'Introduction'},
];

export default function SideNav({pad}: {pad: boolean}) {
  const padClass = pad ? '' : '[&>div]:bg-transparent [&>div]:p-0';
  const pathName = usePathname();

  const navText = makeNavText(pathName);

  return (
    <Sidebar aria-label="Playground navigation sidebar bg-white" className={padClass}>
      <SidebarItems>
        <SidebarItemGroup>
          {pages.map((page) => (
            <SidebarItem key={page.href} className={navText(page.href)} href={`/playgrounds/${page.href}`}>{page.name}</SidebarItem>
          ))}
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
