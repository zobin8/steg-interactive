'use client';

import { Button, ButtonGroup, Drawer, DrawerHeader, DrawerItems } from 'flowbite-react';
import { useState } from 'react';
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { NavItem } from "@/app/lib/navutils";
import SideNav, { pages } from "@/app/ui/playgrounds/sidenav";


function getNextPage(pathName: string, reverse: boolean): NavItem|undefined
{
  const currentIndex = pages.findIndex((item) => item.href == pathName);
  if (currentIndex < 0) return;

  const nextIndex = reverse ? currentIndex - 1 : currentIndex + 1;
  if (nextIndex < 0 || nextIndex >= pages.length) return;

  return pages[nextIndex];
}


export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const pathName = usePathname();
  const nextPage = getNextPage(pathName, false);
  const prevPage = getNextPage(pathName, true);

  return (
    <div className="flex grow justify-center p-3 bg-slate-100 dark:bg-slate-700">
      <div className="block lg:hidden bg-white">
        <Drawer open={isOpen} onClose={handleClose}>
          <DrawerHeader title="Playgrounds" titleIcon={() => <></>} />
          <DrawerItems>
            <SideNav pad={false}/>
          </DrawerItems>
        </Drawer>
      </div>
      <div className="container flex-row flex gap-8">
        <div className="flex-none shadow-md hidden lg:block rounded-sm bg-white dark:bg-gray-900">
          <SideNav pad={true}/>
        </div>
        <div className="flex flex-col grow shadow-md p-3 rounded-sm bg-white dark:bg-gray-900 dark:text-white">
          <ButtonGroup className="mx-auto mb-3">
            <Button
              color="light"
              as={Link}
              disabled={prevPage === undefined}
              href={prevPage?.href || '#'}
              aria-label="Previous page"
            >
              <TbArrowBigLeft className='me-2'/>
              {prevPage?.name || 'Previous'}
            </Button>
            <Button
              className="block lg:hidden"
              color="light"
              onClick={() => setIsOpen(true)}
              aria-label="Show playground navigation"
            >
              Directory
            </Button>
            <Button
              color="light"
              as={Link}
              disabled={nextPage === undefined}
              href={nextPage?.href || '#'}
              aria-label="Next page"
            >
              {nextPage?.name || 'Next'}
              <TbArrowBigRight className='ms-2'/>
            </Button>
          </ButtonGroup>
          {children}
        </div>
      </div>
    </div>
  );
}