import React from "react";
import { Mail, ArrowRight } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#C62828] to-[#8E1B1B]">
      <div className="container mx-auto px-5">

        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 lg:p-12">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left Content */}
            <div>

              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <Mail size={32} className="text-[#C62828]" />
              </div>

              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Subscribe to Our Newsletter
              </h2>

              <p className="text-gray-600 leading-8">
                Stay connected with Jawahar Global Foundation and receive
                updates about our latest campaigns, success stories,
                events, education programs and community initiatives.
              </p>

            </div>

            {/* Right Form */}

            <div>

              <div className="space-y-5">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C62828]"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C62828]"
                />

                <button
                  className="w-full bg-[#C62828] hover:bg-[#a61d1d] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition duration-300"
                >
                  Subscribe Now
                  <ArrowRight size={20} />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Newsletter;