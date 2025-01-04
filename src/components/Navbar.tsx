"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { FaHome, FaWindowClose } from "react-icons/fa";
import { CgMenuRightAlt } from "react-icons/cg";
import Link from "next/link";
import { SiYoutubestudio } from "react-icons/si";
import { BsBrightnessHighFill } from "react-icons/bs";
import ThemeToggle from "./ThemeToggle";

export const Navbar = () => {
  const menuDivRef = useRef<HTMLDivElement | null>(null);

  const handleMenuOpen = () => {
    gsap.to(menuDivRef.current, { display: "flex", right: "0", duration: 0.5 });
    gsap.to(".navLink", {
      x: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.5,
      delay: 0.2,
    });
  };

  const handleMenuClose = () => {
    gsap.to(menuDivRef.current, {
      right: "-100%",
      duration: 0.5,
      display: "none",
    });
    gsap.to(".navLink", { x: 100, opacity: 0, duration: 0.5 });
  };

  return (
    <>
      <header className="min-w-full h-[115px] bg-blue-600 flex justify-evenly items-center">
        <h1
          className="font-sans text-3xl text-[#FFFFFF] pb-1"
          style={{ borderBottom: "3px double yellow" }}
        >
          DailyTechThoughts
        </h1>

        <div className=" h-[33px] text-2xl md:flex items-center gap-4 text-white hidden">
          <Link
            href={"/"}
            className="flex gap-3 items-center navberOptions"
          >
            <span>Home</span> <FaHome />
          </Link>

          <Link
            href={"/auth-validation"}
            className="flex gap-3 items-center navberOptions"
          >
            <span>Studio</span> <SiYoutubestudio />
          </Link>

          <div
            className="flex gap-3 items-center navberOptions"
          >
            <ThemeToggle />
          </div>
        </div>
        <span className="lg:hidden block text-3xl" onClick={handleMenuOpen}>
          <CgMenuRightAlt />
        </span>
      </header>

      <div
        ref={menuDivRef}
        className="menudiv fixed top-0 right-[-100%] h-full w-full bg-white flex flex-col justify-center items-center z-50"
      >
        <div className="w-full relative">
          <FaWindowClose
            className="text-black absolute top-[-11rem] left-[2rem] rounded-lg text-2xl"
            onClick={handleMenuClose}
            aria-label="Close menu"
          />
        </div>
        <nav className="flex flex-col mx-auto gap-3 text-3xl items-start h-[30%] text-black">
          <Link
            href={"/"}
            onClick={handleMenuClose}
            className="flex gap-3 items-center border-b-2 border-gray-300 navLink"
          >
            <span>Home</span> <FaHome />
          </Link>

          <Link
            href={"/auth-validation"}
            onClick={handleMenuClose}
            className="flex gap-3 items-center border-b-2 border-gray-300 navLink"
          >
            <span>Studio</span> <SiYoutubestudio />
          </Link>
          <div
            onClick={handleMenuClose}
            className="flex gap-3 items-center border-b-2 border-gray-300 navLink"
          >
            <span>Theme</span>   <ThemeToggle />

          </div>
        </nav>
      </div>
    </>
  );
};
