import React from "react";
import { Search, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const recentPosts = [
  {
    title: "Salon Skills: Hygiene & Customer Experience",
    date: "Updated recently",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200",
  },
  {
    title: "Electrical Safety: Hazard Awareness & PPE Basics",
    date: "Updated recently",
    image:
      "https://images.unsplash.com/photo-1581092919535-7146e8b8aa3f?w=200",
  },
  {
    title: "Mechanic Basics: Diagnostics Mindset",
    date: "Updated recently",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=200",
  },
];

const categories = [
  "Salon Skills",
  "Parlour Care",
  "Electrical Safety",
  "Mechanic Basics",
  "Skill Development",
  "Employability",
];

const tags = [
  "Safety",
  "Customer Experience",
  "Practical Training",
  "Workplace Hygiene",
  "Diagnostics",
  "Employability",
  "Community Learning",
  "Career Skills",
];

const Sidebar = () => {
  return (
    <div className="space-y-8">

      {/* Search */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h3 className="text-2xl font-bold mb-5 text-gray-800">
          Search
        </h3>

        <div className="relative">

          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full border rounded-xl py-3 pl-4 pr-12 outline-none focus:border-[#C62828]"
          />

          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C62828]">
            <Search size={20} />
          </button>

        </div>

      </div>

      {/* Categories */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h3 className="text-2xl font-bold mb-5">
          Categories
        </h3>

        <div className="space-y-3">

          {categories.map((item, index) => (
            <Link
              key={index}
              to="#"
              className="flex justify-between items-center py-3 border-b hover:text-[#C62828] transition"
            >
              <span>{item}</span>

              <ArrowRight size={18} />
            </Link>
          ))}

        </div>

      </div>

      {/* Recent Posts */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h3 className="text-2xl font-bold mb-6">
          Recent Posts
        </h3>

        <div className="space-y-6">

          {recentPosts.map((post, index) => (

            <div
              key={index}
              className="flex gap-4"
            >

              <img
                src={post.image}
                alt={post.title}
                className="w-24 h-20 rounded-xl object-cover"
              />

              <div>

                <div className="flex items-center gap-2 text-sm text-red-700 mb-2">

                  <Calendar size={14} />

                  {post.date}

                </div>

                <h4 className="font-semibold text-gray-800 hover:text-[#C62828] cursor-pointer leading-6">

                  {post.title}

                </h4>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Tags */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h3 className="text-2xl font-bold mb-5">
          Popular Tags
        </h3>

        <div className="flex flex-wrap gap-3">

          {tags.map((tag, index) => (

            <button
              key={index}
              className="px-4 py-2 rounded-full bg-red-50 text-[#C62828] hover:bg-[#C62828] hover:text-white duration-300"
            >
              {tag}
            </button>

          ))}

        </div>

      </div>

      {/* Donate Card */}

      <div className="bg-gradient-to-br from-[#C62828] to-[#8E1B1B] rounded-2xl text-white p-8 text-center">

        <h3 className="text-3xl font-bold mb-4">
          Support Our Mission
        </h3>

        <p className="leading-7 mb-8">
          Your contribution helps us educate children,
          support families and transform communities.
        </p>

        <Link
          to="/donate"
          className="inline-block bg-white text-[#C62828] px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
        >
          Donate Now
        </Link>

      </div>

    </div>
  );
};

export default Sidebar;