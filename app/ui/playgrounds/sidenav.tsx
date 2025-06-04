import Link from 'next/link';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col">
      <Link className="flex h-20" href="/">
        Home
      </Link>
    </div>
  );
}
