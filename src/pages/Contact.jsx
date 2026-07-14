import React, { useMemo, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Building, Globe, MessageCircle } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", subject: "" });
  const [status, setStatus] = useState(null);

  const isLoading = status === "loading";

  const submit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setStatus("loading");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {}

      if (res.ok) {
        setStatus("submitted");
        setForm({ name: "", email: "", phone: "", message: "", subject: "" });
        return;
      }

      const message = data?.message || "Error sending message.";
      setStatus({ type: "error", message });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Error sending message." });
    }
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#0B2545] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(242,169,59,0.15),_transparent_55%)]" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F2A93B]/20 rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-[#F2A93B]" />
          </div>
          <h1 className="text-3xl md:text-5xl font-sora font-extrabold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
            Have questions, feedback, or want to partner with us? Reach out and our team will get back to you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-[#F2A93B]/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#F2A93B]" />
              </div>
              <h3 className="font-bold text-[#0B2545] text-sm mb-2">Phone</h3>
              <a href="tel:+971000000000" className="text-gray-600 text-sm hover:text-[#F2A93B] transition-colors">
                +971 00 000 0000
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-[#F2A93B]/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#F2A93B]" />
              </div>
              <h3 className="font-bold text-[#0B2545] text-sm mb-2">Email</h3>
              <a href="mailto:info@jawaharglobal.com" className="text-gray-600 text-sm hover:text-[#F2A93B] transition-colors">
                info@jawaharglobal.com
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-[#F2A93B]/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#F2A93B]" />
              </div>
              <h3 className="font-bold text-[#0B2545] text-sm mb-2">Location</h3>
              <p className="text-gray-600 text-sm">Dubai, UAE (by appointment)</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-[#F2A93B]/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#F2A93B]" />
              </div>
              <h3 className="font-bold text-[#0B2545] text-sm mb-2">Working Hours</h3>
              <p className="text-gray-600 text-sm">Mon–Thu: 9AM – 5:30PM</p>
              <p className="text-gray-600 text-sm">Fri: 9AM – 1PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Info Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Form - 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 lg:p-10">
                <h2 className="text-2xl font-sora font-extrabold text-[#0B2545] mb-2">Send us a message</h2>
                <p className="text-gray-500 text-sm mb-6">We'll get back to you within 1-2 business days.</p>

                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent outline-none transition bg-white"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent outline-none transition bg-white"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        placeholder="+971 50 000 0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent outline-none transition bg-white"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                        Subject
                      </label>
                      <input
                        placeholder="Course Inquiry"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent outline-none transition bg-white"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      placeholder="Tell us how we can help you..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent outline-none transition bg-white h-32 resize-none"
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-[#F2A93B] hover:bg-[#e0993a] text-[#0B2545] font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#0B2545] border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  {status === "submitted" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-green-700 font-semibold">Message sent successfully!</p>
                        <p className="text-green-600 text-sm">We'll get back to you within 1-2 business days.</p>
                      </div>
                    </div>
                  )}

                  {status && typeof status === "object" && status.type === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-700 font-semibold">Error</p>
                        <p className="text-red-600 text-sm">{status.message}</p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Sidebar - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#0B2545] rounded-2xl p-6 md:p-8 text-white">
                <h3 className="font-sora font-bold text-xl mb-4">What happens next?</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-[#F2A93B]/20 text-[#F2A93B] rounded-full text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                    <div>
                      <p className="font-semibold">We review your message</p>
                      <p className="text-slate-300 text-sm">We route it to the right team</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-[#F2A93B]/20 text-[#F2A93B] rounded-full text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                    <div>
                      <p className="font-semibold">We respond via email</p>
                      <p className="text-slate-300 text-sm">Within 1-2 business days</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-[#F2A93B]/20 text-[#F2A93B] rounded-full text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                    <div>
                      <p className="font-semibold">We resolve your request</p>
                      <p className="text-slate-300 text-sm">We may request additional details</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                <h3 className="font-sora font-bold text-[#0B2545] text-lg mb-4">Common topics</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-[#F2A93B] rounded-full" />
                    Course inquiries & enrollment support
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-[#F2A93B] rounded-full" />
                    Partnerships & collaborations
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-[#F2A93B] rounded-full" />
                    Media / press requests
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-[#F2A93B] rounded-full" />
                    Certificates & verification questions
                  </li>
                </ul>
              </div>

              <div className="bg-[#F2A93B]/10 rounded-2xl p-6 md:p-8 border border-[#F2A93B]/20">
                <h3 className="font-sora font-bold text-[#0B2545] text-lg mb-2">💡 Pro Tip</h3>
                <p className="text-gray-600 text-sm">
                  Include as many details as possible (name, topic, and any relevant links). 
                  This helps us resolve your request faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-64 md:h-80 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#F2A93B] mx-auto mb-2" />
                <p className="text-gray-500">Dubai, UAE</p>
                <p className="text-gray-400 text-sm">Find us on Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}