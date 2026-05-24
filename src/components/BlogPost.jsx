import { useEffect } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Icon from "./Icons";

/**
 * Renders blog post content with markdown-like formatting.
 * Supports: ## headings, ``` code blocks, plain paragraphs.
 */
const renderContent = (content) => {
  if (!content) return null;
  const blocks = content.split("\n\n").filter(Boolean);

  return blocks.map((block, i) => {
    // Code block
    if (block.startsWith("```")) {
      const code = block.replace(/^```[a-z]*\n?/, "").replace(/```$/, "");
      return (
        <pre key={i} style={{
          background:"var(--black-4)", border:"var(--border)",
          borderRadius:"var(--radius-md)", padding:"20px 24px",
          overflowX:"auto", margin:"24px 0",
          fontFamily:"var(--font-mono)", fontSize:"0.83rem",
          lineHeight:1.7, color:"var(--gray-5)",
        }}>
          <code>{code}</code>
        </pre>
      );
    }
    // H2 heading
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} style={{
          fontFamily:"var(--font-display)", fontSize:"clamp(1.4rem,3vw,1.8rem)",
          fontWeight:700, color:"var(--white)", margin:"40px 0 16px",
          lineHeight:1.2,
        }}>{block.replace("## ", "")}</h2>
      );
    }
    // H3 heading
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} style={{
          fontFamily:"var(--font-display)", fontSize:"1.2rem",
          fontWeight:700, color:"var(--white)", margin:"28px 0 12px",
        }}>{block.replace("### ", "")}</h3>
      );
    }
    // Paragraph
    return (
      <p key={i} style={{
        fontSize:"1.02rem", color:"var(--gray-4)", lineHeight:1.85,
        margin:"0 0 20px",
      }}>{block}</p>
    );
  });
};

const BlogPost = ({ post, data, onBack, onOpenPost }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
  const allPosts = data?.blog || [];
  const others = allPosts.filter(p => p.id !== post?.id).slice(0, 3);

  useEffect(() => {
    document.title = `${post?.title || "Blog"} — ${data?.personal?.name || "Portfolio"}`;
    return () => {
      document.title = `${data?.personal?.name || "Portfolio"}`;
    };
  }, [post?.title, data?.personal?.name]);

  if (!post) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"24px" }}>
        <div style={{ fontFamily:"var(--font-mono)", color:"var(--gray-3)", fontSize:"12px", letterSpacing:"3px" }}>POST NOT FOUND</div>
        <button onClick={onBack} className="btn btn-outline">Back to Portfolio</button>
      </div>
    );
  }

  const firstName = data?.personal?.firstName || "Iqra";

  return (
    <>
      {/* Sticky nav for blog post */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        padding:"14px 0",
        background:"rgba(8,8,8,0.92)", backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,0.06)",
      }}>
        <div className="container" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={onBack} style={{
            display:"flex", alignItems:"center", gap:"8px",
            background:"none", border:"none", cursor:"pointer",
            fontFamily:"var(--font-mono)", fontSize:"11px",
            letterSpacing:"2px", textTransform:"uppercase",
            color:"var(--gray-4)", transition:"color 0.3s",
            padding:0,
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--gray-4)"}
          >
            <Icon name="chevronLeft" size={16} color="currentColor" />
            Back
          </button>
          <a href="#home" onClick={onBack} style={{
            fontFamily:"var(--font-display)", fontSize:"1.2rem", fontWeight:900,
            color:"var(--white)", textDecoration:"none",
          }}>
            {firstName}<span style={{ color:"var(--accent)" }}>.</span>
          </a>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"2px", color:"var(--gray-3)", textTransform:"uppercase" }}>
            {post.readTime}
          </div>
        </div>
      </nav>

      {/* Hero banner */}
      <div style={{ position:"relative", height:"clamp(320px,50vw,520px)", overflow:"hidden", marginTop:"56px" }}>
        <img src={post.thumbnail} alt={post.title} style={{
          width:"100%", height:"100%", objectFit:"cover", display:"block",
          filter:"grayscale(20%)",
        }}/>
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.85) 100%)",
        }}/>
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, padding:"48px",
        }} className="post-hero-content">
          {/* Tags */}
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"16px" }}>
            {(post.tags || []).map(t => (
              <span key={t} className="tag" style={{ fontSize:"9px" }}>{t}</span>
            ))}
          </div>
          <h1 style={{
            fontFamily:"var(--font-display)",
            fontSize:"clamp(1.8rem,4.5vw,3.2rem)",
            fontWeight:900, color:"var(--white)",
            lineHeight:1.15, maxWidth:"800px", marginBottom:"20px",
          }}>{post.title}</h1>
          <div style={{ display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
              <Icon name="calendar" size={14} color="var(--accent)" />
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"1.5px", color:"var(--gray-5)" }}>{post.date}</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
              <Icon name="clock" size={14} color="var(--accent)" />
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"1.5px", color:"var(--gray-5)" }}>{post.readTime}</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
              <Icon name="user" size={14} color="var(--accent)" />
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"1.5px", color:"var(--gray-5)" }}>{data?.personal?.name || "Iqra Ayyaz"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div style={{ background:"var(--black-2)", minHeight:"50vh" }}>
        <div style={{ maxWidth:"760px", margin:"0 auto", padding:"64px 48px" }} className="post-body">
          {/* Excerpt lead */}
          <p style={{
            fontSize:"1.15rem", color:"var(--white)", lineHeight:1.75,
            fontStyle:"italic", borderLeft:"3px solid var(--accent)",
            paddingLeft:"20px", margin:"0 0 40px",
          }}>{post.excerpt}</p>

          <div style={{ width:"100%", height:"1px", background:"linear-gradient(90deg, var(--accent) 0%, transparent 100%)", marginBottom:"40px", opacity:0.3 }}/>

          {/* Rendered content */}
          <div>{renderContent(post.content)}</div>

          {/* Share / back row */}
          <div style={{
            marginTop:"60px", paddingTop:"32px",
            borderTop:"1px solid rgba(255,255,255,0.06)",
            display:"flex", justifyContent:"space-between", alignItems:"center",
            flexWrap:"wrap", gap:"16px",
          }}>
            <button onClick={onBack} style={{
              display:"flex", alignItems:"center", gap:"8px",
              fontFamily:"var(--font-mono)", fontSize:"11px",
              letterSpacing:"2px", textTransform:"uppercase",
              background:"none", border:"1.5px solid rgba(255,255,255,0.15)",
              borderRadius:"var(--radius)", padding:"10px 20px",
              color:"var(--gray-4)", cursor:"pointer", transition:"all 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "var(--gray-4)";
            }}
            >
              <Icon name="chevronLeft" size={14} color="currentColor" />
              All Posts
            </button>
            <div style={{ display:"flex", gap:"10px" }}>
              {data?.social?.twitter && (
                <a href={`${data.social.twitter}`} target="_blank" rel="noopener noreferrer" style={{
                  width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center",
                  border:"var(--border)", borderRadius:"var(--radius)", color:"var(--gray-4)",
                  textDecoration:"none", transition:"all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.color="var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.color="var(--gray-4)"; }}
                ><Icon name="twitter" size={14} color="currentColor" /></a>
              )}
              {data?.social?.linkedin && (
                <a href={`${data.social.linkedin}`} target="_blank" rel="noopener noreferrer" style={{
                  width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center",
                  border:"var(--border)", borderRadius:"var(--radius)", color:"var(--gray-4)",
                  textDecoration:"none", transition:"all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.color="var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.color="var(--gray-4)"; }}
                ><Icon name="linkedin" size={14} color="currentColor" /></a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* More posts */}
      {others.length > 0 && (
        <div style={{ background:"var(--black)", padding:"80px 0" }}>
          <div className="container">
            <div ref={ref} className={`reveal ${isVisible?"visible":""}`}>
              <div className="section-label">More Reading</div>
              <h2 className="section-title" style={{ marginBottom:"40px" }}>More <span>Articles</span></h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"20px" }}>
              {others.map((p, i) => (
                <button key={p.id} onClick={() => { onOpenPost(p.id); window.scrollTo(0,0); }}
                  style={{
                    textAlign:"left", background:"var(--black-3)", border:"var(--border)",
                    borderRadius:"var(--radius)", overflow:"hidden", cursor:"pointer",
                    transition:"all 0.3s", padding:0,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${i*100}ms`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(232,224,200,0.2)"; e.currentTarget.style.transform="translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.transform="translateY(0)"; }}
                >
                  <img src={p.thumbnail} alt={p.title} style={{ width:"100%", height:"160px", objectFit:"cover", display:"block" }}/>
                  <div style={{ padding:"18px 20px" }}>
                    <div style={{ display:"flex", gap:"10px", marginBottom:"10px" }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"1.5px", color:"var(--accent)", textTransform:"uppercase" }}>{p.date}</span>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"var(--gray-3)" }}>· {p.readTime}</span>
                    </div>
                    <div style={{ fontFamily:"var(--font-display)", fontSize:"1rem", fontWeight:700, color:"var(--white)", lineHeight:1.3 }}>{p.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .post-hero-content { padding: 24px 20px !important; }
          .post-body { padding: 40px 20px !important; }
        }
      `}</style>
    </>
  );
};

export default BlogPost;
