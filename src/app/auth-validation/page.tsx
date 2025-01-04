"use client";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  interface ValidationData {
    email: string;
    password: string;
  }

  const router = useRouter();

  const [validationData, setValidationData] = useState<ValidationData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValidationData({
      ...validationData,
      [name]: value,
    });
  };
  const query = `*[_type == "author"]{email, password}`;

  const authFatchData = async () => {
    const response = await client.fetch(query);

    const matchAuthData = response.some(
        (authData: ValidationData) =>
          authData.email === validationData.email && authData.password === validationData.password
      );
      
      if (matchAuthData) {
        router.push('/studio');
        toast.success("Validation Success!");
      } else {
        toast.error("Validation Failed!");
      }
      
  };

  const hangdleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authFatchData();
  };

  return (
    <main className="min-h-screen min-w-full flex justify-center items-center ">
      <form
        onSubmit={hangdleSubmit}
        className="md:w-[400px] w-auto h-[300px] px-4 py-8 dark:bg-gray-800 rounded-lg  shodow-black shadow-lg flex flex-col items-center justify-evenly gap-4"
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
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            className="px-2 py-2 bg-white text-black rounded-md"
            onChange={handleChange}
          />{" "}
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

export default page;
