import Icon from "./Icons";
const Footer = ({ data }) => {
  const name = data?.personal?.name || "Iqra Ayyaz";
  const year = new Date().getFullYear();
  const social = data?.social || {};

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer style={{
      background: "var(--black-2)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "48px 0 32px",
    }}>
      <div className="container">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "32px",
          marginBottom: "40px",
        }}>
          {/* Brand */}
          <div>
            <a href="#home" style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem", fontWeight: 900,
              color: "var(--white)", textDecoration: "none",
              letterSpacing: "1px", display: "block",
              marginBottom: "10px",
            }}>
              {name.split(" ")[0]}
              <span style={{ color: "var(--accent)" }}>.</span>
            </a>
            <p style={{
              fontSize: "0.85rem", color: "var(--gray-4)",
              maxWidth: "260px", lineHeight: 1.7,
            }}>
              Building digital experiences with precision, passion, and purpose.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gray-3)", marginBottom: "16px" }}>Navigation</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {links.map(l => (
                <a key={l.href} href={l.href} style={{
                  fontFamily: "var(--font-body)", fontSize: "0.875rem",
                  color: "var(--gray-4)", textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.target.style.color = "var(--accent)"}
                onMouseLeave={e => e.target.style.color = "var(--gray-4)"}
                >{l.label}</a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gray-3)", marginBottom: "16px" }}>Social</div>
            <div style={{ display: "flex", gap: "10px" }}>
              {Object.entries(social).filter(([, v]) => v).map(([key, href]) => (
                <a key={key} href={href} target="_blank" rel="noopener noreferrer" style={{
                  width: "38px", height: "38px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "var(--border)", borderRadius: "var(--radius)",
                  fontFamily: "var(--font-mono)", fontSize: "9px",
                  letterSpacing: "0.5px", color: "var(--gray-4)",
                  textDecoration: "none", textTransform: "uppercase",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "var(--gray-4)";
                }}
                >{key.slice(0, 2).toUpperCase()}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "1.5px", color: "var(--gray-3)" }}>
            © {year} {name}. All rights reserved.
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "1px", color: "var(--gray-3)" }}>
            Crafted with <span style={{ color: "var(--accent)" }}>♡</span> in React
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
