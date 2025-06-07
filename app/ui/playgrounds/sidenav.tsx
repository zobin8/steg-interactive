"use client";

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';

export default function SideNav() {
  return (
    <Sidebar aria-label="Playground navigation sidebar">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href='/playgrounds'>Introduction</SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
