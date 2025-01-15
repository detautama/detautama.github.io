import WeddingInvitationImage from "./images/wedding-invitation.jpg";
import rkb from "./images/rkb.jpg";
import wmc from "./images/wmc.jpg";
import tanam from "./images/tanam.jpg";
import pnpm from "./images/pnpm.jpg";
import cg from "./images/CG.jpg";
import xvd from "./images/xvd.jpg";
import zustand from "./images/zustand.jpg";
import prapen from "./images/prapen.jpg";
import bamboo from "./images/bamboo.jpg";
import { StaticImageData } from "next/image";

export interface Project {
  title: string;
  description: string;
  link?: string;
  image: StaticImageData;
}

export const projects: Project[] = [
  {
    title: "Custom Wedding Invitation",
    description:
      "My bespoke digital invitation service creates unique and memorable designs for your special day. I offer elegant e-invites, traditional Balinese-inspired designs, and modern templates with customized graphics, calligraphy, and interactive RSVP features.",
    link: undefined,
    image: WeddingInvitationImage,
  },
  {
    title: "Ralline Konveksi Bali",
    description:
      "The Ralline Konveksi Bali website offers made-to-order clothing services in Bali, specializing in custom apparel for both individual and corporate clients. Their offerings include uniforms, t-shirts, traditional Balinese wear, and more, with options for embroidery, screen printing, and custom tailoring. For this project, I collaborated with the client to gather requirements for designing a website that highlights their services and craftsmanship, providing an easy experience for customers to explore and order custom apparel.",
    link: "https://rallinekonveksibali.com/",
    image: rkb,
  },
  {
    title: "Wellnesse Massage on Call",
    description:
      "The Wellness Massage On Call website offers on-demand mobile massage services in Bali. Their services are available 24/7 and include options like Balinese, deep tissue, aromatherapy, pregnancy, and hot stone massages. In this project, I met with the client to gather requirements for building a website that effectively showcases their services.",
    link: "https://wellnessmassageoncall.com/",
    image: wmc,
  },
  {
    title: "Tanam",
    description:
      "Tanam is plugin CMS for Firebase. I contributed to this project by developing a Shimmer Table Component to enhance loading performance, optimizing NPM cache configuration for faster build times, and integrating Firebase UI for secure and efficient authentication workflows.",
    link: "https://github.com/oddbit/tanam",
    image: tanam,
  },
  {
    title: "pnpm",
    description:
      "Fast, disk space efficient package manager. For this project, I contributed by creating detailed documentation for setting up Azure Pipelines. This addition simplifies the continuous integration process for developers using pnpm, providing clear guidance and practical examples for seamless integration.",
    link: "https://pnpm.io/",
    image: pnpm,
  },
  {
    title: "Cantik Grosir",
    description:
      "Wholesale Store Management System. In this project, I managed the overall development, including task management and client meetings to gather requirements. My main focus was building the user interface for stock management, transaction handling, and reporting. These features helped streamline the store's operations by improving the efficiency of inventory control and transaction tracking while ensuring accurate and comprehensive reporting.",
    link: undefined,
    image: cg,
  },
  {
    title: "XOVID20",
    description:
      "For the XOVID20 project, an online jewelry store built on Shopify, I managed the project from start to finish. I handled task management and met with clients to gather their requirements. My main focus was on setting up Shopify, designing the user interface, and training employees. This ensured that the store was user-friendly for both operators and customers, while also streamlining inventory and sales processes.",
    link: "https://xovid20.com/",
    image: xvd,
  },
  {
    title: "Zustand",
    description:
      " state-management solution. In this project, I contributed by adding a comprehensive example of the Slice Pattern to the documentation, demonstrating its integration with middlewares. This enhancement improves clarity for developers, particularly those using TypeScript, and aids in the adoption of advanced patterns within Zustand.",
    link: "https://zustand-demo.pmnd.rs/",
    image: zustand,
  },
  {
    title: "Prapen",
    description:
      "For the prapen project, an online jewelry store built on Shopify, I led the project from start to finish. I was responsible for managing tasks and collaborating with clients to understand their specific needs. My key focus areas included setting up Shopify, designing the user interface, and training the team. These efforts made the store more user-friendly for both operators and customers, while enhancing the overall efficiency of the inventory and sales systems.",
    link: "https://prapen.com/",
    image: prapen,
  },
  {
    title: "Panda Bamboo Wood",
    description:
      "The Panda Bamboo Wood website functions as a business profile or company profile. It showcases the company's sustainable bamboo products and services, providing information about its offerings, mission, and eco-friendly approach for potential clients interested in bamboo flooring, decking, and cladding solutions. In this project, I met with the client to gather requirements for building a website that effectively showcases their products.",
    link: "https://panda-bamboowood.com/",
    image: bamboo,
  },
];
