import { buildFaqPageJsonLd } from "./faq-data";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqJsonLd = buildFaqPageJsonLd();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      {children}
    </>
  );
}
