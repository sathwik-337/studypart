import React from "react";

export default function Contact() {
  return (
    <section className="flex flex-col items-center px-8 py-20 md:px-16 md:py-24 max-w-5xl mx-auto text-center bg-[#F5F7FA]">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#1B263B]">
        Contact <span className="text-[#4F8EF7]">Us</span>
      </h2>

      <p className="text-lg text-[#1B263B] mb-6 leading-relaxed">
        Have questions, feedback, or suggestions? We would love to hear from you!
      </p>

      <p className="text-lg text-[#1B263B] mb-6 leading-relaxed">
        Email us at:{" "}
        <a
          href="mailto:support@studyapart.com"
          className="text-[#4F8EF7] underline"
        >
          support@studyapart.com
        </a>
      </p>

      <p className="text-lg text-[#1B263B] mb-6 leading-relaxed">
        Or reach out through our social media channels for updates and support.
      </p>
    </section>
  );
}
