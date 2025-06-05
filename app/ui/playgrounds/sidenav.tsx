import Link from 'next/link';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col p-3">
      <Link className="flex" href="/playgrounds">
        Playgrounds
      </Link>
    </div>
  );
}
