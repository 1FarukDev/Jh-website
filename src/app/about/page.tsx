import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About JH Textiles – Our Story & Creative Journey",
  description:
    "Learn about JH Textiles, our creative journey, inspiration, and the story behind our premium textile prints and surface patterns.",
  alternates: {
    canonical: "https://jh-website-lime.vercel.app/about",
  },
  openGraph: {
    title: "About JH Textiles",
    description:
      "Discover the story, inspiration, and creative vision behind JH Textiles.",
    url: "https://jh-website-lime.vercel.app/about",
    type: "article",
  },
};

export default function Page() {
  return <AboutPage />;
}
