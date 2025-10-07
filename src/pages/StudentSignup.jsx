import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function StudentSignup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    idProof: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "idProof") {
      setForm({ ...form, idProof: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!form.idProof) {
      setError("Please upload your ID proof (PDF).");
      setLoading(false);
      return;
    }

    try {
      // 1. Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const userId = userCredential.user.uid;

      // 2. Upload ID proof
      const storageRef = ref(storage, `idProofs/${userId}.pdf`);
      await uploadBytes(storageRef, form.idProof);
      const idProofURL = await getDownloadURL(storageRef);

      // 3. Save user info to Firestore
      await setDoc(doc(db, "students", userId), {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        idProofURL,
        verified: false, // Admin will set this to true
        createdAt: new Date(),
      });

      setSuccess(
        "Registration successful! Your account will be verified by admin."
      );
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        idProof: null,
      });
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-md w-full max-w-xl flex flex-col space-y-4"
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Student Registration
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <label className="text-gray-700">
          Upload ID Proof (PDF)
          <input
            type="file"
            name="idProof"
            accept="application/pdf"
            onChange={handleChange}
            required
            className="mt-1"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}
