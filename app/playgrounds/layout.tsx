import SideNav from "@/app/ui/playgrounds/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-none">
        <SideNav />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}