import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Lawease?",
    answer:
      "Lawease is a platform that simplifies legal research and case management for lawyers, students, and law professionals.",
  },
  {
    question: "Is Lawease free to use?",
    answer:
      "Yes, Lawease provides free access to basic legal tools, with premium plans available for advanced features.",
  },
  {
    question: "Can I contribute during Hacktoberfest?",
    answer:
      "Absolutely! You can fork the repo, find issues labeled 'good first issue', and make your contribution to Lawease.",
  },
  {
    question: "Will there be AI features?",
    answer:
      "Yes! Upcoming updates include AI-powered document summaries and legal query assistance.",
  },
];

export default function FAQSection({ darkMode = true }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`py-8 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg overflow-hidden ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center text-left p-5 transition-colors ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`px-5 pb-5 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
