import SideNav from "@/app/ui/playgrounds/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex grow bg-slate-200 justify-center">
      <div className="container flex-row flex shadow-md gap-8">
        <div className="flex-none bg-white">
          <SideNav />
        </div>
        <div className="flex-grow bg-white">{children}</div>
      </div>
    </div>
  );
}