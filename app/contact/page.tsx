import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Contact</h1>
      <p className="mb-4 text-center md:text-left">
        I always appreciate honest feedback, constructive criticism and useful
        link suggestions. Additionally, If you want to discuss regarding
        advertisement opportunity or sponsored posts on this website then this
        is a good place to start with. We value our time, so keep the message
        succinct and to the point.
        <br />
        <Link href="mailto:detautama11@gmail.com" className="text-blue-500">
          Email to: detautama11@gmail.com
        </Link>
      </p>
    </div>
  );
}
