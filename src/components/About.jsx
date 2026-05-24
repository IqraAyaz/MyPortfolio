import { useScrollReveal } from "../hooks/useScrollReveal";
import Icon from "./Icons";

const StatCard = ({ value, label }) => (
  <div style={{
    textAlign: "center",
    padding: "24px 16px",
    border: "var(--border)",
    borderRadius: "var(--radius)",
    background: "var(--black-3)",
    flex: "1 1 100px",
    minWidth: "100px",
  }}>
    <div style={{
      fontFamily: "var(--font-display)",
      fontSize: "2rem",
      fontWeight: 900,
      color: "var(--accent)",
      lineHeight: 1,
      marginBottom: "6px",
    }}>{value}</div>
    <div style={{
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "var(--gray-4)",
    }}>{label}</div>
  </div>
);

const EducationCard = ({ degree, institution, year, description }) => {
  return (
    <div style={{
      padding: "24px",
      border: "var(--border)",
      borderRadius: "var(--radius)",
      background: "var(--black-3)",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "rgba(232,224,200,0.25)";
      e.currentTarget.style.transform = "translateY(-4px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "3px", height: "100%",
        background: "var(--accent)",
      }} />
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        letterSpacing: "2px",
        color: "var(--accent)",
        marginBottom: "8px",
        textTransform: "uppercase",
      }}>{year}</div>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.1rem",
        fontWeight: 700,
        color: "var(--white)",
        marginBottom: "4px",
      }}>{degree}</div>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--gray-4)",
        marginBottom: "12px",
        letterSpacing: "1px",
      }}>{institution}</div>
      <div style={{
        fontSize: "0.875rem",
        color: "var(--gray-5)",
        lineHeight: 1.6,
      }}>{description}</div>
    </div>
  );
};

const About = ({ data }) => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal();
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal();
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();

  const personal = data?.personal || {};
  const stats = data?.stats || [];
  const education = data?.education || [];

  return (
    <section id="about" style={{ background: "var(--black-2)" }}>
      <div className="container">
        <div
          ref={leftRef}
          className={`reveal ${leftVisible ? "visible" : ""}`}
          style={{ marginBottom: "72px" }}
        >
          <div className="section-label">About Me</div>
          <h2 className="section-title" style={{ marginBottom: "0" }}>
            The Person <span>Behind</span><br />the Code
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "80px",
          alignItems: "start",
        }} className="about-grid">

          {/* Left - Photo */}
          <div
            ref={leftRef}
            className={`reveal-left ${leftVisible ? "visible" : ""}`}
          >
            <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
              <div style={{
                position: "absolute",
                top: "16px", left: "16px",
                right: "-16px", bottom: "-16px",
                border: "1px solid rgba(232,224,200,0.2)",
                borderRadius: "var(--radius)",
                zIndex: 0,
              }} />
              <div style={{
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
                borderRadius: "var(--radius)",
                aspectRatio: "3/4",
              }}>
                <img
                  src={personal.profilePhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"}
                  alt={personal.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "grayscale(20%)",
                    transition: "filter 0.4s, transform 0.4s",
                  }}
                  onMouseEnter={e => {
                    e.target.style.filter = "grayscale(0%)";
                    e.target.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={e => {
                    e.target.style.filter = "grayscale(20%)";
                    e.target.style.transform = "scale(1)";
                  }}
                />
                <div style={{
                  position: "absolute",
                  bottom: "20px", left: "20px",
                  background: "rgba(8,8,8,0.9)",
                  border: "var(--border-accent)",
                  borderRadius: "var(--radius)",
                  padding: "10px 16px",
                  backdropFilter: "blur(10px)",
                }}>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    color: "var(--accent)",
                    textTransform: "uppercase",
                  }}>Available for work</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                    <div style={{
                      width: "6px", height: "6px",
                      background: "#22c55e",
                      borderRadius: "50%",
                      animation: "pulse 2s infinite",
                    }} />
                    <span style={{ fontSize: "0.75rem", color: "var(--gray-5)" }}>Open to opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div
            ref={rightRef}
            className={`reveal-right ${rightVisible ? "visible" : ""}`}
          >
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "var(--white)",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}>
              {personal.name || "Alex Morgan"}
            </h3>
            <p style={{
              color: "var(--gray-4)",
              lineHeight: 1.8,
              marginBottom: "32px",
              fontSize: "0.975rem",
            }}>
              {personal.bio || "I am a passionate frontend developer with experience in building responsive and user-friendly websites using modern technologies."}
            </p>

            {/* Info rows */}
            <div style={{ marginBottom: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
              {[
                ["Location", personal.location || "San Francisco, CA"],
                ["Email", personal.email || "alex@example.com"],
                ["Phone", personal.phone || "+1 (555) 000-0000"],
                ["Status", "Available for hire"],
              ].map(([k, v]) => (
                <div key={k} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", color: "var(--accent)", textTransform: "uppercase", marginBottom: "3px" }}>{k}</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--gray-5)" }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div style={{ marginBottom: "36px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "2px", color: "var(--gray-3)", textTransform: "uppercase", marginBottom: "16px" }}>Education</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {education.map(ed => (
                  <EducationCard key={ed.id} {...ed} />
                ))}
              </div>
            </div>

            <a
              href={personal.cvUrl || "#"}
              className="btn btn-outline"
              download
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download CV
            </a>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className={`reveal ${statsVisible ? "visible" : ""}`}
          style={{ marginTop: "72px" }}
        >
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {stats.map((stat, i) => (
              <StatCard key={i} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
