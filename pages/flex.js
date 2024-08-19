import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      id="navbar"
      className="flex items-center justify-between p-4 bg-gray-800 text-white"
    >
      <div className="logo">MyLogo</div>
      <div className="hidden sm:block">
        <ul id="nav-links" className="flex space-x-4">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
      <div
        id="hamburger-menu"
        className="block sm:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </div>
      {menuOpen && (
        <div className="sm:hidden">
          <ul id="nav-links-sm" className="flex flex-col space-y-4 mt-4">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => (
  <div
    id="hero-section"
    className="hero-section bg-cover bg-center h-64 flex items-center justify-center"
  >
    <div className="text-center">
      <h1 className="hero-title text-4xl font-bold text-black mb-4">
        Welcome to Our Website
      </h1>
      <button className="hero-button bg-blue-500 text-white py-2 px-4 rounded">
        Get Started
      </button>
    </div>
  </div>
);

export default function Flex() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="h-[400px] w-full bg-white"></div>
    </div>
  );
}
