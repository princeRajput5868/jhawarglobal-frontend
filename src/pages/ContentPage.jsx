import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function ContentPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/pages/${slug}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || "Page not found");
        }
        return res.json();
      })
      .then((data) => setPage(data))
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-[#C62828]">Page not found</h2>
        <p className="mt-3 text-gray-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-[#C62828]">{page?.title || "Loading..."}</h2>
      <div className="mt-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: page?.content || "" }} />
    </main>
  );
}
