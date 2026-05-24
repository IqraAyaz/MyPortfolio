import { useState, useEffect, useRef } from "react";
import "./styles/globals.css";
import { getPortfolioData } from "./data/portfolioData";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Certificates from "./components/Certificates";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EditPanel from "./components/EditPanel";
import Icon from "./components/Icons";

const Preloader = ({ name, onDone }) => {
  const [progress, setProgress] = useState(0);
  const firstName = name?.split(" ")[0] || "Iqra";
  const lastName = name?.split(" ").slice(1).join(" ") || "Ayyaz";

  useEffect(() => {
    const ts = [
      setTimeout(() => setProgress(30), 200),
      setTimeout(() => setProgress(60), 600),
      setTimeout(() => setProgress(85), 900),
      setTimeout(() => setProgress(100), 1200),
      setTimeout(() => onDone(), 1800),
    ];
    return () => ts.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div id="preloader">
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 6vw, 3.2rem)",
          fontWeight: 900,
          color: "var(--white)",
          letterSpacing: "2px",
          lineHeight: 1.1,
          opacity: 0,
          animation: "preloaderFade 0.8s ease 0.2s forwards",
        }}>
          {firstName}
          <span style={{ color: "var(--accent)" }}> {lastName}</span>
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "4px",
          color: "var(--gray-3)",
          textTransform: "uppercase",
          marginTop: "10px",
          opacity: 0,
          animation: "preloaderFade 0.8s ease 0.5s forwards",
        }}>Portfolio</div>
      </div>
      <div className="preloader-bar" style={{ marginTop: "32px" }} />
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        letterSpacing: "3px",
        color: "var(--gray-3)",
        textTransform: "uppercase",
        marginTop: "12px",
        opacity: 0,
        animation: "preloaderFade 0.5s ease 0.7s forwards",
      }}>{progress}%</div>
    </div>
  );
};

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf;
    
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
        dotRef.current.style.opacity = "1";
      }
    };
    
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      rx = lerp(rx, mx, 0.12); ry = lerp(ry, my, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    // Use event delegation — works for ALL elements including dynamically added ones
    const onOver = (e) => {
      const el = e.target.closest("a, button, input, textarea, select, [role='button'], label");
      if (el) ringRef.current?.classList.add("hovered");
      else ringRef.current?.classList.remove("hovered");
    };
    const onOut = (e) => {
      const el = e.target.closest("a, button, input, textarea, select, [role='button'], label");
      if (el) ringRef.current?.classList.remove("hovered");
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} style={{ opacity: 0 }} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
};

const Divider = () => (
  <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,var(--gray-2) 30%,var(--gray-2) 70%,transparent)", opacity: 0.4 }} />
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(getPortfolioData());
  // blogPostId: null = main portfolio, number = show that blog post
  const [blogPostId, setBlogPostId] = useState(null);

  useEffect(() => {
    document.title = `${portfolioData.personal?.name || "Iqra Ayyaz"} — Portfolio`;
  }, [portfolioData.personal?.name]);

  const vis = portfolioData.sectionVisibility || {};

  const openPost = (id) => { setBlogPostId(id); window.scrollTo(0, 0); };
  const closePost = () => { setBlogPostId(null); };

  if (loading) {
    return <Preloader name={portfolioData.personal?.name} onDone={() => setLoading(false)} />;
  }

  // Blog post page
  if (blogPostId !== null) {
    const post = (portfolioData.blog || []).find(p => p.id === blogPostId);
    return (
      <>
        <CustomCursor />
        <BlogPost post={post} data={portfolioData} onBack={closePost} onOpenPost={openPost} />
        <Footer data={portfolioData} />
        <a href={portfolioData.social?.whatsapp} target="_blank" rel="noopener noreferrer" className="whatsapp-float" title="Chat on WhatsApp">
          <Icon name="whatsapp" size={24} color="white" />
        </a>
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <Navbar data={portfolioData} />
      <main>
        <Hero data={portfolioData} />
        {vis.about !== false && <><Divider /><About data={portfolioData} /></>}
        {vis.skills !== false && <><Divider /><Skills data={portfolioData} /></>}
        {vis.projects !== false && <><Divider /><Projects data={portfolioData} /></>}
        {vis.testimonials !== false && <><Divider /><Testimonials data={portfolioData} /></>}
        {vis.certificates !== false && <><Divider /><Certificates data={portfolioData} /></>}
        {vis.blog !== false && <><Divider /><Blog data={portfolioData} onOpenPost={openPost} /></>}
        {vis.contact !== false && <><Divider /><Contact data={portfolioData} /></>}
      </main>
      <Footer data={portfolioData} />
      <a href={portfolioData.social?.whatsapp} target="_blank" rel="noopener noreferrer" className="whatsapp-float" title="Chat on WhatsApp">
        <Icon name="whatsapp" size={24} color="white" />
      </a>
      <EditPanel data={portfolioData} onDataChange={setPortfolioData} />
    </>
  );
}
