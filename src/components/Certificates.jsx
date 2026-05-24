import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Icon from "./Icons";

/* ─── Certificate Modal ─────────────────────────────── */
const CertModal = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--black-3)", border: "1px solid rgba(232,224,200,0.18)",
          borderRadius: "var(--radius)", maxWidth: "680px", width: "100%",
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
          animation: "slideUp 0.25s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        {/* Close button */}
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 20px 0" }}>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50%", width: "32px", height: "32px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--gray-4)", fontSize: "16px",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,224,200,0.12)"; e.currentTarget.style.color = "var(--white)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--gray-4)"; }}
          >
            ✕
          </button>
        </div>

        {/* Certificate image */}
        <div style={{ padding: "0 24px", marginBottom: "24px" }}>
          <img
            src={cert.image}
            alt={cert.title}
            style={{
              width: "100%", borderRadius: "8px",
              border: "1px solid rgba(232,224,200,0.12)",
              display: "block",
            }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: "0 24px 28px" }}>
          {/* Category badge */}
          <div style={{
            display: "inline-block",
            background: "rgba(8,8,8,0.85)", border: "var(--border-accent)",
            borderRadius: "var(--radius)", padding: "4px 10px",
            fontFamily: "var(--font-mono)", fontSize: "9px",
            letterSpacing: "1.5px", textTransform: "uppercase",
            color: "var(--accent)", marginBottom: "14px",
          }}>{cert.category}</div>

          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700,
            color: "var(--white)", marginBottom: "8px", lineHeight: 1.3,
          }}>{cert.title}</h2>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
            <div style={{ width: "16px", height: "1px", background: "var(--accent)" }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "10px",
              letterSpacing: "1.5px", color: "var(--accent)", textTransform: "uppercase",
            }}>{cert.issuer}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Icon name="calendar" size={12} color="var(--gray-4)" />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--gray-4)", letterSpacing: "1px" }}>{cert.date}</span>
            </div>
            {cert.credentialId && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--gray-3)", letterSpacing: "1px" }}>
                ID: {cert.credentialId}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </div>
  );
};

/* ─── Certificate Card ──────────────────────────────── */
const CertCard = ({ cert, delay, visible, onVerify }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "var(--border)", borderRadius: "var(--radius)",
        background: "var(--black-3)", overflow: "hidden",
        transition: "all 0.35s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
        borderColor: hovered ? "rgba(232,224,200,0.22)" : "rgba(255,255,255,0.08)",
        boxShadow: hovered ? "var(--shadow-lg)" : "none",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <img src={cert.image} alt={cert.title} style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          filter: "grayscale(30%)",
          transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}
          onMouseEnter={e => e.target.style.filter = "grayscale(0%)"}
          onMouseLeave={e => e.target.style.filter = "grayscale(30%)"}
        />
        {/* Category badge */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          background: "rgba(8,8,8,0.85)", border: "var(--border-accent)",
          borderRadius: "var(--radius)", padding: "4px 10px",
          fontFamily: "var(--font-mono)", fontSize: "9px",
          letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--accent)",
        }}>{cert.category}</div>
        {/* Award icon */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          width: "32px", height: "32px", background: "rgba(8,8,8,0.85)",
          border: "var(--border-accent)", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="award" size={15} color="var(--accent)" />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 22px" }}>
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700,
          color: "var(--white)", marginBottom: "6px", lineHeight: 1.3,
        }}>{cert.title}</h3>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
          <div style={{ width: "16px", height: "1px", background: "var(--accent)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "1.5px", color: "var(--accent)", textTransform: "uppercase" }}>{cert.issuer}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Icon name="calendar" size={12} color="var(--gray-4)" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--gray-4)", letterSpacing: "1px" }}>{cert.date}</span>
          </div>
          {cert.credentialId && (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--gray-3)", letterSpacing: "1px" }}>
              ID: {cert.credentialId}
            </div>
          )}
        </div>

        {/* Verify button — opens modal, no redirect */}
        <button
          onClick={() => onVerify(cert)}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px",
            textTransform: "uppercase", color: "var(--accent)",
            padding: "8px 16px", border: "1px solid rgba(232,224,200,0.2)",
            borderRadius: "var(--radius)", cursor: "pointer", transition: "all 0.3s",
            background: "rgba(232,224,200,0.04)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(232,224,200,0.1)";
            e.currentTarget.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(232,224,200,0.04)";
            e.currentTarget.style.borderColor = "rgba(232,224,200,0.2)";
          }}
        >
          Verify
          <Icon name="externalLink" size={11} color="currentColor" />
        </button>
      </div>
    </div>
  );
};

/* ─── Certificates Section ──────────────────────────── */
const Certificates = ({ data }) => {
  const [filter, setFilter] = useState("All");
  const [activeCert, setActiveCert] = useState(null);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });

  const certs = data?.certificates || [];
  const categories = ["All", ...new Set(certs.map(c => c.category))];
  const filtered = filter === "All" ? certs : certs.filter(c => c.category === filter);

  return (
    <>
      <section id="certificates" style={{ background: "var(--black)" }}>
        <div className="container">
          <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`} style={{ marginBottom: "64px" }}>
            <div className="section-label">Credentials</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Certificates &amp; <span>Credentials</span>
              </h2>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setFilter(cat)} style={{
                    padding: "8px 18px", fontFamily: "var(--font-mono)", fontSize: "10px",
                    letterSpacing: "2px", textTransform: "uppercase",
                    background: filter === cat ? "var(--accent)" : "transparent",
                    color: filter === cat ? "var(--black)" : "var(--gray-4)",
                    border: filter === cat ? "1.5px solid var(--accent)" : "1.5px solid rgba(255,255,255,0.1)",
                    borderRadius: "var(--radius)", cursor: "pointer", transition: "all 0.3s",
                  }}>{cat}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "20px" }}>
            {filtered.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} delay={i * 80} visible={isVisible} onVerify={setActiveCert} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--gray-3)", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "2px" }}>
              NO CERTIFICATES IN THIS CATEGORY
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {activeCert && <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />}
    </>
  );
};

export default Certificates;
