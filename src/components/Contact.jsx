import { useState } from "react";
import emailjs from "@emailjs/browser";
import Icon from "./Icons";
import { useScrollReveal } from "../hooks/useScrollReveal";

const InputField = ({ label, type = "text", name, value, onChange, error, valid, placeholder }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
    <label style={{
      fontFamily: "var(--font-mono)", fontSize: "10px",
      letterSpacing: "2px", textTransform: "uppercase",
      color: "var(--gray-4)",
    }}>{label}</label>
    <div style={{ position: "relative" }}>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
          style={{
            width: "100%",
            padding: "14px 44px 14px 16px",
            background: "var(--black-4)",
            border: `1.5px solid ${error ? "#c0392b" : valid ? "#22c55e" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "var(--radius)",
            color: "var(--white)",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            outline: "none",
            resize: "vertical",
            transition: "border-color 0.3s",
            lineHeight: 1.6,
          }}
          onFocus={e => { if (!error && !valid) e.target.style.borderColor = "rgba(232,224,200,0.3)"; }}
          onBlur={e => { if (!error && !valid) e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "14px 44px 14px 16px",
            background: "var(--black-4)",
            border: `1.5px solid ${error ? "#c0392b" : valid ? "#22c55e" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "var(--radius)",
            color: "var(--white)",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={e => { if (!error && !valid) e.target.style.borderColor = "rgba(232,224,200,0.3)"; }}
          onBlur={e => { if (!error && !valid) e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
        />
      )}
      {valid && (
        <span style={{
          position: "absolute", right: "14px",
          top: type === "textarea" ? "14px" : "50%",
          transform: type === "textarea" ? "none" : "translateY(-50%)",
          color: "#22c55e", fontSize: "16px",
        }}>✓</span>
      )}
    </div>
    {error && (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "1px", color: "#c0392b" }}>{error}</span>
    )}
  </div>
);

const Contact = ({ data }) => {
  const { ref, isVisible } = useScrollReveal();
  const personal = data?.personal || {};
  const social = data?.social || {};

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const validate = (f) => {
    const e = {};
    if (!f.name.trim()) e.name = "Name is required";
    if (!f.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Invalid email address";
    if (!f.subject.trim()) e.subject = "Subject is required";
    if (!f.message.trim()) e.message = "Message is required";
    else if (f.message.trim().length < 20) e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value });
      setErrors(p => ({ ...p, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(p => ({ ...p, [name]: true }));
    const errs = validate(form);
    setErrors(p => ({ ...p, [name]: errs[name] }));
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    try {
      await emailjs.send(
        "service_h6n3s96",
        "template_hum2wcw",
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "2hEDcYYB58rlTmTZD"
      );
      showToast("success", "Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
    } catch {
      showToast("error", "Failed to send. Please try again.");
    }
    setSubmitting(false);
  };

  const isValid = (field) => touched[field] && !errors[field] && form[field].trim();

  const contactLinks = [
    { icon: "mail", label: "Email", value: personal.email || "alex@example.com", href: `mailto:${personal.email}` },
    { icon: "phone", label: "Phone", value: personal.phone || "+1 (555) 000-0000", href: `tel:${personal.phone}` },
    { icon: "mapPin", label: "Location", value: personal.location || "San Francisco, CA", href: "#" },
  ];

  return (
    <section id="contact" style={{ background: "var(--black)" }}>
      <div className="container">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`} style={{ marginBottom: "64px" }}>
          <div className="section-label">Contact</div>
          <h2 className="section-title">Let's Work <span>Together</span></h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "64px",
          alignItems: "start",
        }} className="contact-grid">

          {/* Left - Info */}
          <div className={`reveal-left ${isVisible ? "visible" : ""}`}>
            <p style={{ color: "var(--gray-4)", lineHeight: 1.8, marginBottom: "40px", fontSize: "0.975rem" }}>
              Have a project in mind or want to collaborate? I'm currently available for freelance work and full-time positions. Drop me a message!
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
              {contactLinks.map(({ icon, label, value, href }) => (
                <a key={label} href={href} style={{
                  display: "flex", alignItems: "center", gap: "16px",
                  textDecoration: "none",
                  padding: "16px 20px",
                  border: "var(--border)",
                  borderRadius: "var(--radius)",
                  background: "var(--black-3)",
                  transition: "all 0.3s",
                  color: "inherit",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(232,224,200,0.2)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
                >
                  <div style={{
                    width: "40px", height: "40px",
                    background: "rgba(232,224,200,0.07)",
                    border: "1px solid rgba(232,224,200,0.12)",
                    borderRadius: "var(--radius)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", flexShrink: 0,
                  }}><Icon name={icon} size={18} color="var(--accent)" /></div>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "2px", color: "var(--gray-3)", textTransform: "uppercase", marginBottom: "2px" }}>{label}</div>
                    <div style={{ fontSize: "0.875rem", color: "var(--white)" }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social */}
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", color: "var(--gray-3)", textTransform: "uppercase", marginBottom: "16px" }}>Follow me</div>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { href: social.github, label: "GH" },
                  { href: social.linkedin, label: "IN" },
                  { href: social.twitter, label: "TW" },
                ].filter(s => s.href).map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                    width: "40px", height: "40px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "var(--border)", borderRadius: "var(--radius)",
                    fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "1px",
                    color: "var(--gray-4)", textDecoration: "none",
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
                  >{s.label}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className={`reveal-right ${isVisible ? "visible" : ""}`}>
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
                <InputField label="Name" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} valid={isValid("name")} placeholder="Your name" />
                <InputField label="Email" type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} valid={isValid("email")} placeholder="your@email.com" />
              </div>
              <InputField label="Subject" name="subject" value={form.subject} onChange={handleChange} onBlur={handleBlur} error={errors.subject} valid={isValid("subject")} placeholder="Project inquiry" />
              <InputField label="Message" type="textarea" name="message" value={form.message} onChange={handleChange} onBlur={handleBlur} error={errors.message} valid={isValid("message")} placeholder="Tell me about your project..." />
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ alignSelf: "flex-start", opacity: submitting ? 0.7 : 1, cursor: submitting ? "wait" : "pointer" }}
              >
                {submitting ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "12px", height: "12px", border: "2px solid var(--black)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "32px", left: "50%",
          transform: "translateX(-50%)",
          padding: "14px 28px",
          fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "1px",
          background: toast.type === "success" ? "var(--accent)" : "#c0392b",
          color: toast.type === "success" ? "var(--black)" : "var(--white)",
          borderRadius: "var(--radius-md)",
          zIndex: 10000,
          animation: "slideUp 0.4s ease",
          whiteSpace: "nowrap",
        }}>
          {toast.msg}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
