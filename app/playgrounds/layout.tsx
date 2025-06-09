'use client';

import { Button, Drawer, DrawerHeader, DrawerItems } from 'flowbite-react';
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
    <div className="flex grow bg-slate-200 justify-center">
      <div className="container flex-row flex gap-8">
        <div className="flex-none bg-white shadow-md hidden md:block">
          <SideNav pad={true}/>
        </div>
        <div className="flex flex-col grow bg-white shadow-md">
          <div className="grid grid-flow-col p-3 justify-between">
            <Button
              color="dark"
              outline
              as={Link}
              disabled={prevPage === undefined}
              href={prevPage?.href || '#'}
              aria-label="Previous page"
            >
              <TbArrowBigLeft className='me-2'/>
              {prevPage?.name || 'Previous'}
            </Button>
            <div className="block md:hidden justify-center">
              <Button
                color="dark" outline
                onClick={() => setIsOpen(true)}
                aria-label="Show playground navigation"
              >
                Page directory
              </Button>
              <Drawer open={isOpen} onClose={handleClose}>
                <DrawerHeader title="Playgrounds" titleIcon={() => <></>} />
                <DrawerItems>
                  <SideNav pad={false}/>
                </DrawerItems>
              </Drawer>
            </div>
            <Button
              color="dark"
              outline
              as={Link}
              disabled={nextPage === undefined}
              href={nextPage?.href || '#'}
              aria-label="Next page"
            >
              {nextPage?.name || 'Next'}
              <TbArrowBigRight className='ms-2'/>
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}