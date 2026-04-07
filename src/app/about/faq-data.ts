export type FaqItem = {
  question: string;
  header?: string;
  answer?: string[];
};

export const faqData: FaqItem[] = [
  {
    question: "What is surface pattern design / print design?",
    header:
      "Surface pattern design is the creation of artworks that can be printed or applied onto the surface of objects such as clothes, wallpapers, packaging, and home goods. These designs are often created in repeating formats so they can seamlessly cover any size area. Designers use colors, motifs, and shapes to make these patterns visually appealing. The process combines artistic creativity with design software skills, making products more distinctive and market-ready.",
  },
  {
    question: "What services does J.H. Textiles offer?",
    header:
      "We specialize in custom surface pattern design, textile prints, and print development. Our services include:",
    answer: [
      "Placement prints",
      "Print rescaling",
      "Print licensing",
      "Illustration",
      "Print development",
      "Color separation for production",
    ],
  },
  {
    question: "Do you print on fabric?",
    header:
      "No, we do not handle fabric printing in-house. Our focus is on designing high-quality, production-ready textile prints. We provide digital files prepared for various printing methods (digital, screen, or traditional techniques), which you can share with your chosen manufacturer or printer.",
  },
  {
    question: "How long does it take to create a custom print?",
    header:
      "Timelines vary depending on the complexity of the project. A first draft typically takes 7–14 working days. If revisions are needed, the process may take longer. Since custom design is a collaborative process, we work closely with you to refine the print until it fully meets your expectations.",
  },
  {
    question: "How much does a custom print cost?",
    header:
      "Pricing depends on the complexity, medium, and scope of the project. Simpler designs may cost less than intricate, layered, or experimental ones. We provide a tailored quote after reviewing your project requirements.",
  },
  {
    question: "Do you sell ready-to-use prints?",
    header:
      "Yes. Our shop features curated, ready-to-use textile prints available for direct licensing or purchase.",
  },
  {
    question: "Do you create custom prints?",
    header:
      "Yes. We welcome commissions and collaborate closely with clients to develop bespoke textile designs tailored to your brand’s vision, values, and requirements.",
  },
  {
    question: "What do I need to prepare before commissioning a print?",
    header:
      "We recommend preparing a mood board that captures your vision, style, and preferences. This can include images, color palettes, textures, patterns, or even words and phrases. A mood board gives us a clear reference to align with your expectations, streamlining the process and minimizing revisions.",
  },
  {
    question: "What are exclusive prints?",
    header:
      "Exclusive prints grant the buyer sole rights to use the design for a specific product or range. The design cannot be sold or licensed to anyone else. Exclusive rights are more expensive but provide a competitive advantage, ensuring your brand’s print remains unique.",
  },
  {
    question: "What are non-exclusive prints?",
    header:
      "Non-exclusive prints can be sold or licensed to multiple buyers. This means the same design may appear across different brands or products. They are more affordable than exclusive designs, offering high-quality prints at a lower cost.",
  },
  {
    question: "Do you offer color variations?",
    header:
      "Yes. Each print comes with two free color variations. Additional colorways can be developed for an extra fee.",
  },
  {
    question: "What is the difference between placement prints and repeats?",
    header: "",
    answer: [
      "Placement prints are single motifs or designs applied to a specific area of a garment or product, often used to make a statement.",
      "Repeat patterns are seamless designs that tile across fabric continuously without visible edges, making them suitable for large surfaces.",
    ],
  },
  {
    question: "How does print licensing work?",
    header:
      "Licensing grants you the right to use a design for specific products and purposes. Ownership remains with J.H. Textiles, but your brand gains usage rights defined by exclusivity, scope, territory, and duration.",
  },
  {
    question: "What is included in a license?",
    header: "A license agreement typically covers:",
    answer: [
      "Usage scope (apparel, interiors, packaging, etc.)",
      "Territory (local, regional, or global use)",
      "Duration (seasonal, limited-term, or permanent use)",
      "Exclusivity (exclusive vs. non-exclusive rights)",
    ],
  },
  {
    question: "Can I request exclusive rights?",
    header:
      "Yes. Exclusive licenses ensure only your brand can use the design. They are priced higher as they guarantee market distinction.",
  },
  {
    question: "Can I extend my license later?",
    header:
      "Absolutely. If your business expands, we can renegotiate terms to extend the scope, territory, or duration of your license.",
  },
  {
    question: "How can I collaborate with J.H. Textiles?",
    header: "You can:",
    answer: [
      "Book a consultation to discuss custom projects.",
      "Shop ready-to-use prints from our collection.",
      "Request our full portfolio for review.",
    ],
  },
];

export function faqAnswerPlainText(faq: FaqItem): string {
  const parts: string[] = [];
  if (faq.header?.trim()) parts.push(faq.header.trim());
  if (faq.answer?.length) parts.push(faq.answer.join(" "));
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

export function buildFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqAnswerPlainText(faq),
      },
    })),
  };
}
