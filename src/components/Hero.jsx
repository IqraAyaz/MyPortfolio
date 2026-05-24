import { useState, useEffect, useRef } from "react";
import Icon from "./Icons";

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: "2px",
      color: "var(--gray-4)",
      transition: "all 0.3s",
      textDecoration: "none",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--accent)";
      e.currentTarget.style.color = "var(--accent)";
      e.currentTarget.style.transform = "translateY(-3px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
      e.currentTarget.style.color = "var(--gray-4)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    {children}
  </a>
);

const Hero = ({ data }) => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [nextBg, setNextBg] = useState(1);
  const [bgOpacity, setBgOpacity] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const roles = data?.personal?.roles || ["Frontend Developer", "React Specialist", "UI/UX Enthusiast"];
  const images = data?.heroImages || [];
  const social = data?.social || {};

  // Typing effect
  useEffect(() => {
    const role = roles[currentRole];
    let timeout;
    if (!isDeleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentRole, roles]);

  // Background crossfade
  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setBgOpacity(1);
      setTimeout(() => {
        setCurrentBg((prev) => (prev + 1) % images.length);
        setNextBg((prev) => (prev + 1) % images.length);
        setBgOpacity(0);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Entrance animation
  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
  }, []);

  const s = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: 0,
      }}
    >
      {/* Background layers */}
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === currentBg ? (i === nextBg ? 1 : 1 - bgOpacity) : i === nextBg ? bgOpacity : 0,
            transition: "opacity 1s ease",
            zIndex: i === nextBg ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.75) 50%, rgba(8,8,8,0.88) 100%)",
          zIndex: 2,
        }}
      />

      {/* Vertical social icons */}
      <div
        style={{
          position: "absolute",
          left: "32px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          zIndex: 10,
        }}
        className="social-sidebar"
      >
        {social.github && (
          <SocialIcon href={social.github} label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </SocialIcon>
        )}
        {social.linkedin && (
          <SocialIcon href={social.linkedin} label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </SocialIcon>
        )}
        {social.twitter && (
          <SocialIcon href={social.twitter} label="Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </SocialIcon>
        )}
        {social.whatsapp && (
          <SocialIcon href={social.whatsapp} label="WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </SocialIcon>
        )}
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)",
            margin: "4px auto",
          }}
        />
      </div>

      {/* Main content */}
      <div
        className="container"
        style={{ position: "relative", zIndex: 3, paddingLeft: "96px" }}
      >
        <div style={{ maxWidth: "800px" }}>
          <div style={s(100)}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "var(--accent)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "40px",
                  height: "1px",
                  background: "var(--accent)",
                }}
              />
              Welcome to my portfolio
            </span>
          </div>

          <div style={s(200)}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: "var(--white)",
                letterSpacing: "-2px",
                marginBottom: "8px",
              }}
            >
              {data?.personal?.firstName || "Alex"}
            </h1>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: "transparent",
                WebkitTextStroke: "1.5px var(--accent)",
                letterSpacing: "-2px",
                marginBottom: "32px",
              }}
            >
              {data?.personal?.lastName || "Morgan"}
            </h1>
          </div>

          <div style={{ ...s(350), minHeight: "40px", marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
                color: "var(--gray-4)",
              }}
            >
              <span style={{ color: "var(--accent)" }}>&lt;</span>
              <span style={{ color: "var(--white)", minWidth: "280px" }}>
                {displayed}
                <span
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "1.1em",
                    background: "var(--accent)",
                    marginLeft: "2px",
                    verticalAlign: "text-bottom",
                    animation: "blink 1s step-end infinite",
                  }}
                />
              </span>
              <span style={{ color: "var(--accent)" }}>/&gt;</span>
            </div>
          </div>

          <div style={s(450)}>
            <p
              style={{
                color: "var(--gray-4)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                maxWidth: "520px",
                marginBottom: "48px",
              }}
            >
              {data?.personal?.tagline || "Building digital experiences that matter."}
            </p>
          </div>

          <div style={{ ...s(550), display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="#projects" className="btn btn-primary">
              View Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-outline">
              Hire Me
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 10,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.2s",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--gray-4)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "var(--gray-3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "40%",
              background: "var(--accent)",
              animation: "scrollDown 1.5s ease infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        @media (max-width: 768px) {
          .social-sidebar { display: none !important; }
          .container { padding-left: 20px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
