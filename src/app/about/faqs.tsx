import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { faqData } from "./faq-data";

const FAQ = ({ handleConsultation }: { handleConsultation: () => void }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

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
                      {(faq.question === "What are exclusive prints?" ||
                        faq.question === "What are non-exclusive prints?") && (
                        <Button
                          onClick={() => router.push("/license")}
                          className="mt-4 w-fit rounded-none px-6 py-2 font-satoshi text-sm
bg-white text-black hover:bg-black hover:text-white transition-colors border"
                        >
                          View licence agreement
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
