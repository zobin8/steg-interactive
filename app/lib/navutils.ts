import clsx from "clsx";

export interface NavItem {
  href: string,
  name: string,
};

export function makeNavText(pathName: string): (item: NavItem)=>string {
  function navText(item: NavItem): string {
    return clsx(
      '',
      {
        'underline': pathName == item.href,
      },
    );
  };

  return navText;
}

export function stripLinkName(name: string): string {
  return name.replace(/\W/g, '-').toLowerCase();
}