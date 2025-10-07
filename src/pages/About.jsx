import React from "react";

export default function About() {
  return (
    <section className="flex flex-col items-center px-8 py-20 md:px-16 md:py-24 max-w-5xl mx-auto text-center bg-[#F5F7FA]">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#1B263B]">
        About <span className="text-[#4F8EF7]">Study-A-Part</span>
      </h2>

      <p className="text-lg text-[#1B263B] mb-6 leading-relaxed">
        Study-A-Part connects students with flexible part-time jobs while they continue their studies. Gain experience, earn money, and build skills for your future career.
      </p>

      <p className="text-lg text-[#1B263B] mb-6 leading-relaxed">
        We partner with verified employers across India to ensure safety and reliability. Discover jobs online or near your campus.
      </p>

      <p className="text-lg text-[#1B263B] mb-6 leading-relaxed">
        Our mission: make part-time work accessible, safe, and beneficial for every student.
      </p>
    </section>
  );
}
