import Link from "next/link";
import { linkCollection } from "./link-collection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links - I Putu Deta Utama Putra",
  description: "Other links that you might be interested in.",
};

export default async function Page() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Other links</h1>
      <div className="mb-5" />
      <p className="text-center md:text-left">
        Here are some other links that you might be interested in.
      </p>
      <div className="mb-5" />

      <div className="mb-5">
        <Link href={"/achievements"} className="text-blue-500">
          Achievements
        </Link>
        <div className="text-gray-500 dark:text-gray-300">
          {`List of my achievements that I've done in the past.`}
        </div>
      </div>

      <div className="mb-5">
        <Link href={"/workout-progress"} className="text-blue-500">
          Workout Progress
        </Link>
        <div className="text-gray-500 dark:text-gray-300">
          See the progress of my workout.
        </div>
      </div>

      {linkCollection.map((link) => (
        <div key={link.href} className="mb-5">
          <Link href={link.href} className="text-blue-500">
            {link.title}
          </Link>
          <div className="text-gray-500 dark:text-gray-300">
            {link.description}
          </div>
        </div>
      ))}
    </div>
  );
}
