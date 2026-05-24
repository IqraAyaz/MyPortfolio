import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Icon, { skillIcon } from "./Icons";

const CircleProgress = ({ percentage, size = 72, stroke = 4, animate }) => {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (animate ? percentage / 100 : 0) * circ;
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)", flexShrink:0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--accent)" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition:"stroke-dashoffset 1.3s cubic-bezier(0.25,0.46,0.45,0.94)" }}/>
    </svg>
  );
};

const SkillCard = ({ skill, animate }) => {
  const [hovered, setHovered] = useState(false);
  const iconKey = skillIcon(skill.name);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding:"22px", border:"var(--border)", borderRadius:"var(--radius)",
        background: hovered ? "var(--black-4)" : "var(--black-3)",
        transition:"all 0.3s", transform: hovered ? "translateY(-5px)" : "none",
        boxShadow: hovered ? "var(--shadow-md)" : "none",
        position:"relative", cursor:"default",
        borderColor: hovered ? "rgba(232,224,200,0.2)" : "rgba(255,255,255,0.08)",
      }}>
      {/* Tooltip */}
      {hovered && (
        <div style={{
          position:"absolute", top:"-40px", left:"50%", transform:"translateX(-50%)",
          background:"var(--black-4)", border:"var(--border-accent)", borderRadius:"var(--radius)",
          padding:"5px 12px", fontFamily:"var(--font-mono)", fontSize:"10px",
          color:"var(--accent)", whiteSpace:"nowrap", zIndex:10, pointerEvents:"none",
        }}>
          {skill.percentage}% Proficiency
          <div style={{
            position:"absolute", bottom:"-4px", left:"50%", transform:"translateX(-50%) rotate(45deg)",
            width:"7px", height:"7px", background:"var(--black-4)",
            borderRight:"var(--border-accent)", borderBottom:"var(--border-accent)",
          }}/>
        </div>
      )}

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"14px" }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{
            color: hovered ? "var(--accent)" : "var(--gray-4)",
            marginBottom:"8px", transition:"color 0.3s",
          }}>
            <Icon name={iconKey} size={22} color="currentColor" />
          </div>
          <div style={{ fontFamily:"var(--font-body)", fontWeight:600, fontSize:"0.9rem", color:"var(--white)", marginBottom:"3px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{skill.name}</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"1.5px", color:"var(--gray-3)", textTransform:"uppercase" }}>{skill.category}</div>
        </div>
        <div style={{ position:"relative", flexShrink:0 }}>
          <CircleProgress percentage={skill.percentage} animate={animate} />
          <div style={{
            position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"var(--font-mono)", fontSize:"10px", fontWeight:500, color:"var(--white)",
          }}>{animate ? skill.percentage : 0}%</div>
        </div>
      </div>

      {/* Bar */}
      <div style={{ height:"2px", background:"rgba(255,255,255,0.06)", borderRadius:"2px", overflow:"hidden" }}>
        <div style={{
          height:"100%",
          width: animate ? `${skill.percentage}%` : "0%",
          background:"linear-gradient(90deg, var(--accent-2), var(--accent))",
          borderRadius:"2px",
          transition:"width 1.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}/>
      </div>
    </div>
  );
};

const Skills = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });

  const skills = data?.skills || [];
  const categories = ["All", ...new Set(skills.map(s => s.category))];
  const filtered = activeFilter === "All" ? skills : skills.filter(s => s.category === activeFilter);

  return (
    <section id="skills" style={{ background:"var(--black)" }}>
      <div className="container">
        <div ref={ref} className={`reveal ${isVisible?"visible":""}`} style={{ marginBottom:"64px" }}>
          <div className="section-label">Expertise</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"24px" }}>
            <h2 className="section-title" style={{ marginBottom:0 }}>My <span>Skills</span> &amp;<br/>Technologies</h2>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                  padding:"8px 18px", fontFamily:"var(--font-mono)", fontSize:"10px",
                  letterSpacing:"2px", textTransform:"uppercase",
                  background: activeFilter===cat ? "var(--accent)" : "transparent",
                  color: activeFilter===cat ? "var(--black)" : "var(--gray-4)",
                  border: activeFilter===cat ? "1.5px solid var(--accent)" : "1.5px solid rgba(255,255,255,0.1)",
                  borderRadius:"var(--radius)", cursor:"pointer", transition:"all 0.3s",
                }}>{cat}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"14px" }}>
          {filtered.map((skill, i) => (
            <div key={skill.id} style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.6s ease ${i*55}ms, transform 0.6s ease ${i*55}ms`,
            }}>
              <SkillCard skill={skill} animate={isVisible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
