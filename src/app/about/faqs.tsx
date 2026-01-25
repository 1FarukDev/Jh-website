import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FAQ = ({ handleConsultation }: { handleConsultation: () => void }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();
  const faqData = [
    {
      question: "What is surface pattern design / print design?",
      header:
        "Surface pattern design is the creation of artworks that can be printed or applied onto the surface of objects such as clothes, wallpapers, packaging, and home goods. These designs are often created in repeating formats so they can seamlessly cover any size area. Designers use colors, motifs, and shapes to make these patterns visually appealing. The process combines artistic creativity with design software skills, making products more distinctive and market-ready.",
      // answer: [""],
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
      // answer: [""],
    },
    {
      question: "How long does it take to create a custom print?",
      header:
        "Timelines vary depending on the complexity of the project. A first draft typically takes 7–14 working days. If revisions are needed, the process may take longer. Since custom design is a collaborative process, we work closely with you to refine the print until it fully meets your expectations.",
      // answer: [""],
    },
    {
      question: "How much does a custom print cost?",
      header:
        "Pricing depends on the complexity, medium, and scope of the project. Simpler designs may cost less than intricate, layered, or experimental ones. We provide a tailored quote after reviewing your project requirements.",
      // answer: [""],
    },
    {
      question: "Do you sell ready-to-use prints?",
      header:
        "Yes. Our shop features curated, ready-to-use textile prints available for direct licensing or purchase.",
      // answer: [""],
    },
    {
      question: "Do you create custom prints?",
      header:
        "Yes. We welcome commissions and collaborate closely with clients to develop bespoke textile designs tailored to your brand’s vision, values, and requirements.",
      // answer: [""],
    },
    {
      question: "What do I need to prepare before commissioning a print?",
      header:
        "We recommend preparing a mood board that captures your vision, style, and preferences. This can include images, color palettes, textures, patterns, or even words and phrases. A mood board gives us a clear reference to align with your expectations, streamlining the process and minimizing revisions.",
      // answer: [""],
    },
    {
      question: "What are exclusive prints?",
      header:
        "Exclusive prints grant the buyer sole rights to use the design for a specific product or range. The design cannot be sold or licensed to anyone else. Exclusive rights are more expensive but provide a competitive advantage, ensuring your brand’s print remains unique.",
      // answer: [""],
    },
    {
      question: "What are non-exclusive prints?",
      header:
        "Non-exclusive prints can be sold or licensed to multiple buyers. This means the same design may appear across different brands or products. They are more affordable than exclusive designs, offering high-quality prints at a lower cost.",
      // answer: [""],
    },
    {
      question: "Do you offer color variations?",
      header:
        "Yes. Each print comes with two free color variations. Additional colorways can be developed for an extra fee.",
      // answer: [""],
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
      // answer: [""],
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
      // answer: [""],
    },
    {
      question: "Can I extend my license later?",
      header:
        "Absolutely. If your business expands, we can renegotiate terms to extend the scope, territory, or duration of your license.",
      // answer: [""],
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

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const contentVariants: Variants = {
    hidden: { height: 0, opacity: 0, transition: { duration: 0.3 } },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.4 } },
  };
  const iconVariants: Variants = {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 min-h-screen" id="faqs">
      <section>
        <h1 className="text-[32px] md:text-[60px] text-center">FAQS</h1>
        <p className="md:text-lg text-sm text-[#4E5157] max-w-3xl mx-auto text-center mb-12">
          Answers to questions about our print design process
        </p>
      </section>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-0"
      >
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="border-b border-gray-300"
          >
            <motion.button
              onClick={() => toggleFAQ(index)}
              className="w-full py-8 text-left flex items-start justify-between group transition-colors duration-200 px-4"
              whileHover={{ x: 4 }}
            >
              <h3 className="text-sm md:text-xl font-normal text-gray-900 tracking-wide uppercase leading-relaxed pr-8">
                {faq.question}
              </h3>

              <motion.div
                variants={iconVariants}
                animate={activeIndex === index ? "open" : "closed"}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-6 h-6 text-gray-600 group-hover:text-gray-900"
              >
                <Plus className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-8"
                  >
                    {faq.header && (
                      <p className="text-gray-900 font-medium mb-2 font-satoshi">
                        {faq.header}
                      </p>
                    )}
                    {faq.answer && (
                      <ul className="text-gray-700 leading-relaxed list-disc list-inside space-y-1 font-satoshi">
                        {faq.answer.map((item, idx) => (
                          <li key={idx} className="font-satoshi">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex gap-4 items-center">
                      {(faq.question === "Do you create custom prints?" ||
                        faq.question ===
                          "How can I collaborate with J.H. Textiles?") && (
                        <Button
                          onClick={handleConsultation}
                          className="mt-4 w-fit rounded-none px-6 py-2 font-satoshi text-sm
bg-white text-black hover:bg-black hover:text-white transition-colors border"
                        >
                          Book a consultation
                        </Button>
                      )}
                      {(faq.question === "Do you sell ready-to-use prints?" ||
                        faq.question ===
                          "How can I collaborate with J.H. Textiles?") && (
                        <Button
                          onClick={() => router.push("/shop")}
                          className="mt-4 w-fit rounded-none px-6 py-2 font-satoshi text-sm
bg-white text-black hover:bg-black hover:text-white transition-colors border"
                        >
                          Shop exclusive prints
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FAQ;
