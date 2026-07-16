import React from "react";
import isoLogo from "../../assets/logos/iso.jpg"; // apne folder structure ke hisab se path change karo
import certifiedLogo from "../../assets/logos/certified.jpg";
import guaranteeLogo from "../../assets/logos/gurantee.jpg";
import jgfLogo from "../../assets/logos/jgf-badge-logo.png";
import msme from "../../assets/logos/msme.jpg"; // apne folder structure ke hisab se path change karo
import skillLogo from "../../assets/logos/startupindia.png"; // apne folder structure ke hisab se path change karo

/* ── QR placeholder ── */
function QRPlaceholder({ value }) {
  return (
    <div
      style={{
        width: 98,
        height: 98,
        border: "2px solid #14306b",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        padding: 3,
        flexShrink: 0,
        marginLeft:180,
      }}
    >
      <svg viewBox="0 0 21 21" width="86" height="86" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="7" height="7" fill="none" stroke="#000" strokeWidth="1" />
        <rect x="2.5" y="2.5" width="4" height="4" fill="#000" />
        <rect x="13" y="1" width="7" height="7" fill="none" stroke="#000" strokeWidth="1" />
        <rect x="14.5" y="2.5" width="4" height="4" fill="#000" />
        <rect x="1" y="13" width="7" height="7" fill="none" stroke="#000" strokeWidth="1" />
        <rect x="2.5" y="14.5" width="4" height="4" fill="#000" />
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

/* ── Small compact certified badge (ISO style, rectangular) ── */
function CertifiedBadge() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        border: "1.5px solid #15803D",
        borderRadius: 6,
        padding: "4px 8px",
        background: "#fff",
        height: 60,
        width: 130,
      }}
    >
      <img
        src={isoLogo}
        alt="ISO Logo"
        style={{
          width: 40,
          height: 40,
          objectFit: "contain",
        }}
      />

      <div style={{ lineHeight: 1.15 }}>
        <div style={{ fontSize: 13, fontWeight: 900, color: "#15803D" }}>ISO</div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#15803D" }}>9001:2015</div>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#15803D" }}>CERTIFIED</div>
      </div>
    </div>
  );
}

/* ── Generic "registered" badge (laurel, non-official) — replaces MSME emblem ── */
function RegistrationBadge() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 , height:120 , width: 130, marginLeft:5,}}>
      <img 
      
        src={msme}
        alt="msme"
        style={{ width: 130, height: 130, objectFit: "contain" }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      </div>
  );
}

/* ── Generic skill-development badge (non-official) — replaces Startup India mark ── */
function SkillBadge() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        // border: "1.5px solid #16A34A",
        borderRadius: 8,
        padding: "6px 10px",
        height: 100,
        width: 130,
        background: "#fff",
      }}
    >
      <img
        src={skillLogo}
        alt="Skill Badge"
        style={{ width: 130, height: 100, objectFit: "contain" }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    
    </div>
  );
}

/* ── Folded ribbon corner decoration ── */
function CornerRibbon({ corner }) {
  const rotations = {
    "top-left": 0,
    "top-right": 90,
    "bottom-right": 180,
    "bottom-left": 270,
  };

  const positions = {
    "top-left": { top: 0, left: 0 },
    "top-right": { top: 0, right: 0 },
    "bottom-right": { bottom: 0, right: 0 },
    "bottom-left": { bottom: 0, left: 0 },
  };

  return (
    <div
      style={{
        position: "absolute",
        width: 100,
        height: 100,
        zIndex: 10,
        pointerEvents: "none",
        ...positions[corner],
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{ transform: `rotate(${rotations[corner]}deg)`, display: "block" }}
      >
        <defs>
          <linearGradient id={`ribbonFace-${corner}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFEA85" />
            <stop offset="45%" stopColor="#FBC02D" />
            <stop offset="100%" stopColor="#E8A400" />
          </linearGradient>
          <linearGradient id={`ribbonFold-${corner}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D68A00" />
            <stop offset="100%" stopColor="#9A5F00" />
          </linearGradient>
          <filter id={`ribbonShadow-${corner}`} x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0a1a3a" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* blue frame corner sitting behind the ribbon */}
        <path d="M0,0 H120 V16 H16 V120 H0 Z" fill="#0B4EA2" />

        <g filter={`url(#ribbonShadow-${corner})`}>
          <g transform="translate(46,46) rotate(-45)">
            {/* main ribbon strip */}
            <rect x="-95" y="-21" width="190" height="42" rx="3" fill={`url(#ribbonFace-${corner})`} />

            {/* top gloss highlight */}
            <rect x="-95" y="-21" width="190" height="10" rx="3" fill="#FFF6C9" opacity="0.55" />

            {/* bottom shade for volume */}
            <rect x="-95" y="13" width="190" height="8" rx="3" fill="#B87800" opacity="0.35" />

            {/* folded-back flap revealing the underside of the ribbon */}
            <path
              d="M -70,21 L -40,21 L -70,51 Z"
              fill={`url(#ribbonFold-${corner})`}
            />
            <path
              d="M -70,21 L -40,21 L -70,51 Z"
              fill="none"
              stroke="#7A4A00"
              strokeWidth="0.75"
              opacity="0.6"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

const dotted = {
  borderBottom: "1.5px dotted #333",
  padding: "0 4px",
  fontWeight: 700,
  color: "#111",
  display: "inline-block",
  minWidth: 60,
};

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

/* Tiled faint background watermark pattern (data-uri SVG) */
const tiledPatternUrl =
  "data:image/svg+xml," +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='220' height='110'>
      <text x='0' y='40' transform='rotate(-22 30 40)' font-family='Segoe UI, sans-serif' font-size='13' font-weight='700' fill='#14306b' opacity='0.05'>JAWAHAR GLOBAL FOUNDATION</text>
      <text x='0' y='95' transform='rotate(-22 30 95)' font-family='Segoe UI, sans-serif' font-size='13' font-weight='700' fill='#14306b' opacity='0.05'>JAWAHAR GLOBAL FOUNDATION</text>
    </svg>
  `);

/**
 * Print-stable JGF certificate.
 * Goal: Chrome Print/PDF output matches the on-screen preview by using a fixed-size A4 landscape container
 * and structured Flex/Grid layout (no negative margin shifting).
 */
export default function CertificateCard({ certificate, qrValue, printId = "certificate-print" }) {
  if (!certificate) return null;

  const meta = certificate.meta || {};

  const photoUrl = meta?.photoUrl || certificate?.photoUrl || null;
  const courseTitle = meta?.courseTitle || certificate?.courseTitle || certificate?.courseSlug || "—";

  const guardianRelation = meta?.guardianRelation || "S/O";
  const guardianName = meta?.guardianName || "—";
  const dob = meta?.dob ? formatDate(meta.dob) : "—";
  const duration = meta?.duration || "—";
  const grade = meta?.grade || "—";
  const enrollmentNo = meta?.enrollmentNo || certificate?.enrollmentNumber || certificate?.certificateNumber || "—";
  const branchCode = meta?.branchCode || "—";
  const place = meta?.place || "—";
  const signatoryName = meta?.signatoryName || "Jawahar Global Foundation";

  const issuedDate = certificate?.issuedAt ? formatDate(certificate?.issuedAt) : "—";

  return (
    <div
      id={printId}
      style={{
        background: "#14306b",
        border: "10px solid #14306b",
        padding: 6,
        boxSizing: "border-box",
        display: "inline-block",
        width: "297mm",
        height: "210mm",
      }}
    >
      {/* Scoped print CSS */}
      <style>{`
        @media print {
          #${printId}, #${printId} * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #${printId} {
            width: 297mm !important;
            height: 210mm !important;
            margin: 0 !important;
            border-width: 10px !important;
            padding: 6px !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            display: block !important;
          }
          #${printId} > div {
            width: 100% !important;
            height: 100% !important;
          }
          #${printId} img {
            -webkit-user-select: none;
            user-select: none;
          }
        }
      `}</style>

      {/* Inner content box — fills 100% of the outer bordered frame */}
      <div
        style={{
          position: "relative",
          background: "#fff",
          border: "1.5px solid #14306b",
          boxSizing: "border-box",
          width: "100%",
          height: "100%",
          padding: "16mm 18mm 0",
          fontFamily: "'Segoe UI', sans-serif",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
        }}
      >
        <div>
          
        </div>
        {/* Tiled faint watermark */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${tiledPatternUrl}")`,
            backgroundRepeat: "repeat",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Diagonal SAMPLE watermark - only show in development */}
        {/* {import.meta.env.DEV && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "42%",
              left: "50%",
              transform: "rotate(-28deg)",
              fontSize: 78,
              fontWeight: 900,
              color: "rgba(214,51,108,0.10)",
              pointerEvents: "none",
              userSelect: "none",
              letterSpacing: 6,
              zIndex: 1,
              whiteSpace: "nowrap",
            }}
          >
            SAMPLE
          </div>
        )} */}

        <CornerRibbon corner="top-left" />
        <CornerRibbon corner="top-right" />
        <CornerRibbon corner="bottom-left" />
        <CornerRibbon corner="bottom-right" />

        {/* Main content grid */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 60px", columnGap: 12, alignItems: "start" }}>
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                border: "2.5px solid #C62828",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <img
                src={jgfLogo}
                alt="JGF Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>

            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: "#C62828",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Jawahar Global Foundation
              </h1>
              <p style={{ fontSize: 15, color: "#14306b", fontWeight: 700, marginBottom: 4 }}>
                TUGHLKABAD EXTENSION NEW DELHI 110019
              </p>
              <p style={{ fontSize: 17, color: "#14306b", fontWeight: 700, marginBottom: 4 }}>
                Skill Development &amp; Vocational Training Institute
              </p>
              <p style={{ fontSize: 11.5, color: "#14306b", fontStyle: "italic", fontWeight: 600, lineHeight: 1.5 }}>
                Reg. Office: TUGHLKABAD EXTENSION NEW DELHI 110019 &nbsp;|&nbsp; Email: info@jawaharglobalfoundation.org &nbsp;|&nbsp; Contact: +91 98765 43210
              </p>
            </div>

            <div style={{ width: 60 }} />
          </div>

          {/* Body: left column / center text / right photo */}
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 90px", columnGap: 16, marginTop: 14 }}>
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: 100, flexShrink: 0 }}>
              <QRPlaceholder value={qrValue} />
              <RegistrationBadge />
              <CertifiedBadge />
              <SkillBadge />
            </div>

            {/* Center column */}
            <div style={{ textAlign: "center", padding: "0 2px" , marginTop:26, }}>
              <svg viewBox="0 0 300 46" width="100%" height="50" style={{ maxWidth: 320, margin: "0 auto", display: "block" }}>
                <defs>
                  <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F6D365" />
                    <stop offset="100%" stopColor="#E8A824" />
                  </linearGradient>
                </defs>
                <polygon points="0,8 20,23 0,38 14,23" fill="#B8860B" />
                <polygon points="300,8 280,23 300,38 286,23" fill="#B8860B" />
                <rect x="14" y="4" width="272" height="38" fill="url(#ribbonGrad)" />
                <text
                  x="150"
                  y="29"
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="900"
                  fontFamily="Georgia, 'Times New Roman', serif"
                  fill="#7B1C1C"
                  letterSpacing="2"
                >
                  Diploma
                </text>
              </svg>

              <div style={{ marginTop: 20, padding: "0 6px" }}>
                <p style={{ fontSize: 16, color: "#14306b", lineHeight: 2.1, fontWeight: 700, marginBottom: 2 }}>
                  This is to certify that Mr. / Miss. / Mrs.{" "}
                  <span style={{ ...dotted, minWidth: 190, fontSize: 19 }}>{certificate.fullName}</span>{" "}
                  {guardianRelation}
                </p>

                <p style={{ fontSize: 16, color: "#14306b", lineHeight: 2.1, fontWeight: 700, marginBottom: 10 }}>
                  <span style={{ ...dotted, minWidth: 170, fontSize: 16 }}>{guardianName}</span>{" "}
                  &nbsp;Date of Birth:{" "}
                  <span style={{ ...dotted, minWidth: 120, fontSize: 16 }}>{dob}</span>
                </p>

                <p style={{ fontSize: 16, color: "#14306b", lineHeight: 2.1, fontWeight: 700, marginBottom: 2 }}>
                  has successfully completed the course{" "}
                  <span style={{ ...dotted, minWidth: 230, fontSize: 16.5 }}>{courseTitle}</span>
                </p>

                <p style={{ fontSize: 16, color: "#14306b", lineHeight: 2.1, fontWeight: 700, marginBottom: 2 }}>
                  at{" "}
                  <span style={{ ...dotted, minWidth: 210, fontSize: 16 }}>Jawahar Global Foundation</span>{" "}
                  of duration{" "}
                  <span style={{ ...dotted, minWidth: 80, fontSize: 16 }}>{duration}</span>
                </p>

                <p style={{ fontSize: 16, color: "#14306b", lineHeight: 2.1, fontWeight: 700, marginBottom: 4 }}>
                  and has achieved the grade{" "}
                  <span style={{ ...dotted, minWidth: 70, fontSize: 18 }}>{grade}</span>
                </p>
              </div>

              {/* Enrollment / certificate details — directly under the certificate text */}
              <div
                style={{
                  marginTop: 22,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: 24,
                  rowGap: 10,
                  fontSize: 14.5,
                  textAlign: "left",
                  marginLeft:110,
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong style={{ color: "#14306b", fontWeight: 800 }}>Enrollment No :</strong>{" "}
                  <span style={{ color: "#111" }}>{enrollmentNo}</span>
                </p>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: "#14306b", fontWeight: 800 }}>certificate No. :</strong>{" "}
                  <span style={{ color: "#111" }}>{certificate.certificateNumber}</span>
                </p>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: "#14306b", fontWeight: 800 }}>Date of Issue :</strong>{" "}
                  <span style={{ color: "#111" }}>{issuedDate}</span>
                </p>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: "#14306b", fontWeight: 800 }}>Branch Code :</strong>{" "}
                  <span style={{ color: "#111" }}>{branchCode}</span>
                </p>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: "#14306b", fontWeight: 800 }}>Place :</strong>{" "}
                  <span style={{ color: "#111" }}>{place}</span>
                </p>
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 90, flexShrink: 0 }}>
              {photoUrl ? (
                <div
                  style={{
                    width: 88,
                    height: 100,
                    border: "2px solid #14306b",
                    background: "#fff",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight:160,
                  }}
                >
                  <img
                    src={photoUrl}
                    alt={certificate.fullName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      const parent = e.target.parentElement;
                      const fallback = document.createElement("div");
                      fallback.style.cssText = "font-size: 9px; color: #aaa; text-align: center; padding: 4px;";
                      fallback.textContent = "Photo not available";
                      parent.appendChild(fallback);
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: 88,
                    height: 100,
                    border: "2px dashed #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    color: "#aaa",
                    textAlign: "center",
                    padding: 4,
                  }}
                >
                  No Photo
                </div>
              )}
            </div>
          </div>

          {/* Signature row */}
          <div
            style={{
              marginTop: "auto",
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              columnGap: 24,
              alignItems: "end",
              paddingTop: 14,
              width: "100%",
              flexShrink: 0,
            }}
          >
            <div style={{ textAlign: "center", minWidth: 120 }}>
              <div style={{ width: 130, height: 1, background: "#555", margin: "0 auto 6px" }} />
              <p style={{ fontSize: 13, fontWeight: 800, color: "#14306b", margin: 0 }}>Study Center</p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 15,
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <img
                src={certifiedLogo}
                alt="Certified"
                style={{ width: 75, height: 75, objectFit: "contain", display: "block" }}
              />
              <img
                src={guaranteeLogo}
                alt="Guarantee"
                style={{ width: 75, height: 75, objectFit: "contain", display: "block" }}
              />
            </div>

            <div style={{ textAlign: "center", minWidth: 150 }}>
              <svg
                viewBox="0 0 160 45"
                width="150"
                height="42"
                style={{ display: "block", margin: "0 auto" }}
              >
                <path
                  d="M10,32 C18,10 26,10 32,26 C36,36 40,18 46,14 C52,10 54,30 60,28 C66,26 66,12 74,16 C82,20 84,34 92,30 C100,26 98,12 108,14 C116,15.5 118,26 128,22 C136,18.8 140,14 148,18"
                  fill="none"
                  stroke="#1a2a5e"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ width: 150, height: 1, background: "#555", margin: "2px auto 6px" }} />
              <p style={{ fontSize: 13, fontWeight: 800, color: "#14306b", margin: 0 }}>Director</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#14306b", margin: 0 }}>{signatoryName}</p>
            </div>
          </div>

          {/* Verify banner */}
          <div
            style={{
              marginTop: 12,
              marginLeft: "-18mm",
              marginRight: "-18mm",
              width: "calc(100% + 36mm)",
              background: "#FDE9A0",
              borderTop: "1px solid #E8C767",
              textAlign: "center",
              padding: "8px 10px",
              fontSize: 13,
              color: "#5f4b12",
              fontWeight: 800,
              position: "relative",
              zIndex: 2,
              flexShrink: 0,
            }}
          >
            This certificate may be verified online using certificate No. {certificate.certificateNumber}
          </div>
        </div>
      </div>
    </div>
  );
}