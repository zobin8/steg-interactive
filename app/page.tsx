import { Button } from "flowbite-react";

export default function Home() {
  return (
      <div className="flex grow justify-center">
        <main className="flex shadow-md flex-col container text-center">
          <h1 className="text-7xl font-extrabold p-7">Steg Interactive</h1>
          <h2 className="text-md">
            A collection of interactive playgrounds to learn about steganography and cryptography techniques throughout history.
          </h2>
          <div className="p-4 flex shrink justify-center">
            <Button
              href="/playgrounds"
              className="p-3 font-bold text-md"
            >
              Get Started
            </Button>
          </div>
        </main>
      </div>
  );
}
