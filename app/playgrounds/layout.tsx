'use client';

import SideNav from "@/app/ui/playgrounds/sidenav";
import { Button, Drawer, DrawerHeader, DrawerItems } from 'flowbite-react';
import { GoSidebarExpand } from "react-icons/go";
import { useState } from 'react';


export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex grow bg-slate-200 justify-center">
      <div className="container flex-row flex gap-8">
        <div className="flex-none bg-white shadow-md hidden md:block">
          <SideNav pad={true}/>
        </div>
        <div className="flex grow bg-white shadow-md">
            <div className="block md:hidden justify-center p-2">
              <Button
                className="fixed"
                onClick={() => setIsOpen(true)}
                aria-label="Show playground navigation"
              >
                <GoSidebarExpand />
              </Button>
              <Drawer open={isOpen} onClose={handleClose}>
                <DrawerHeader title="Playgrounds" titleIcon={() => <></>} />
                <DrawerItems>
                  <SideNav pad={false}/>
                </DrawerItems>
              </Drawer>
            </div>
            {children}
        </div>
      </div>
    </div>
  );
}