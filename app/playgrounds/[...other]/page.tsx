import Heading from "@/app/ui/playgrounds/heading";

export default async function Page({
  params,
}: {
  params: Promise<{ other: string[] }>
}) {
  const { other } = await params;
  return (
    <div className="flex flex-col gap-3">
      <Heading level={1} name="Under Construction" />
      <p>The page "{other.join('/')}" is still under construction. Check back later!</p>
    </div>
  );
}
