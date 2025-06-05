import SideNav from "@/app/ui/playgrounds/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row grow gap-8 bg-slate-200 pr-8">
      <div className="flex-none bg-white shadow-md">
        <SideNav />
      </div>
      <div className="flex-grow bg-white shadow-md">{children}</div>
    </div>
  );
}