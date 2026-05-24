import { useState, useEffect, useCallback } from "react";
import { savePortfolioData, resetPortfolioData } from "../data/portfolioData";
import ImageUploader from "./ImageUploader";

const CORRECT_PIN = "1234";

const TABS = ["Personal","Social","Sections","Hero","Skills","Projects","Certificates","Education","Stats","Testimonials","Blog","Reset"];

/* ─── tiny helpers ─── */
const IS = { // inputStyle
  background:"#1a1a1a", border:"1px solid #2a2a2a", borderRadius:"2px",
  padding:"8px 10px", color:"#f5f5f0", fontFamily:"'DM Sans',sans-serif",
  fontSize:"0.83rem", outline:"none", width:"100%", resize:"vertical",
  transition:"border-color 0.2s",
};
const ADD_BTN = {
  width:"100%", padding:"10px",
  background:"rgba(232,224,200,0.05)", border:"1px dashed rgba(232,224,200,0.2)",
  borderRadius:"2px", color:"var(--accent)",
  fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"1.5px",
  textTransform:"uppercase", cursor:"pointer", marginTop:"6px",
};
const DEL_BTN = {
  background:"rgba(192,57,43,0.1)", border:"1px solid rgba(192,57,43,0.3)",
  borderRadius:"2px", color:"#c0392b", cursor:"pointer",
  width:"28px", height:"28px", display:"flex", alignItems:"center",
  justifyContent:"center", fontSize:"12px", flexShrink:0,
};

const Label = ({ children }) => (
  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", color:"#888", marginBottom:"5px" }}>{children}</div>
);
const Field = ({ label, value, onChange, type="text", placeholder }) => (
  <div style={{ marginBottom:"12px" }}>
    <Label>{label}</Label>
    {type === "textarea"
      ? <textarea value={value||""} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={3} style={IS}/>
      : <input type={type} value={value||""} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={IS}/>
    }
  </div>
);
const SH = ({ title }) => (
  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", color:"var(--accent)", marginBottom:"12px", paddingBottom:"8px", borderBottom:"1px solid #1e1e1e", marginTop:"4px" }}>{title}</div>
);

/* ─── Main Component ─── */
const EditPanel = ({ data, onDataChange }) => {
  const [open, setOpen]         = useState(false);
  const [pin, setPin]           = useState("");
  const [pinErr, setPinErr]     = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab]           = useState("Personal");
  const [local, setLocal]       = useState(data);
  const [saved, setSaved]       = useState(false);

  useEffect(() => { setLocal(data); }, [data]);

  useEffect(() => {
    const h = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "E") {
        e.preventDefault();
        setOpen(p => { if (!p) { setPin(""); setPinErr(false); } return !p; });
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const tryPin = () => {
    if (pin === CORRECT_PIN) { setUnlocked(true); setPinErr(false); }
    else { setPinErr(true); setPin(""); setTimeout(() => setPinErr(false), 2000); }
  };

  const set = useCallback((path, value) => {
    setLocal(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let r = next;
      for (let i = 0; i < parts.length - 1; i++) r = r[parts[i]];
      r[parts[parts.length-1]] = value;
      return next;
    });
  }, []);

  const setArr = useCallback((ap, idx, field, value) => {
    setLocal(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = ap.split(".");
      let r = next;
      for (const p of parts) r = r[p];
      r[idx][field] = value;
      return next;
    });
  }, []);

  const addItem = useCallback((ap, tpl) => {
    setLocal(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = ap.split(".");
      let r = next;
      for (const p of parts) r = r[p];
      r.push({ ...tpl, id: Date.now() });
      return next;
    });
  }, []);

  const delItem = useCallback((ap, idx) => {
    setLocal(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = ap.split(".");
      let r = next;
      for (const p of parts) r = r[p];
      r.splice(idx, 1);
      return next;
    });
  }, []);

  const handleSave = () => {
    savePortfolioData(local);
    onDataChange(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm("Reset ALL data to defaults?")) {
      const d = resetPortfolioData();
      setLocal(d);
      onDataChange(d);
    }
  };

  const close = () => { setOpen(false); setUnlocked(false); setPin(""); };

  if (!open) return null;

  const vis = local.sectionVisibility || {};

  const ToggleSection = ({ skey, label }) => (
    <div style={{
      display:"flex", justifyContent:"space-between", alignItems:"center",
      padding:"12px 16px", background: vis[skey]!==false ? "rgba(232,224,200,0.05)" : "#111",
      border:`1px solid ${vis[skey]!==false ? "rgba(232,224,200,0.15)" : "#1e1e1e"}`,
      borderRadius:"2px", marginBottom:"8px",
      transition:"all 0.25s",
    }}>
      <div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"1.5px", textTransform:"uppercase", color: vis[skey]!==false ? "var(--white)" : "var(--gray-3)" }}>{label}</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color: vis[skey]!==false ? "var(--accent)" : "#444", marginTop:"2px" }}>
          {vis[skey]!==false ? "Visible in portfolio & nav" : "Hidden — removed from nav"}
        </div>
      </div>
      <button
        onClick={() => set(`sectionVisibility.${skey}`, vis[skey]===false ? true : false)}
        style={{
          width:"44px", height:"24px", borderRadius:"12px", border:"none", cursor:"pointer",
          background: vis[skey]!==false ? "var(--accent)" : "#333",
          position:"relative", transition:"background 0.3s", flexShrink:0,
        }}
      >
        <span style={{
          position:"absolute", top:"3px",
          left: vis[skey]!==false ? "22px" : "3px",
          width:"18px", height:"18px", borderRadius:"50%",
          background: vis[skey]!==false ? "var(--black)" : "#666",
          transition:"left 0.3s",
        }}/>
      </button>
    </div>
  );

  return (
    <div style={{ position:"fixed", inset:0, zIndex:99999, display:"flex", alignItems:"stretch" }}>
      <div onClick={close} style={{ flex:1, background:"rgba(0,0,0,0.5)" }}/>

      <div style={{
        width:"430px", background:"#0d0d0d", borderLeft:"1px solid #1a1a1a",
        display:"flex", flexDirection:"column", overflow:"hidden",
        animation:"slideInRight 0.3s ease", fontFamily:"'DM Sans',sans-serif",
      }}>
        {/* Header */}
        <div style={{ padding:"18px 22px", borderBottom:"1px solid #1a1a1a", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"1.05rem", fontWeight:700, color:"var(--white)" }}>Edit Panel</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"2px", color:"#444", textTransform:"uppercase", marginTop:"2px" }}>Ctrl+Shift+E · PIN: 1234</div>
          </div>
          <button onClick={close} style={{ background:"none", border:"1px solid #222", borderRadius:"2px", color:"#666", cursor:"pointer", width:"30px", height:"30px", fontSize:"14px" }}>✕</button>
        </div>

        {/* PIN Gate */}
        {!unlocked ? (
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:"14px", textAlign:"center" }}>🔒</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", fontWeight:700, color:"var(--white)", marginBottom:"6px" }}>Enter PIN</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"#444", marginBottom:"24px", textAlign:"center", letterSpacing:"1px" }}>Hidden from all visitors</div>
            <input type="password" value={pin} onChange={e=>setPin(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&tryPin()}
              placeholder="••••" maxLength={8} autoFocus
              style={{ ...IS, textAlign:"center", fontSize:"1.4rem", letterSpacing:"8px", padding:"12px", maxWidth:"200px", marginBottom:"10px", border: pinErr ? "1.5px solid #c0392b" : "1px solid #2a2a2a" }}
            />
            {pinErr && <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"#c0392b", letterSpacing:"1px", marginBottom:"10px" }}>Incorrect PIN</div>}
            <button onClick={tryPin} style={{ background:"var(--accent)", color:"#080808", border:"none", borderRadius:"2px", padding:"10px 28px", fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"2px", textTransform:"uppercase", cursor:"pointer", width:"200px" }}>Unlock</button>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"#2a2a2a", marginTop:"14px" }}>Default: 1234</div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div style={{ display:"flex", overflowX:"auto", flexShrink:0, borderBottom:"1px solid #1a1a1a", scrollbarWidth:"none" }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding:"10px 12px", fontFamily:"var(--font-mono)", fontSize:"9px",
                  letterSpacing:"1.5px", textTransform:"uppercase", background:"none",
                  border:"none", borderBottom: tab===t ? "2px solid var(--accent)" : "2px solid transparent",
                  color: tab===t ? "var(--accent)" : "#444", cursor:"pointer", whiteSpace:"nowrap",
                  transition:"all 0.2s",
                }}>{t}</button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ flex:1, overflowY:"auto", padding:"18px 22px" }}>

              {/* PERSONAL */}
              {tab==="Personal" && <>
                <SH title="Identity"/>
                <Field label="Full Name" value={local.personal?.name} onChange={v=>set("personal.name",v)}/>
                <Field label="First Name" value={local.personal?.firstName} onChange={v=>set("personal.firstName",v)}/>
                <Field label="Last Name"  value={local.personal?.lastName}  onChange={v=>set("personal.lastName",v)}/>
                <Field label="Tagline"    value={local.personal?.tagline}   onChange={v=>set("personal.tagline",v)}/>
                <Field label="Bio" type="textarea" value={local.personal?.bio} onChange={v=>set("personal.bio",v)}/>
                <Field label="Email"    type="email" value={local.personal?.email}    onChange={v=>set("personal.email",v)}/>
                <Field label="Phone"               value={local.personal?.phone}    onChange={v=>set("personal.phone",v)}/>
                <Field label="Location"            value={local.personal?.location} onChange={v=>set("personal.location",v)}/>
                <Field label="CV / Resume URL"     value={local.personal?.cvUrl}    onChange={v=>set("personal.cvUrl",v)} placeholder="https://..."/>
                <ImageUploader label="Profile Photo" value={local.personal?.profilePhoto} onChange={v=>set("personal.profilePhoto",v)} height={140}/>
                <SH title="Typing Roles (Hero)"/>
                {(local.personal?.roles||[]).map((r,i)=>(
                  <div key={i} style={{ display:"flex", gap:"6px", marginBottom:"8px" }}>
                    <input value={r} onChange={e=>{ const roles=[...(local.personal?.roles||[])]; roles[i]=e.target.value; set("personal.roles",roles); }} style={{ ...IS, flex:1 }} placeholder="Role…"/>
                    <button onClick={()=>{ const roles=[...(local.personal?.roles||[])]; roles.splice(i,1); set("personal.roles",roles); }} style={DEL_BTN}>✕</button>
                  </div>
                ))}
                <button onClick={()=>set("personal.roles",[...(local.personal?.roles||[]),"New Role"])} style={ADD_BTN}>+ Add Role</button>
              </>}

              {/* SOCIAL */}
              {tab==="Social" && <>
                <SH title="Social Links"/>
                <Field label="GitHub URL"   value={local.social?.github}   onChange={v=>set("social.github",v)}   placeholder="https://github.com/username"/>
                <Field label="LinkedIn URL" value={local.social?.linkedin} onChange={v=>set("social.linkedin",v)} placeholder="https://linkedin.com/in/username"/>
                <Field label="Twitter URL"  value={local.social?.twitter}  onChange={v=>set("social.twitter",v)}  placeholder="https://twitter.com/username"/>
                <Field label="WhatsApp URL" value={local.social?.whatsapp} onChange={v=>set("social.whatsapp",v)} placeholder="https://wa.me/923000000000"/>
              </>}

              {/* SECTIONS TOGGLE */}
              {tab==="Sections" && <>
                <SH title="Show / Hide Sections"/>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"#444", letterSpacing:"1px", marginBottom:"14px", lineHeight:1.6 }}>
                  Toggle sections on/off. Changes reflect instantly in the navbar and portfolio. Save to persist.
                </div>
                {[
                  ["about","About"],["skills","Skills"],["projects","Projects"],
                  ["testimonials","Testimonials"],["certificates","Certificates"],
                  ["blog","Blog"],["contact","Contact"],
                ].map(([k,l])=><ToggleSection key={k} skey={k} label={l}/>)}
              </>}

              {/* HERO */}
              {tab==="Hero" && <>
                <SH title="Background Images (crossfade)"/>
                {(local.heroImages||[]).map((img,i)=>(
                  <div key={i} style={{ marginBottom:"14px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
                      <Label>Image {i+1}</Label>
                      <button onClick={()=>{ const imgs=[...(local.heroImages||[])]; imgs.splice(i,1); set("heroImages",imgs); }} style={{ ...DEL_BTN, width:"24px", height:"24px", fontSize:"11px" }}>✕</button>
                    </div>
                    <ImageUploader value={img} onChange={v=>{ const imgs=[...(local.heroImages||[])]; imgs[i]=v; set("heroImages",imgs); }} height={90}/>
                  </div>
                ))}
                <button onClick={()=>set("heroImages",[...(local.heroImages||[]),""])} style={ADD_BTN}>+ Add Image</button>
              </>}

              {/* SKILLS */}
              {tab==="Skills" && <>
                <SH title="Skills"/>
                {(local.skills||[]).map((sk,i)=>(
                  <div key={sk.id||i} style={{ padding:"12px", background:"#111", border:"1px solid #1e1e1e", borderRadius:"2px", marginBottom:"10px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--accent)" }}>{sk.name||`Skill ${i+1}`}</span>
                      <button onClick={()=>delItem("skills",i)} style={DEL_BTN}>✕</button>
                    </div>
                    <Field label="Name"     value={sk.name}     onChange={v=>setArr("skills",i,"name",v)}/>
                    <Field label="Category" value={sk.category} onChange={v=>setArr("skills",i,"category",v)} placeholder="Frontend / Backend / Tools"/>
                    <div style={{ marginBottom:"10px" }}>
                      <Label>Percentage: {sk.percentage}%</Label>
                      <input type="range" min="0" max="100" value={sk.percentage}
                        onChange={e=>setArr("skills",i,"percentage",parseInt(e.target.value))}
                        style={{ width:"100%", accentColor:"var(--accent)" }}/>
                    </div>
                  </div>
                ))}
                <button onClick={()=>addItem("skills",{ name:"New Skill", percentage:70, category:"Frontend" })} style={ADD_BTN}>+ Add Skill</button>
              </>}

              {/* PROJECTS */}
              {tab==="Projects" && <>
                <SH title="Projects"/>
                {(local.projects||[]).map((p,i)=>(
                  <div key={p.id||i} style={{ padding:"12px", background:"#111", border:"1px solid #1e1e1e", borderRadius:"2px", marginBottom:"10px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--accent)" }}>{p.title||`Project ${i+1}`}</span>
                      <button onClick={()=>delItem("projects",i)} style={DEL_BTN}>✕</button>
                    </div>
                    <Field label="Title"       value={p.title}       onChange={v=>setArr("projects",i,"title",v)}/>
                    <Field label="Description" type="textarea" value={p.description} onChange={v=>setArr("projects",i,"description",v)}/>
                    <ImageUploader label="Project Image" value={p.image} onChange={v=>setArr("projects",i,"image",v)} height={100}/>
                    <Field label="Category"   value={p.category}   onChange={v=>setArr("projects",i,"category",v)} placeholder="React / HTML / WordPress"/>
                    <Field label="Tags (comma-separated)" value={(p.tags||[]).join(", ")} onChange={v=>setArr("projects",i,"tags",v.split(",").map(t=>t.trim()).filter(Boolean))}/>
                    <Field label="Tech Stack (comma-separated)" value={(p.techStack||[]).join(", ")} onChange={v=>setArr("projects",i,"techStack",v.split(",").map(t=>t.trim()).filter(Boolean))}/>
                    <Field label="Live Demo URL" value={p.liveUrl}   onChange={v=>setArr("projects",i,"liveUrl",v)}/>
                    <Field label="GitHub URL"    value={p.githubUrl} onChange={v=>setArr("projects",i,"githubUrl",v)}/>
                  </div>
                ))}
                <button onClick={()=>addItem("projects",{ title:"New Project", description:"Description.", category:"React", image:"", tags:["React"], techStack:["React"], liveUrl:"#", githubUrl:"#" })} style={ADD_BTN}>+ Add Project</button>
              </>}

              {/* CERTIFICATES */}
              {tab==="Certificates" && <>
                <SH title="Certificates"/>
                {(local.certificates||[]).map((c,i)=>(
                  <div key={c.id||i} style={{ padding:"12px", background:"#111", border:"1px solid #1e1e1e", borderRadius:"2px", marginBottom:"10px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--accent)" }}>{c.title||`Cert ${i+1}`}</span>
                      <button onClick={()=>delItem("certificates",i)} style={DEL_BTN}>✕</button>
                    </div>
                    <Field label="Title"         value={c.title}         onChange={v=>setArr("certificates",i,"title",v)}/>
                    <Field label="Issuer"        value={c.issuer}        onChange={v=>setArr("certificates",i,"issuer",v)}/>
                    <Field label="Date"          value={c.date}          onChange={v=>setArr("certificates",i,"date",v)} placeholder="Jan 2024"/>
                    <Field label="Category"      value={c.category}      onChange={v=>setArr("certificates",i,"category",v)} placeholder="Frontend / Cloud / Design"/>
                    <Field label="Credential ID" value={c.credentialId}  onChange={v=>setArr("certificates",i,"credentialId",v)}/>
                    <Field label="Verify URL"    value={c.credentialUrl} onChange={v=>setArr("certificates",i,"credentialUrl",v)} placeholder="https://..."/>
                    <ImageUploader label="Certificate Image" value={c.image} onChange={v=>setArr("certificates",i,"image",v)} height={100}/>
                  </div>
                ))}
                <button onClick={()=>addItem("certificates",{ title:"New Certificate", issuer:"Issuer", date:"2024", category:"Frontend", credentialId:"", credentialUrl:"#", image:"" })} style={ADD_BTN}>+ Add Certificate</button>
              </>}

              {/* EDUCATION */}
              {tab==="Education" && <>
                <SH title="Education"/>
                {(local.education||[]).map((ed,i)=>(
                  <div key={ed.id||i} style={{ padding:"12px", background:"#111", border:"1px solid #1e1e1e", borderRadius:"2px", marginBottom:"10px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--accent)" }}>{ed.degree||`Edu ${i+1}`}</span>
                      <button onClick={()=>delItem("education",i)} style={DEL_BTN}>✕</button>
                    </div>
                    <Field label="Degree"      value={ed.degree}      onChange={v=>setArr("education",i,"degree",v)}/>
                    <Field label="Institution" value={ed.institution} onChange={v=>setArr("education",i,"institution",v)}/>
                    <Field label="Year"        value={ed.year}        onChange={v=>setArr("education",i,"year",v)} placeholder="2019 – 2023"/>
                    <Field label="Description" type="textarea" value={ed.description} onChange={v=>setArr("education",i,"description",v)}/>
                  </div>
                ))}
                <button onClick={()=>addItem("education",{ degree:"New Degree", institution:"Institution", year:"2024", description:"Description." })} style={ADD_BTN}>+ Add Education</button>
              </>}

              {/* STATS */}
              {tab==="Stats" && <>
                <SH title="Stats Row (About section)"/>
                {(local.stats||[]).map((st,i)=>(
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 30px", gap:"8px", alignItems:"end", marginBottom:"8px" }}>
                    <div><Label>Value</Label><input value={st.value} onChange={e=>setArr("stats",i,"value",e.target.value)} style={IS} placeholder="40+"/></div>
                    <div><Label>Label</Label><input value={st.label} onChange={e=>setArr("stats",i,"label",e.target.value)} style={IS} placeholder="Projects"/></div>
                    <button onClick={()=>delItem("stats",i)} style={{ ...DEL_BTN, marginBottom:"1px" }}>✕</button>
                  </div>
                ))}
                <button onClick={()=>addItem("stats",{ value:"0+", label:"New Stat" })} style={ADD_BTN}>+ Add Stat</button>
              </>}

              {/* TESTIMONIALS */}
              {tab==="Testimonials" && <>
                <SH title="Testimonials"/>
                {(local.testimonials||[]).map((t,i)=>(
                  <div key={t.id||i} style={{ padding:"12px", background:"#111", border:"1px solid #1e1e1e", borderRadius:"2px", marginBottom:"10px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--accent)" }}>{t.name||`T ${i+1}`}</span>
                      <button onClick={()=>delItem("testimonials",i)} style={DEL_BTN}>✕</button>
                    </div>
                    <Field label="Name" value={t.name} onChange={v=>setArr("testimonials",i,"name",v)}/>
                    <Field label="Role" value={t.role} onChange={v=>setArr("testimonials",i,"role",v)} placeholder="CEO @ Company"/>
                    <ImageUploader label="Avatar" value={t.avatar} onChange={v=>setArr("testimonials",i,"avatar",v)} height={80}/>
                    <Field label="Quote" type="textarea" value={t.quote} onChange={v=>setArr("testimonials",i,"quote",v)}/>
                    <div style={{ marginBottom:"10px" }}>
                      <Label>Stars: {t.stars}</Label>
                      <input type="range" min="1" max="5" value={t.stars} onChange={e=>setArr("testimonials",i,"stars",parseInt(e.target.value))} style={{ width:"100%", accentColor:"var(--accent)" }}/>
                    </div>
                  </div>
                ))}
                <button onClick={()=>addItem("testimonials",{ name:"Client", role:"Role @ Co", avatar:"", quote:"Great work!", stars:5 })} style={ADD_BTN}>+ Add Testimonial</button>
              </>}

              {/* BLOG */}
              {tab==="Blog" && <>
                <SH title="Blog Posts"/>
                {(local.blog||[]).map((p,i)=>(
                  <div key={p.id||i} style={{ padding:"12px", background:"#111", border:"1px solid #1e1e1e", borderRadius:"2px", marginBottom:"10px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--accent)" }}>{p.title||`Post ${i+1}`}</span>
                      <button onClick={()=>delItem("blog",i)} style={DEL_BTN}>✕</button>
                    </div>
                    <Field label="Title"     value={p.title}    onChange={v=>setArr("blog",i,"title",v)}/>
                    <Field label="Date"      value={p.date}     onChange={v=>setArr("blog",i,"date",v)} placeholder="Jan 1, 2025"/>
                    <Field label="Read Time" value={p.readTime} onChange={v=>setArr("blog",i,"readTime",v)} placeholder="5 min read"/>
                    <Field label="Excerpt"   type="textarea" value={p.excerpt} onChange={v=>setArr("blog",i,"excerpt",v)}/>
                    <Field label="Full Content (## heading, paragraph breaks)" type="textarea" value={p.content} onChange={v=>setArr("blog",i,"content",v)}/>
                    <ImageUploader label="Thumbnail" value={p.thumbnail} onChange={v=>setArr("blog",i,"thumbnail",v)} height={90}/>
                    <Field label="Tags (comma-separated)" value={(p.tags||[]).join(", ")} onChange={v=>setArr("blog",i,"tags",v.split(",").map(t=>t.trim()).filter(Boolean))}/>
                  </div>
                ))}
                <button onClick={()=>addItem("blog",{ title:"New Post", date:"Jan 1, 2025", readTime:"5 min read", excerpt:"Excerpt.", content:"## Introduction\n\nContent here.", thumbnail:"", tags:["React"], url:"#" })} style={ADD_BTN}>+ Add Post</button>
              </>}

              {/* RESET */}
              {tab==="Reset" && (
                <div style={{ textAlign:"center", padding:"40px 16px" }}>
                  <div style={{ fontSize:"2.5rem", marginBottom:"14px" }}>⚠️</div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"1.05rem", fontWeight:700, color:"var(--white)", marginBottom:"10px" }}>Reset to Defaults</div>
                  <p style={{ fontSize:"0.84rem", color:"#555", lineHeight:1.7, marginBottom:"28px" }}>Erases all edits from localStorage and restores original data. Cannot be undone.</p>
                  <button onClick={handleReset} style={{ background:"#c0392b", color:"#fff", border:"none", borderRadius:"2px", padding:"12px 28px", fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"2px", textTransform:"uppercase", cursor:"pointer" }}>Reset All Data</button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding:"12px 22px", borderTop:"1px solid #1a1a1a", display:"flex", gap:"10px", flexShrink:0 }}>
              <button onClick={handleSave} style={{
                flex:1, background: saved ? "#22c55e" : "var(--accent)", color:"#080808",
                border:"none", borderRadius:"2px", padding:"11px",
                fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"2px",
                textTransform:"uppercase", cursor:"pointer", transition:"background 0.3s",
              }}>{saved ? "✓ Saved!" : "Save Changes"}</button>
              <button onClick={close} style={{
                padding:"11px 14px", background:"none", border:"1px solid #222",
                borderRadius:"2px", color:"#555", cursor:"pointer",
                fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"2px", textTransform:"uppercase",
              }}>Close</button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideInRight { from{transform:translateX(100%)} to{transform:translateX(0)} }
      `}</style>
    </div>
  );
};

export default EditPanel;
