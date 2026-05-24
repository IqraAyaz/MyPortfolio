import { useState, useEffect } from "react";

const ALL_LINKS = [
  { label: "Home",         href: "#home",         key: "home" },
  { label: "About",        href: "#about",        key: "about" },
  { label: "Skills",       href: "#skills",       key: "skills" },
  { label: "Projects",     href: "#projects",     key: "projects" },
  { label: "Testimonials", href: "#testimonials", key: "testimonials" },
  { label: "Certificates", href: "#certificates", key: "certificates" },
  { label: "Blog",         href: "#blog",         key: "blog" },
  { label: "Contact",      href: "#contact",      key: "contact" },
];

const Navbar = ({ data }) => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const vis   = data?.sectionVisibility || {};
  // Always show Home; filter rest by visibility
  const links = ALL_LINKS.filter(l => l.key === "home" || vis[l.key] !== false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = links.map(l => l.key === "home" ? "home" : l.key);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [links]);

  const firstName = data?.personal?.firstName || "Iqra";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? "12px 0" : "20px 0",
      background: scrolled ? "rgba(8,8,8,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
    }}>
      <div className="container" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        {/* Logo */}
        <a href="#home" style={{
          fontFamily:"var(--font-display)", fontSize:"1.4rem", fontWeight:900,
          color:"var(--white)", textDecoration:"none", letterSpacing:"1px",
        }}>
          {firstName}<span style={{ color:"var(--accent)" }}>.</span>
        </a>

        {/* Desktop links */}
        <ul style={{ display:"flex", gap:"28px", listStyle:"none", alignItems:"center" }} className="desktop-nav">
          {links.filter(l => l.key !== "home").map(link => (
            <li key={link.key}>
              <a href={link.href} style={{
                fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"2px",
                textTransform:"uppercase", textDecoration:"none",
                color: active === link.key ? "var(--accent)" : "var(--gray-4)",
                transition:"color 0.3s", position:"relative", paddingBottom:"4px",
              }}
              onMouseEnter={e => e.target.style.color = "var(--white)"}
              onMouseLeave={e => e.target.style.color = active === link.key ? "var(--accent)" : "var(--gray-4)"}
              >
                {link.label}
                {active === link.key && (
                  <span style={{ position:"absolute", bottom:0, left:0, right:0, height:"1px", background:"var(--accent)" }} />
                )}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn-primary nav-hire" style={{ padding:"10px 24px", fontSize:"11px" }}>Hire Me</a>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display:"none", flexDirection:"column", gap:"5px", background:"none", border:"none", cursor:"pointer", padding:"4px" }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display:"block", width:"24px", height:"1.5px", background:"var(--white)", transition:"all 0.3s",
              transform: menuOpen && i===0 ? "rotate(45deg) translate(5px,5px)"
                       : menuOpen && i===2 ? "rotate(-45deg) translate(5px,-5px)"
                       : menuOpen && i===1 ? "scaleX(0)" : "none",
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position:"fixed", inset:0, background:"rgba(8,8,8,0.97)", backdropFilter:"blur(20px)",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          gap:"32px", zIndex:999,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position:"absolute", top:"24px", right:"24px", background:"none", border:"none",
            color:"var(--white)", fontSize:"28px", cursor:"pointer",
          }}>✕</button>
          {links.map(link => (
            <a key={link.key} href={link.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily:"var(--font-display)", fontSize:"2rem", fontWeight:700,
              color: active === link.key ? "var(--accent)" : "var(--white)",
              textDecoration:"none", transition:"color 0.3s",
            }}>{link.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width:900px) {
          .desktop-nav { display:none !important; }
          .nav-hire { display:none !important; }
          .hamburger { display:flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
