import { useState, useEffect } from "react";
import Icon from "./Icons";
import { useScrollReveal } from "../hooks/useScrollReveal";

const SkeletonCard = () => (
  <div style={{
    border: "var(--border)", borderRadius: "var(--radius)",
    background: "var(--black-3)", overflow: "hidden",
  }}>
    <div style={{ height: "200px", background: "var(--gray-1)", animation: "shimmer 1.5s infinite" }} />
    <div style={{ padding: "20px" }}>
      <div style={{ height: "16px", width: "60%", background: "var(--gray-1)", borderRadius: "2px", marginBottom: "10px", animation: "shimmer 1.5s infinite 0.1s" }} />
      <div style={{ height: "12px", width: "80%", background: "var(--gray-1)", borderRadius: "2px", marginBottom: "8px", animation: "shimmer 1.5s infinite 0.2s" }} />
      <div style={{ height: "12px", width: "40%", background: "var(--gray-1)", borderRadius: "2px", animation: "shimmer 1.5s infinite 0.3s" }} />
    </div>
  </div>
);

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(8px)",
        zIndex: 9000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--black-3)",
          border: "var(--border-accent)",
          borderRadius: "var(--radius-md)",
          maxWidth: "720px",
          width: "100%",
          maxHeight: "88vh",
          overflow: "auto",
          animation: "slideUp 0.3s ease",
        }}
      >
        <div style={{ position: "relative" }}>
          <img src={project.image} alt={project.title} style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }} />
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "16px", right: "16px",
              background: "rgba(8,8,8,0.8)", border: "var(--border)",
              borderRadius: "50%", width: "36px", height: "36px",
              color: "var(--white)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", transition: "all 0.2s",
            }}
          >✕</button>
        </div>
        <div style={{ padding: "32px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
            {project.tags?.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "var(--white)", marginBottom: "16px" }}>{project.title}</h3>
          <p style={{ color: "var(--gray-4)", lineHeight: 1.8, marginBottom: "24px" }}>{project.description}</p>
          <div style={{ marginBottom: "28px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", color: "var(--accent)", textTransform: "uppercase", marginBottom: "12px" }}>Tech Stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {project.techStack?.map(t => (
                <span key={t} style={{
                  padding: "5px 14px",
                  fontFamily: "var(--font-mono)", fontSize: "11px",
                  background: "rgba(232,224,200,0.06)",
                  border: "1px solid rgba(232,224,200,0.12)",
                  color: "var(--white)", borderRadius: "var(--radius)",
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: "11px", padding: "12px 24px" }}>Live Demo</a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: "11px", padding: "12px 24px" }}>GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onClick, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "var(--border)",
        borderRadius: "var(--radius)",
        background: "var(--black-3)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.35s",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? "var(--shadow-lg)" : "none",
        borderColor: hovered ? "rgba(232,224,200,0.2)" : "rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", height: "220px" }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            display: "block",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(8,8,8,0.75)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "12px",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            letterSpacing: "3px", textTransform: "uppercase",
            color: "var(--accent)",
          }}>Click to view</div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        </div>
        {project.isGithub && (
          <div style={{
            position: "absolute", top: "12px", right: "12px",
            background: "rgba(8,8,8,0.85)", border: "var(--border)",
            borderRadius: "var(--radius)", padding: "4px 8px",
            fontFamily: "var(--font-mono)", fontSize: "9px",
            letterSpacing: "1.5px", color: "var(--accent)",
            textTransform: "uppercase",
          }}>GitHub</div>
        )}
      </div>
      <div style={{ padding: "20px 22px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
          {project.tags?.slice(0, 3).map(t => <span key={t} className="tag" style={{ fontSize: "9px" }}>{t}</span>)}
        </div>
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700,
          color: "var(--white)", marginBottom: "8px",
        }}>{project.title}</h3>
        <p style={{
          fontSize: "0.825rem", color: "var(--gray-4)", lineHeight: 1.6,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{project.description}</p>
      </div>
    </div>
  );
};

const Projects = ({ data }) => {
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [githubProjects, setGithubProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  const localProjects = data?.projects || [];
  const categories = ["All", ...new Set(localProjects.map(p => p.category))];

  // GitHub API
  useEffect(() => {
    const githubUsername = data?.social?.github?.split("/").pop();
    if (!githubUsername || githubUsername === "github.com" || githubUsername === "") return;
    setLoading(true);
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=stars&per_page=3`)
      .then(r => r.json())
      .then(repos => {
        if (Array.isArray(repos)) {
          const mapped = repos.slice(0, 3).map(repo => ({
            id: `gh-${repo.id}`,
            title: repo.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || "No description provided.",
            image: `https://gh-card.dev/repos/${githubUsername}/${repo.name}.png`,
            tags: repo.topics?.slice(0, 3) || ["Open Source"],
            category: "GitHub",
            liveUrl: repo.homepage || "#",
            githubUrl: repo.html_url,
            techStack: [repo.language].filter(Boolean),
            isGithub: true,
          }));
          setGithubProjects(mapped);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [data?.social?.github]);

  const allProjects = [...localProjects, ...githubProjects];
  const githubCategories = githubProjects.length > 0 ? ["GitHub"] : [];
  const allCategories = ["All", ...new Set(localProjects.map(p => p.category)), ...githubCategories];
  const filtered = filter === "All" ? allProjects : allProjects.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ background: "var(--black-2)" }}>
      <div className="container">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`} style={{ marginBottom: "64px" }}>
          <div className="section-label">Portfolio</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Selected <span>Projects</span><br />& Work</h2>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: "8px 18px",
                    fontFamily: "var(--font-mono)", fontSize: "10px",
                    letterSpacing: "2px", textTransform: "uppercase",
                    background: filter === cat ? "var(--accent)" : "transparent",
                    color: filter === cat ? "var(--black)" : "var(--gray-4)",
                    border: filter === cat ? "1.5px solid var(--accent)" : "1.5px solid rgba(255,255,255,0.1)",
                    borderRadius: "var(--radius)", cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >{cat}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {loading && [1, 2, 3].map(i => <SkeletonCard key={i} />)}
          {filtered.map((project, i) => (
            <div
              key={project.id}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
              }}
            >
              <ProjectCard project={project} onClick={setModal} />
            </div>
          ))}
        </div>
      </div>

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}

      <style>{`
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
