import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { auth } from "../firebase";

import logo from "../Assets/logo4.png";
import checklist from "../Assets/checklist.png";
import clock from "../Assets/clock.png";
import rocket from "../Assets/rocket.png";

// Import About, Contact, FAQ
import About from "./About";
import Contact from "./Contact";
import FAQ from "./FAQ";

export default function HomePage() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [user, setUser] = useState(null);

  // Section states
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  // Section refs
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Navigation handlers
  const handleFindJobs = () => {
    if (user) navigate("/jobs");
    else {
      setModalType("signup");
      setModalOpen(true);
    }
  };

  const handlePostJob = () => {
    if (user) navigate("/post-job");
    else {
      setModalType("login");
      setModalOpen(true);
    }
  };

  // Section display handlers
  const handleShowAbout = () => {
    setShowAbout(true);
    setShowContact(false);
    setShowFAQ(false);
    setTimeout(() => aboutRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };
  const handleCloseAbout = () => setShowAbout(false);

  const handleShowContact = () => {
    setShowContact(true);
    setShowAbout(false);
    setShowFAQ(false);
    setTimeout(() => contactRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };
  const handleCloseContact = () => setShowContact(false);

  const handleShowFAQ = () => {
    setShowFAQ(true);
    setShowAbout(false);
    setShowContact(false);
    setTimeout(() => faqRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };
  const handleCloseFAQ = () => setShowFAQ(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1B263B]">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-[#4F8EF7] to-[#1B263B] shadow-md text-white">
        <div className="flex flex-col items-center space-x-2">
          <img src={logo} alt="StudyApart Logo" className="w-16 h-16 mb-1" />
          <h1 className="text-xl font-bold text-white">Study-A-Part</h1>
        </div>

        <div className="flex space-x-4 items-center">
          <motion.button
            onClick={() => { setModalType("signup"); setModalOpen(true); }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#8CC1FF] to-[#1A73E8] px-5 py-2 rounded-lg font-medium transition-all duration-500 hover:from-[#1A73E8] hover:to-[#0047B3] shadow-md"
          >
            Sign Up
          </motion.button>

          {!user ? (
            <motion.button
              onClick={() => { setModalType("login"); setModalOpen(true); }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white px-5 py-2 rounded-lg font-medium transition-all duration-500 bg-gradient-to-r from-[#1A73E8] to-[#0047B3] text-white hover:from-[#8CC1FF] hover:to-[#1A73E8]"
            >
              Login
            </motion.button>
          ) : (
            <motion.button
              onClick={() => auth.signOut()}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#27AE60] px-5 py-2 rounded-lg hover:bg-[#50C878] transition text-white font-medium"
            >
              Logout
            </motion.button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-10 py-16 md:py-24 bg-gradient-to-br from-[#E3ECFB] to-[#4F8EF7]">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mb-10 md:mb-0"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-[#1B263B]">
            Find Your Perfect <span className="text-[#4F8EF7]">Part-Time Job</span> While You Study{" "}
            <span role="img" aria-label="graduation cap">🎓</span>
          </h1>
          <p className="text-lg text-[#1B263B] mb-8">
            Discover flexible opportunities near your campus or online. Earn, learn, and grow your career with verified employers.
          </p>
          <div className="space-x-4 flex flex-row">
            <button
              onClick={handleFindJobs}
              className="bg-[#1A73E8] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1558B0] transition shadow"
            >
              Find Jobs
            </button>
            <button
              onClick={handlePostJob}
              className="border border-[#4F8EF7] text-[#4F8EF7] px-6 py-3 rounded-lg font-medium hover:bg-[#4F8EF7] hover:text-white transition bg-white ml-2"
            >
              Post a Job
            </button>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      {showAbout && (
        <div ref={aboutRef} className="relative">
          <About />
          <div className="flex justify-center mt-4">
            <button
              onClick={handleCloseAbout}
              className="bg-[#000080] text-white px-6 py-2 rounded-lg hover:bg-[#1A3BB8] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Contact Section */}
      {showContact && (
        <div ref={contactRef} className="relative">
          <Contact />
          <div className="flex justify-center mt-4">
            <button
              onClick={handleCloseContact}
              className="bg-[#000080] text-white px-6 py-2 rounded-lg hover:bg-[#1A3BB8] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {showFAQ && (
        <div ref={faqRef} className="relative">
          <FAQ />
          <div className="flex justify-center mt-4">
            <button
              onClick={handleCloseFAQ}
              className="bg-[#000080] text-white px-6 py-2 rounded-lg hover:bg-[#1A3BB8] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Why Choose Section */}
      <section className="bg-[#FFFFFF] py-20 px-8 md:px-16">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-14 text-[#1B263B]"
        >
          Why Choose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F8EF7] to-[#000080]">
            Study-A-Part?
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 text-center max-w-6xl mx-auto">
          {[
            { title: "Verified Jobs", desc: "All job listings are verified to ensure safety and reliability.", icon: checklist },
            { title: "Flexible Hours", desc: "Find part-time work that fits your college schedule.", icon: clock },
            { title: "Skill Growth", desc: "Work experiences that boost your resume and confidence.", icon: rocket }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ scale: 1.07, rotate: 0.5 }}
              className="group bg-gradient-to-b from-[#F9FBFF] to-[#EAF1FB] p-10 rounded-2xl shadow-lg hover:shadow-2xl border border-[#E1E8F0] transition-all duration-500 hover:border-[#4F8EF7]/40"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-[#4F8EF7] to-[#000080] w-20 h-20 flex items-center justify-center rounded-full shadow-md group-hover:scale-110 transition-transform duration-500">
                  <img src={item.icon} alt={item.title} className="w-10 h-10 object-contain drop-shadow-md"/>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#1B263B] group-hover:text-[#000080] transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-gray-600 group-hover:text-[#1B263B] transition-colors duration-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-12 px-6 md:px-20 mt-auto">
        <div className="grid md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
          <div>
            <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-[#9DC2FF]">
              <img src={logo} alt="Study-A-Part Logo" className="w-16 h-16" />
            </div>
            <p className="text-sm leading-relaxed">
              Study-A-Part connects students with flexible part-time jobs, helping them gain real-world experience while continuing their studies.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition">Find Jobs</Link></li>
              <li><Link to="/post-job" className="hover:text-white transition">Post a Job</Link></li>
              <li>
                <button onClick={handleShowAbout} className="hover:text-white transition font-medium">About Us</button>
              </li>
              <li>
                <button onClick={handleShowContact} className="hover:text-white transition font-medium">Contact Us</button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={handleShowFAQ} className="hover:text-white transition font-medium">FAQs</button>
              </li>
              <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-10 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Study-A-Part. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
