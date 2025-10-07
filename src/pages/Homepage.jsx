import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthForm from "../pages/Authform";
import { auth } from "../firebase";
import logo from "../Assets/logo4.png";

export default function HomePage() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleFindJobs = () => {
    if (user) navigate("/jobs");
    else {
      setModalType("login");
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1B263B]">
      <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-[#3CB371] to-[#008080] shadow-md text-white">
        <div className="flex flex-col items-center space-x-2">
          <img
            src={logo}
            alt="StudyApart Logo"
            className="w-20 h-20"
          />
          <h1 className="text-xl font-bold mt-1 text-black">Study-A-Part</h1>
        </div>
        <div className="space-x-4">
          <button onClick={handleFindJobs} className="hover:underline">
            Browse Jobs
          </button>
          {!user ? (
            <button
              onClick={() => {
                setModalType("login");
                setModalOpen(true);
              }}
              className="bg-[#1A73E8] px-4 py-2 rounded-lg hover:bg-[#1558B0] transition text-white"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => auth.signOut()}
              className="bg-[#27AE60] px-4 py-2 rounded-lg hover:bg-[#50C878] transition text-white"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <section className="flex flex-col md:flex-row justify-between items-center px-10 py-16 md:py-24 bg-gradient-to-br from-[#F4F6FB] to-[#F2F6F8]">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mb-10 md:mb-0"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-[#1B263B]">
            Find Your Perfect <span className="text-[#008080]">Part-Time Job</span> While You Study 🎓
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover flexible opportunities near your campus or online. Earn, learn, and grow your career with verified employers.
          </p>
          <div className="space-x-4">
            <button
              onClick={handleFindJobs}
              className="bg-[#1A73E8] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1558B0] transition"
            >
              Find Jobs
            </button>
            <button
              onClick={handlePostJob}
              className="border border-[#3CB371] text-[#3CB371] px-6 py-3 rounded-lg font-medium hover:bg-[#3CB371] hover:text-white transition"
            >
              Post a Job
            </button>
          </div>
        </motion.div>

        {/* Hero image removed as requested */}
      </section>

      <section className="bg-[#FFFFFF] py-16 px-8 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose <span className="text-[#008080]">CampusWorks?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Verified Jobs", desc: "All job listings are verified to ensure safety and reliability.", icon: "✅" },
            { title: "Flexible Hours", desc: "Find part-time work that fits your college schedule.", icon: "⏰" },
            { title: "Skill Growth", desc: "Work experiences that boost your resume and confidence.", icon: "🚀" },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-[#F4F6FB] p-6 rounded-2xl shadow-sm border border-[#F2F6F8]">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#1B263B]">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#3CB371] to-[#008080] text-white text-center">
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

      <footer className="bg-[#FFFFFF] text-center py-6 text-[#1B263B] border-t border-[#F2F6F8]">
        © {new Date().getFullYear()} CampusWorks. All Rights Reserved.
      </footer>

      {modalOpen && (
        <AuthForm
          type={modalType}
          onSuccess={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
