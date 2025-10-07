import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthForm({ type = "login", onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState(type); // "login" or "signup"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (formType === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        onSuccess?.(); // callback after login
        alert("Login successful");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        onSuccess?.();
        alert("Signup successful");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-80 relative">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {formType === "login" ? "Login" : "Sign Up"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading
              ? formType === "login"
                ? "Logging in..."
                : "Signing up..."
              : formType === "login"
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          {formType === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setFormType("signup")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setFormType("login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
