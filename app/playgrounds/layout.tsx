'use client';

import SideNav from "@/app/ui/playgrounds/sidenav";
import { Button, Drawer, DrawerHeader, DrawerItems } from 'flowbite-react';
import { useState } from 'react';
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";


export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex grow bg-slate-200 justify-center">
      <div className="container flex-row flex gap-8">
        <div className="flex-none bg-white shadow-md hidden md:block">
          <SideNav pad={true}/>
        </div>
        <div className="flex flex-col grow bg-white shadow-md">
          <div className="grid grid-flow-col p-3 justify-between">
            <Button color="dark" outline aria-label="Previous page">
              <TbArrowBigLeft />
              Previous
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
            <Button color="dark" outline aria-label="Next page">
              Next
              <TbArrowBigRight />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}