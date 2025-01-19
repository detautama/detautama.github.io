import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - I Putu Deta Utama Putra",
  description: "About I Putu Deta Utama Putra",
};

export default async function Page() {
  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold">About</h1>
      <Image
        className="mb-4 rounded"
        src="/about.jpg"
        alt="About"
        width={800}
        height={400}
      />
      <p className="mb-4 text-2xl font-bold">
        {
          "Hi! Thank you for visiting my blog. I'm Deta - a web developer and a blogger - from Bali, Indonesia."
        }
      </p>
      <p className="mb-4">
        {`I obtained my undergraduate degree as the top graduate from STIKI Indonesia, majoring in Information Technology - Informatics Engineering Management, in 2019 with a GPA of 3.94.`}
      </p>
      <p className="mb-4">
        {
          "My first introduction to programming was in high school, during the third grade, when I created a Pac-Man game using Game Maker Studio."
        }
      </p>
      <p className="mb-4">
        {`During university, I developed a strong interest in web programming. I began my professional career in web development in my 7th semester while still studying.`}
      </p>
      <p className="mb-4">
        {`In my spare time, I try to contribute to the community by creating this blog. I am deeply interested in topics related to productivity and health at work. I also enjoy photography.
				`}
      </p>
      <p className="mb-4">
        {`I’m a food enthusiast! I enjoy trying traditional dishes, and my favorite is `}
        <Link
          href="https://id.wikipedia.org/wiki/Lawar"
          className="text-blue-500"
        >
          lawar
        </Link>
        {`, a Balinese delicacy made from a mixture of vegetables, grated coconut, and minced meat. I especially love red pork *lawar*, which is uniquely flavored with fresh blood for an authentic taste.
				`}
      </p>
      <p className="mb-4">
        {`This blog serves as a place to brain-dump everything I learn daily. It’s built using Next.js with static export and hosted on GitHub Pages. The theme is heavily inspired by
				`}
        <Link
          className="text-blue-500"
          href="https://www.amitmerchant.com/"
        >{`Amit Merchant's blog`}</Link>
      </p>
      <p>
        {`You can shoot me an email at detautama11@gmail.com if you’d like to discuss something or just want to say “Hi!”. For business inquiries or collaboration opportunities, feel free to check out the `}
        <Link className="text-blue-500" href="/contact">
          /contact
        </Link>
        {` page for more details.`}
      </p>
    </div>
  );
}
