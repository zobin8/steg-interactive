'use-client';

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { usePathname } from 'next/navigation';

import { makeNavText, NavItem } from '@/app/lib/navutils';

export const pages: NavItem[] = [
  {href: '/playgrounds', name: 'Introduction'},
  {href: '/playgrounds/simple-substitution', name: 'Simple Substitution'},
];

export default function SideNav({pad}: {pad: boolean}) {
  const padClass = pad ? '' : '[&>div]:bg-transparent [&>div]:p-0';
  const pathName = usePathname();

  const navText = makeNavText(pathName);

  return (
    <Sidebar aria-label="Playground navigation sidebar" className={`dark:bg-gray-800 ${padClass}`}>
      <SidebarItems className="rounded-none">
        <SidebarItemGroup>
          {pages.map((page) => (
            <SidebarItem key={page.href} className={navText(page)} href={page.href}>{page.name}</SidebarItem>
          ))}
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
