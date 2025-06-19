import Heading from "@/app/ui/playgrounds/heading";
import { Alert } from "flowbite-react";

export default async function Page({
  params,
}: {
  params: Promise<{ other: string[] }>
}) {
  const { other } = await params;
  const page = other.join('/');

  return (
    <div className="flex flex-col gap-3">
      <Alert color="warning">
        <span className="font-medium me-1">Under Construction!</span>
        Parts of this page are unfinished. Sections may be missing or incomplete.
      </Alert>
      <Heading level={1} name={page} />
      <p>The page "{page}" is not yet implemented. Check back later!</p>
    </div>
  );
}
