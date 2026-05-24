import { useState, useEffect, useRef } from "react";
import Icon from "./Icons";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Stars = ({ count = 5 }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[...Array(count)].map((_, i) => (
      <Icon key={i} name="star" size={14} color="var(--accent)" />
    ))}
  </div>
);

const TestimonialCard = ({ name, role, avatar, quote, stars }) => (
  <div style={{
    minWidth: "380px",
    maxWidth: "380px",
    padding: "36px",
    border: "var(--border)",
    borderRadius: "var(--radius)",
    background: "var(--black-3)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    flexShrink: 0,
    position: "relative",
  }}>
    {/* Quote mark */}
    <div style={{
      position: "absolute", top: "20px", right: "28px",
      fontFamily: "var(--font-display)",
      fontSize: "5rem", lineHeight: 1,
      color: "rgba(232,224,200,0.06)",
      fontWeight: 900,
      userSelect: "none",
    }}>"</div>

    <Stars count={stars} />

    <p style={{
      fontSize: "0.925rem",
      color: "var(--gray-4)",
      lineHeight: 1.8,
      fontStyle: "italic",
      flexGrow: 1,
    }}>"{quote}"</p>

    <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <img src={avatar} alt={name} style={{
        width: "44px", height: "44px",
        borderRadius: "50%", objectFit: "cover",
        border: "2px solid rgba(232,224,200,0.2)",
      }} />
      <div>
        <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--white)" }}>{name}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "1.5px", color: "var(--gray-4)", textTransform: "uppercase" }}>{role}</div>
      </div>
    </div>
  </div>
);

const Testimonials = ({ data }) => {
  const { ref, isVisible } = useScrollReveal();
  const trackRef = useRef(null);
  const testimonials = data?.testimonials || [];

  // Duplicate for infinite loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" style={{ background: "var(--black)", overflow: "hidden" }}>
      <div className="container">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`} style={{ marginBottom: "64px" }}>
          <div className="section-label">Testimonials</div>
          <h2 className="section-title">What Clients <span>Say</span></h2>
        </div>
      </div>

      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Fade edges */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: "120px", height: "100%",
          background: "linear-gradient(90deg, var(--black), transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "120px", height: "100%",
          background: "linear-gradient(-90deg, var(--black), transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />

        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "20px",
            padding: "8px 0 16px",
            animation: "scrollLeft 35s linear infinite",
            width: "max-content",
          }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = "paused"}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = "running"}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
