import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrCreateVisitorId } from "../lib/visitor";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ── QR placeholder (swap with real QR library if needed) ── */
function QRPlaceholder({ value }) {
  return (
    <div
      style={{
        width: 90,
        height: 90,
        border: "3px solid #6B21A8",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        padding: 4,
      }}
    >
      {/* Simple SVG QR-look placeholder */}
      <svg viewBox="0 0 21 21" width="72" height="72" xmlns="http://www.w3.org/2000/svg">
        {/* Top-left finder */}
        <rect x="1" y="1" width="7" height="7" fill="none" stroke="#000" strokeWidth="1" />
        <rect x="2.5" y="2.5" width="4" height="4" fill="#000" />
        {/* Top-right finder */}
        <rect x="13" y="1" width="7" height="7" fill="none" stroke="#000" strokeWidth="1" />
        <rect x="14.5" y="2.5" width="4" height="4" fill="#000" />
        {/* Bottom-left finder */}
        <rect x="1" y="13" width="7" height="7" fill="none" stroke="#000" strokeWidth="1" />
        <rect x="2.5" y="14.5" width="4" height="4" fill="#000" />
        {/* Data dots */}
        <rect x="10" y="1" width="1.5" height="1.5" fill="#000" />
        <rect x="10" y="3.5" width="1.5" height="1.5" fill="#000" />
        <rect x="10" y="6" width="1.5" height="1.5" fill="#000" />
        <rect x="1" y="10" width="1.5" height="1.5" fill="#000" />
        <rect x="3.5" y="10" width="1.5" height="1.5" fill="#000" />
        <rect x="6" y="10" width="1.5" height="1.5" fill="#000" />
        <rect x="10" y="10" width="1.5" height="1.5" fill="#000" />
        <rect x="12.5" y="10" width="1.5" height="1.5" fill="#000" />
        <rect x="15" y="10" width="1.5" height="1.5" fill="#000" />
        <rect x="17.5" y="10" width="1.5" height="1.5" fill="#000" />
        <rect x="10" y="12.5" width="1.5" height="1.5" fill="#000" />
        <rect x="12.5" y="12.5" width="1.5" height="1.5" fill="#000" />
        <rect x="15" y="15" width="1.5" height="1.5" fill="#000" />
        <rect x="17.5" y="17.5" width="1.5" height="1.5" fill="#000" />
        <rect x="10" y="17.5" width="1.5" height="1.5" fill="#000" />
        <rect x="12.5" y="17.5" width="1.5" height="1.5" fill="#000" />
      </svg>
    </div>
  );
}

/* ── Corner Bracket SVG ── */
function CornerBracket({ position }) {
  const isTop = position === "top-right";
  const color = "#7B1C1C"; /* dark maroon */
  const size = 110;

  const style = {
    position: "absolute",
    width: size,
    height: size,
    ...(isTop ? { top: 0, right: 0 } : { bottom: 0, left: 0 }),
  };

  return (
    <div style={style}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={isTop ? {} : { transform: "rotate(180deg)" }}
      >
        {/* Filled corner triangle */}
        <polygon points={`${size},0 ${size},${size} 0,0`} fill={color} />
        {/* Inner cutout to make bracket shape */}
        <polygon points={`${size},16 ${size},${size} 16,0 ${size - 16},0 ${size},0`} fill="#fff" />
      </svg>
    </div>
  );
}

export default function Certificate() {
  const { certificateId } = useParams();
  const visitorId = useMemo(() => getOrCreateVisitorId(), []);

  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/certificates/${certificateId}`, {
      headers: { "x-visitor-id": visitorId },
    })
      .then(async (r) => {
        if (!r.ok) {
          const body = await r.json().catch(() => ({}));
          throw new Error(body.message || "Certificate not found");
        }
        return r.json();
      })
      .then(setCertificate)
      .catch((e) => setError(e?.message || "Failed to load"));
  }, [certificateId, visitorId]);

  /* ── Error State ── */
  if (error) {
    return (
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#C62828]">Error</h1>
        <p className="mt-3 text-gray-600">{error}</p>
        <Link to="/certificates" className="text-red-700 font-bold hover:underline mt-4 inline-block">
          ← Back
        </Link>
      </main>
    );
  }

  /* ── Loading State ── */
  if (!certificate) {
    return (
      <main className="container mx-auto px-4 py-10 text-center">
        <p className="text-gray-500 animate-pulse">Loading certificate...</p>
      </main>
    );
  }

  const issuedDate = new Date(certificate.issuedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  /* ── Main Certificate ── */
  return (
    <main className="container mx-auto px-4 py-10 max-w-5xl">
      {/* Top action bar */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <Link to="/certificates" className="text-sm font-bold text-red-700 hover:underline flex items-center gap-1">
          ← My Certificates
        </Link>
        <button
          onClick={() => window.print()}
          className="text-sm font-bold border border-gray-200 hover:border-red-700 hover:text-red-700 px-5 py-2 rounded-md transition-colors"
        >
          🖨 Print / Save PDF
        </button>
      </div>

      {/* ════════════ CERTIFICATE CARD ════════════ */}
      <div
        id="certificate-print"
        style={{
          position: "relative",
          background: "#fff",
          border: "3px solid #B8860B",   /* gold outer border */
          outline: "6px solid #fff",
          outlineOffset: "-12px",
          minHeight: 520,
          fontFamily: "'Segoe UI', sans-serif",
          overflow: "hidden",
          padding: "36px 48px",
        }}
      >
        {/* ── Dark Maroon Corner Brackets ── */}
        <CornerBracket position="top-right" />
        <CornerBracket position="bottom-left" />

        {/* ── Gold accent lines (bottom) ── */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 40,
            width: 80,
            height: 6,
            background: "#B8860B",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 40,
            width: 80,
            height: 6,
            background: "#B8860B",
            borderRadius: 2,
          }}
        />

        {/* ═══ HEADER ROW ═══ */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          {/* Left: Logo + Certificate ID */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 100 }}>
            {/* Logo circle */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "3px solid #7B1C1C",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Replace with <img src="/logo.png" /> if you have logo */}
              <span style={{ fontWeight: 900, color: "#7B1C1C", fontSize: 18, letterSpacing: 1 }}>JGF</span>
              <span style={{ fontSize: 7, color: "#7B1C1C", fontWeight: 700, textAlign: "center", lineHeight: 1.1 }}>JAWAHAR GLOBAL</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#555", marginBottom: 2 }}>Certificate ID</p>
              <p style={{ fontSize: 11, fontWeight: 900, color: "#7B1C1C", letterSpacing: 1 }}>
                {certificate.certificateNumber}
              </p>
            </div>
          </div>

          {/* Center: Organization Name + Address */}
          <div style={{ flex: 1, textAlign: "center", padding: "0 16px" }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#7B1C1C",
                letterSpacing: 4,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Jawahar Global Foundation
            </h1>
            <p
              style={{
                fontSize: 9.5,
                letterSpacing: 2,
                color: "#555",
                textTransform: "uppercase",
                lineHeight: 1.7,
              }}
            >
              Saharanpur, Uttar Pradesh – 247001<br />
              An ISO 9001:2015 Certified Organization<br />
              Reg. No. UP/2019/0123456 | Unique ID – UP/2024/0001
            </p>
          </div>

          {/* Right: Photo + Date */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 100 }}>
            {/* Candidate photo box */}
            <div
              style={{
                width: 80,
                height: 88,
                border: "2px solid #7B1C1C",
                background: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {certificate.photoUrl ? (
                <img src={certificate.photoUrl} alt="Candidate" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <svg width="36" height="36" fill="#ccc" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#555", marginBottom: 2 }}>Date of Issue</p>
              <p style={{ fontSize: 11, fontWeight: 900, color: "#222" }}>{issuedDate}</p>
            </div>
          </div>
        </div>

        {/* ── Maroon Divider ── */}
        <div style={{ width: "100%", height: 2, background: "#7B1C1C", margin: "18px 0 12px" }} />

        {/* ═══ CERTIFICATE BODY ═══ */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: 42,
              fontWeight: 900,
              letterSpacing: 6,
              color: "#111",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Certificate
          </h2>
          <p
            style={{
              fontSize: 14,
              letterSpacing: 6,
              color: "#444",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            of {certificate.certificateType || "Completion"}
          </p>

          {/* Thin maroon line */}
          <div style={{ width: 220, height: 1.5, background: "#7B1C1C", margin: "0 auto 16px" }} />

          <p
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 4,
              color: "#444",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Proudly Presented To
          </p>

          {/* Recipient Name */}
          <p
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: "#7B1C1C",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {certificate.fullName}
          </p>

          <p style={{ fontSize: 14, color: "#444", marginBottom: 4, fontStyle: "italic" }}>
            for successfully completing
          </p>
          <p
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#222",
              marginBottom: 28,
            }}
          >
            {certificate.courseTitle || certificate.courseSlug}
          </p>

          {/* QR Code centered */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <QRPlaceholder value={`${API}/api/certificates/${certificateId}`} />
          </div>
        </div>

        {/* ═══ FOOTER ROW ═══ */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 12,
          }}
        >
          {/* Session */}
          <div style={{ textAlign: "center", minWidth: 120 }}>
            <div style={{ width: 120, height: 1, background: "#555", marginBottom: 5 }} />
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#555", textTransform: "uppercase" }}>
              Session
            </p>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#222" }}>
              {certificate.session || new Date(certificate.issuedAt).getFullYear()}
            </p>
          </div>

          {/* Authorized Signatory */}
          <div style={{ textAlign: "center", minWidth: 140 }}>
            <div style={{ width: 140, height: 1, background: "#555", marginBottom: 5 }} />
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#555", textTransform: "uppercase" }}>
              MD Sign.
            </p>
            <p style={{ fontSize: 10, color: "#777" }}>Jawahar Global Foundation</p>
          </div>
        </div>
      </div>

      {/* Note */}
      <p className="mt-5 text-xs text-gray-400 text-center print:hidden">
        Certificate ID: {certificate.certificateNumber} · Issued by Jawahar Global Foundation
      </p>

      {/* ── Print Styles ── */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #certificate-print, #certificate-print * { visibility: visible; }
          #certificate-print { position: fixed; top: 0; left: 0; width: 100vw; margin: 0; padding: 32px 48px; box-shadow: none !important; border-color: #B8860B !important; }
          @page { size: A4 landscape; margin: 0; }
        }
      `}</style>
    </main>
  );
}