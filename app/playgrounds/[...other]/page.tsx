export default async function Page({
  params,
}: {
  params: Promise<{ other: string[] }>
}) {
  const { other } = await params;
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl">Under Construction</h1>
      <p>The page "{other.join('/')}" is still under construction. Check back later!</p>
    </div>
  );
}
