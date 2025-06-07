import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';

export default function SideNav({pad}: {pad: boolean}) {
  const padClass = pad ? '' : '[&>div]:bg-transparent [&>div]:p-0';

  return (
    <Sidebar aria-label="Playground navigation sidebar" className={padClass}>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href='/playgrounds'>Introduction</SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
