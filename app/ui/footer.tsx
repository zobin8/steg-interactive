import Link from "next/link";

export default function Footer() {
  return (
    <footer className="grid grid-flow-col justify-items-center bg-primary-950 text-white py-3 px-8 justify-between">
      <span>Created by Zoe Krueger</span>
      <Link className="underline" href="https://github.com/zobin8/steg-interactive">Source Code</Link>
    </footer>
  );
}
