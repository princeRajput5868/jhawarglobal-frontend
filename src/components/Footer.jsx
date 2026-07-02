import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

import logo from "../assets/foundation_logo.png";

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#7B1E1E] text-white mt-20">

      {/* Top Section */}
      <div className="container mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

          {/* Logo */}
          <div>

            <img
              src={logo}
              alt="Jawahar Global Foundation"
              className="h-20 mb-5"
            />

            <p className="text-gray-200 leading-7 mb-5">
              Jawahar Global Foundation is dedicated to empowering
              communities through education, healthcare, women
              empowerment and sustainable development initiatives.
            </p>

            <div className="flex gap-4 text-xl">

              <a href="#">
                <FaFacebookF className="hover:text-yellow-300 duration-300" />
              </a>

              <a href="#">
                <FaInstagram className="hover:text-yellow-300 duration-300" />
              </a>

              <a href="#">
                <FaLinkedinIn className="hover:text-yellow-300 duration-300" />
              </a>

              <a href="#">
                <FaYoutube className="hover:text-yellow-300 duration-300" />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link to="/" className="hover:text-yellow-300">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-yellow-300">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/gallery" className="hover:text-yellow-300">
                  Gallery
                </Link>
              </li>

              <li>
                <Link to="/blog" className="hover:text-yellow-300">
                  Blog
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-yellow-300">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Programs */}

          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Our Programs
            </h3>

            <ul className="space-y-3">

              <li>Education Support</li>

              <li>Healthcare Camps</li>

              <li>Women Empowerment</li>

              <li>Skill Development</li>

              <li>Environment Protection</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <FaMapMarkerAlt className="mt-1 text-yellow-300" />

                <p>
                  New Delhi,
                  India
                </p>

              </div>

              <div className="flex gap-3">

                <FaPhoneAlt className="mt-1 text-yellow-300" />

                <p>
                  +91 9876543210
                </p>

              </div>

              <div className="flex gap-3">

                <FaEnvelope className="mt-1 text-yellow-300" />

                <p>
                  info@jawaharglobalfoundation.org
                </p>

              </div>

            </div>

            <Link
              to="/donate"
              className="inline-block mt-8 bg-white text-[#7B1E1E] px-7 py-3 rounded-full font-semibold hover:bg-yellow-300 duration-300"
            >
              Donate Now
            </Link>

          </div>

        </div>

      </div>

      {/* Newsletter */}

      <div className="bg-[#651717]">

        <div className="container mx-auto px-6 py-10">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div>

              <h3 className="text-2xl font-bold">
                Subscribe to our Newsletter
              </h3>

              <p className="text-gray-200">
                Stay updated with our latest initiatives and events.
              </p>

            </div>

            <div className="flex w-full lg:w-auto">

              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 rounded-l-lg w-full lg:w-80 text-black outline-none"
              />

              <button className="bg-yellow-400 text-black px-6 rounded-r-lg font-semibold hover:bg-yellow-300">
                Subscribe
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-red-800">

        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-gray-300 text-center">
            © {new Date().getFullYear()} Jawahar Global Foundation.
            All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <Link to="/privacy" className="hover:text-yellow-300">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-yellow-300">
              Terms & Conditions
            </Link>

          </div>

          <button
            onClick={scrollTop}
            className="bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-300 duration-300"
          >
            <FaArrowUp />
          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;