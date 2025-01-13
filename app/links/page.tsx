import Link from "next/link";
import { linkCollection } from "./link-collection";

export default async function Page() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">
        Collection of useful links
      </h1>
      <div className="mb-5" />
      <p>
        Here’s a collection of links that I absolutely like. I’ll keep updating
        this page from time to time.
      </p>
      <div className="mb-5" />
      {linkCollection.map((link) => (
        <div key={link.href} className="mb-5">
          <Link href={link.href} className="text-blue-500">
            {link.title}
          </Link>
          <div className="text-gray-500">{link.description}</div>
        </div>
      ))}
    </div>
  );
}
