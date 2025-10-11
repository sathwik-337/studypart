





import React from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "What is Study-A-Part?",
      answer: "Study-A-Part connects students with flexible part-time jobs while they continue their studies."
    },
    {
      question: "How do I find jobs?",
      answer: "You can click on 'Find Jobs' in the homepage or browse the Jobs section to see verified opportunities."
    },
    {
      question: "Can I post a job?",
      answer: "Yes, verified employers or institutions can post jobs by clicking 'Post a Job' on the homepage."
    },
    {
      question: "Is it safe?",
      answer: "Absolutely! All jobs are verified to ensure safety and reliability for students."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach us via the Contact Us section in the footer or email us at support@studyapart.com."
    }
  ];

  return (
    <section className="flex flex-col items-center px-8 py-20 md:px-16 md:py-24 max-w-5xl mx-auto text-center bg-[#F5F7FA]">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#1B263B]">
        Frequently Asked <span className="text-[#4F8EF7]">Questions</span>
      </h2>

      <div className="w-full max-w-3xl mt-8">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6 text-left border-b border-gray-300 pb-4">
            <h3 className="text-xl font-semibold text-[#1B263B]">{faq.question}</h3>
            <p className="text-gray-700 mt-2 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
