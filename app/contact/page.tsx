import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold">Contact</h1>
      <p className="mb-4 text-center md:text-left">
        I welcome feedback, suggestions, and constructive criticism. If you have
        ideas to share or resources you think might be helpful, I’d be happy to
        hear from you.
      </p>
      <Link
        href="mailto:detautama11@gmail.com"
        className="block text-center text-xl text-blue-500"
      >
        Email to: detautama11@gmail.com
      </Link>
    </div>
  );
}
