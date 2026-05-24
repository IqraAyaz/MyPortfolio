import { useScrollReveal } from "../hooks/useScrollReveal";
import Icon from "./Icons";

const BlogCard = ({ post, onOpenPost, delay, visible }) => (
  <button
    onClick={() => onOpenPost(post.id)}
    style={{
      textAlign:"left", display:"block", width:"100%",
      border:"var(--border)", borderRadius:"var(--radius)",
      background:"var(--black-3)", overflow:"hidden",
      transition:`all 0.35s ${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      cursor:"pointer", padding:0,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.borderColor = "rgba(232,224,200,0.2)";
      e.currentTarget.style.boxShadow = "var(--shadow-lg)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <div style={{ overflow:"hidden", height:"210px", position:"relative" }}>
      <img src={post.thumbnail} alt={post.title} style={{
        width:"100%", height:"100%", objectFit:"cover", display:"block",
        transition:"transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
      onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
      onMouseLeave={e => e.target.style.transform = "scale(1)"}/>
      {/* Tags overlay */}
      <div style={{ position:"absolute", top:"12px", left:"12px", display:"flex", gap:"5px", flexWrap:"wrap" }}>
        {(post.tags || []).slice(0,2).map(t => (
          <span key={t} style={{
            fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"1.5px",
            textTransform:"uppercase", padding:"3px 8px",
            background:"rgba(8,8,8,0.85)", border:"1px solid rgba(232,224,200,0.2)",
            color:"var(--accent)", borderRadius:"var(--radius)",
          }}>{t}</span>
        ))}
      </div>
    </div>
    <div style={{ padding:"22px 24px" }}>
      <div style={{ display:"flex", gap:"14px", alignItems:"center", marginBottom:"12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
          <Icon name="calendar" size={12} color="var(--accent)" />
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"1.5px", color:"var(--accent)", textTransform:"uppercase" }}>{post.date}</span>
        </div>
        <span style={{ color:"var(--gray-3)", fontSize:"12px" }}>·</span>
        <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
          <Icon name="clock" size={12} color="var(--gray-4)" />
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"1px", color:"var(--gray-4)" }}>{post.readTime}</span>
        </div>
      </div>
      <h3 style={{
        fontFamily:"var(--font-display)", fontSize:"1.1rem", fontWeight:700,
        color:"var(--white)", marginBottom:"10px", lineHeight:1.3,
      }}>{post.title}</h3>
      <p style={{
        fontSize:"0.85rem", color:"var(--gray-4)", lineHeight:1.7,
        display:"-webkit-box", WebkitLineClamp:2,
        WebkitBoxOrient:"vertical", overflow:"hidden", marginBottom:"18px",
      }}>{post.excerpt}</p>
      <div style={{
        display:"flex", alignItems:"center", gap:"6px",
        fontFamily:"var(--font-mono)", fontSize:"10px",
        letterSpacing:"1.5px", textTransform:"uppercase", color:"var(--accent)",
      }}>
        <Icon name="bookOpen" size={13} color="currentColor" />
        Read Article
        <Icon name="arrowRight" size={12} color="currentColor" />
      </div>
    </div>
  </button>
);

const Blog = ({ data, onOpenPost }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  const posts = data?.blog || [];

  return (
    <section id="blog" style={{ background:"var(--black-2)" }}>
      <div className="container">
        <div ref={ref} className={`reveal ${isVisible?"visible":""}`} style={{ marginBottom:"64px" }}>
          <div className="section-label">Blog</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"16px" }}>
            <h2 className="section-title" style={{ marginBottom:0 }}>Thoughts &amp; <span>Insights</span></h2>
            <div style={{
              display:"flex", alignItems:"center", gap:"6px",
              fontFamily:"var(--font-mono)", fontSize:"11px",
              letterSpacing:"2px", textTransform:"uppercase",
              color:"var(--gray-3)",
            }}>
              <Icon name="bookOpen" size={14} color="var(--gray-3)" />
              {posts.length} articles
            </div>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"20px" }}>
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} onOpenPost={onOpenPost} delay={i*100} visible={isVisible} />
          ))}
        </div>

        {posts.length === 0 && (
          <div style={{ textAlign:"center", padding:"80px 0", color:"var(--gray-3)", fontFamily:"var(--font-mono)", fontSize:"12px", letterSpacing:"2px" }}>
            NO BLOG POSTS YET
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
