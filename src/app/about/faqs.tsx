import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus } from "lucide-react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "WHAT MAKES JH TEXTILE UNIQUE?",
      answer:
        "At J.H Textile, every piece is crafted with care, using natural dyes, hand-printed details, and sustainable materials. Our focus is on creating fabrics that are both timeless and meaningful, carrying the story of craftsmanship in every stitch.",
    },
    {
      question: "DO YOU ACCEPT CUSTOM COMMISSIONS?",
      answer:
        "Yes, we welcome custom commissions and work closely with clients to bring their unique visions to life. Our team specializes in creating bespoke textile designs that reflect your personal style and requirements.",
    },
    {
      question: "WHAT PAYMENT OPTIONS DO YOU ACCEPT?",
      answer:
        "We accept various payment methods including major credit cards, PayPal, bank transfers, and for larger orders, we can arrange payment plans. All transactions are secure and processed through encrypted channels.",
    },
    {
      question: "ARE YOUR TEXTILES SUSTAINABLE?",
      answer:
        "Sustainability is at the core of our practice. We use eco-friendly natural dyes, organic materials where possible, and employ traditional techniques that have minimal environmental impact. Our production process focuses on quality over quantity.",
    },
    {
      question: "DO YOU SHIP INTERNATIONALLY?",
      answer:
        "Yes, we ship worldwide. International shipping rates and delivery times vary by location. We work with trusted shipping partners to ensure your textiles arrive safely and on time, with full tracking and insurance coverage.",
    },
    {
      question: "HOW DO I CARE FOR MY TEXTILE?",
      answer:
        "Each textile comes with specific care instructions. Generally, we recommend gentle hand washing with mild detergent, avoiding harsh chemicals, and air drying away from direct sunlight to preserve the colors and fabric integrity.",
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
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  const iconVariants: Variants = {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 min-h-screen">
      <section>
        <h1 className="text-[32px] md:text-[60px] text-center">FAQS</h1>
        <p className="md:text-lg text-sm text-[#4E5157] max-w-3xl mx-auto text-center font-satoshi mb-12">
          Answers to the things we’re most often asked about our textiles,
          process, and orders.
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
              <h3 className="text-lg md:text-xl font-normal text-gray-900 tracking-wide uppercase leading-relaxed pr-8">
                {faq.question}
              </h3>

              <motion.div
                variants={iconVariants}
                animate={activeIndex === index ? "open" : "closed"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
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
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="px-4 pb-8"
                  >
                    <p className="text-gray-700 leading-relaxed font-satoshi text-base max-w-4xl">
                      {faq.answer}
                    </p>
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
