import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      id="header"
      className="flex items-center justify-between p-4 bg-gray-800 text-white"
    >
      <div className="logo">MyLogo</div>
      <nav className="hidden sm:block" id="nav-links">
        <ul className="flex space-x-4">
          <li>
            <a href="#authors">Authors</a>
          </li>
          <li>
            <a href="#stores">Stores</a>
          </li>
          <li>
            <a href="#books">Books</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
      <div
        className="block sm:hidden cursor-pointer"
        id="hamburger-menu"
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
        <nav className="sm:hidden" id="nav-links-sm">
          <ul className="flex flex-col space-y-4 mt-4">
            <li>
              <a href="#authors">Authors</a>
            </li>
            <li>
              <a href="#stores">Stores</a>
            </li>
            <li>
              <a href="#books">Books</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

const MainContent = () => (
  <main id="main-content" className="container mx-auto px-4">
    <section
      id="authors"
      className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div className="author-card bg-white p-4 rounded shadow">Author 1</div>
      <div className="author-card bg-white p-4 rounded shadow">Author 2</div>
      <div className="author-card bg-white p-4 rounded shadow">Author 3</div>
      {/* Add more authors as needed */}
    </section>
    <section
      id="stores"
      className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div className="store-item bg-gray-500 text-white p-4 rounded">
        Store 1
      </div>
      <div className="store-item bg-gray-500 text-white p-4 rounded">
        Store 2
      </div>
      <div className="store-item bg-gray-500 text-white p-4 rounded">
        Store 3
      </div>
      {/* Add more store items as needed */}
    </section>
    <section
      id="books"
      className="my-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
    >
      <div className="book bg-white p-4 rounded shadow">Book 1</div>
      <div className="book bg-white p-4 rounded shadow">Book 2</div>
      <div className="book bg-white p-4 rounded shadow">Book 3</div>
      {/* Add more Books as needed */}
    </section>
  </main>
);

const Footer = () => (
  <footer
    id="footer"
    className="flex md:flex-row flex-col items-center justify-between p-4 bg-gray-800 text-white"
  >
    <div className="contact-info">Contact: info@example.com</div>
    <div className="social-media-links flex md:flex-row flex-col space-4 md:space-x-4 text-center">
      <a href="#" className="text-blue-500">
        Facebook
      </a>
      <a href="#" className="text-blue-300">
        Twitter
      </a>
      <a href="#" className="text-pink-400">
        Instagram
      </a>
    </div>
  </footer>
);

const App = () => (
  <div>
    <Header />
    <MainContent />
    <Footer />
  </div>
);

export default App;
