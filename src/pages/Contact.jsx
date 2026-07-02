import React, { useMemo, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null); // null | "loading" | "submitted" | { type: "error", message: string }

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

      // Backend should return JSON, but guard anyway.
      let data = null;
      try {
        data = await res.json();
      } catch {
        // ignore
      }

      if (res.ok) {
        setStatus("submitted");
        setForm({ name: "", email: "", phone: "", message: "" });
        return;
      }

      const message = data?.message || "Error sending message.";
      setStatus({ type: "error", message });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Error sending message." });
    }
  };

  const statusNode = useMemo(() => {
    if (status === "submitted") {
      return <p className="mt-4 text-green-600">Message sent — thank you.</p>;
    }

    if (status && typeof status === "object" && status.type === "error") {
      return <p className="mt-4 text-red-600">{status.message}</p>;
    }

    return null;
  }, [status]);

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <h2 className="text-2xl font-bold text-[#C62828] mb-2">Contact Us</h2>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Have questions, feedback, or want to partner with us? Send your message below and our team will get back to you.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-2">Quick Contact</h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Email:</span> <a className="text-[#C62828] hover:underline" href="mailto:info@jawaharglobal.com">info@jawaharglobal.com</a>
            </p>
            <p>
              <span className="font-medium">Phone:</span> <a className="text-[#C62828] hover:underline" href="tel:+971000000000">+971 00 000 0000</a>
            </p>
            <p>
              <span className="font-medium">Location:</span> Dubai, UAE (by appointment)
            </p>
          </div>
        </div>

        <div className="border rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-2">Office Hours</h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Mon–Thu:</span> 9:00 AM – 5:30 PM
            </p>
            <p>
              <span className="font-medium">Fri:</span> 9:00 AM – 1:00 PM
            </p>
            <p>
              <span className="font-medium">Sat–Sun:</span> Closed
            </p>
          </div>
        </div>

        <div className="border rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-2">Response Time</h3>
          <div className="space-y-2 text-gray-700">
            <p>
              We typically respond within <span className="font-medium">1–2 business days</span>.
            </p>
            <p>
              For urgent matters, please include “URGENT” in your subject/message.
            </p>
            <p className="text-sm text-gray-500">
              (This form saves your message to our contact inbox.)
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
          <form onSubmit={submit} className="flex flex-col gap-3">
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border px-3 py-2 rounded"
              disabled={isLoading}
            />

            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border px-3 py-2 rounded"
              disabled={isLoading}
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border px-3 py-2 rounded"
              disabled={isLoading}
            />

            <textarea
              required
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="border px-3 py-2 rounded h-32"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`bg-[#C62828] text-white px-4 py-2 rounded transition ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-95"}`}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {statusNode}
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3">What happens next?</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>We review your message and route it to the right team.</li>
              <li>We respond via email with the next steps.</li>
              <li>If needed, we may request additional details to proceed.</li>
            </ol>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3">Common topics</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Course inquiries & enrollment support</li>
              <li>• Partnerships & collaborations</li>
              <li>• Media / press requests</li>
              <li>• Certificates & verification questions</li>
            </ul>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3">Tip</h3>
            <p className="text-gray-700">
              Include as many details as possible (name, topic, and any relevant links). This helps us resolve your request faster.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

