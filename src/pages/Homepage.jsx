import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();

  // Demo auth state. Replace with Firebase or backend auth check.
  const isLoggedIn = false; // change to true if user is logged in

  const handleFindJobs = () => {
    if (isLoggedIn) {
      navigate("/jobs");
    } else {
      navigate("/login");
    }
  };

  const handlePostJob = () => {
    if (isLoggedIn) {
      navigate("/signup"); // or employer dashboard
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">StudyApart</h1>
        <div className="space-x-4">
          <button
            onClick={handleFindJobs}
            className="text-gray-600 hover:text-blue-600"
          >
            Browse Jobs
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-10 py-16 md:py-24">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mb-10 md:mb-0"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Find Your Perfect <span className="text-blue-600">Part-Time Job</span> While You Study 🎓
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover flexible opportunities near your campus or online. Earn, learn, and grow your career with verified employers.
          </p>
          <div className="space-x-4">
            <button
              onClick={handleFindJobs}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Find Jobs
            </button>
            <button
              onClick={handlePostJob}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition"
            >
              Post a Job
            </button>
          </div>
        </motion.div>

        {/* Hero Illustration */}
        <motion.img
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          src="https://illustrations.popsy.co/blue/student-reading.svg"
          alt="Student illustration"
          className="w-80 md:w-[420px]"
        />
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-8 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose <span className="text-blue-600">CampusWorks?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Verified Jobs", desc: "All job listings are verified to ensure safety and reliability.", icon: "✅" },
            { title: "Flexible Hours", desc: "Find part-time work that fits your college schedule.", icon: "⏰" },
            { title: "Skill Growth", desc: "Work experiences that boost your resume and confidence.", icon: "🚀" },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-blue-50 p-6 rounded-2xl shadow-sm">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-8">Trusted by Students Across India 🇮🇳</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <p className="text-4xl font-bold">10k+</p>
            <p className="mt-2">Active Students</p>
          </div>
          <div>
            <p className="text-4xl font-bold">2k+</p>
            <p className="mt-2">Verified Employers</p>
          </div>
          <div>
            <p className="text-4xl font-bold">15k+</p>
            <p className="mt-2">Jobs Posted</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-6 text-gray-600 border-t">
        © {new Date().getFullYear()} CampusWorks. All Rights Reserved.
      </footer>
    </div>
  );
}
