"use client";

import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from 'lucide-react';

const ValidationProcess = () => {
  const router = useRouter();

  const [validationData, setValidationData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValidationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const authFetchData = async () => {
    const query = `*[_type == "author" && email == $email && password == $password][0]`;
    const params = { email: validationData.email, password: validationData.password };

    try {
      const response = await client.fetch(query, params);

      if (response) {
        toast.success("Validation Success!");
        setTimeout(() => {
          router.push("/studio");
        }, 1500); // Delay navigation to show the toast
      } else {
        toast.error("Validation Failed!");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authFetchData();
  };

  return (
    <main className="min-h-screen min-w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="md:w-[400px] w-auto h-[320px] px-4 pb-10 pt-4 dark:bg-gray-800 rounded-lg shadow-black shadow-lg flex flex-col items-center justify-evenly gap-4"
      >
        <h1 className="text-2xl font-bold text-dark dark:text-light">
          Author Validation
        </h1>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            className="px-2 py-2 bg-white text-black rounded-md"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              className="px-2 py-2 bg-white text-black rounded-md w-full pr-10"
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-orange-600 text-white w-full rounded-md"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </main>
  );
};

export default ValidationProcess;

