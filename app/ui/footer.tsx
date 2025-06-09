import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

export default function Component() {
  return (
    <Footer container className="dark rounded-none dark:bg-gray-900">
      <FooterCopyright href="https://github.com/zobin8" by="Zoe Krueger" year={2025} />
      <FooterLinkGroup>
        <FooterLink href="https://github.com/zobin8/steg-interactive">Source Code</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
