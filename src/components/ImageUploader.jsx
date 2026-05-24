import { useRef, useState } from "react";

/**
 * ImageUploader — used in EditPanel for any image field.
 * Supports: paste a URL  OR  pick from device (converts to base64).
 * onChange(value) — value is either a URL string or a base64 data-URL.
 */
const ImageUploader = ({ label, value, onChange, height = 100 }) => {
  const fileRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const isBase64 = value && value.startsWith("data:");

  return (
    <div style={{ marginBottom: "14px" }}>
      {label && (
        <label style={{
          fontFamily: "var(--font-mono)", fontSize: "9px",
          letterSpacing: "2px", textTransform: "uppercase",
          color: "#888", display: "block", marginBottom: "6px",
        }}>{label}</label>
      )}

      {/* URL input */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
        <input
          type="text"
          value={isBase64 ? "" : (value || "")}
          onChange={e => onChange(e.target.value)}
          placeholder={isBase64 ? "Local image selected" : "Paste image URL…"}
          style={{
            flex: 1,
            background: "#1a1a1a", border: "1px solid #2a2a2a",
            borderRadius: "2px", padding: "7px 10px",
            color: "#f5f5f0", fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem", outline: "none",
          }}
        />
        <button
          onClick={() => fileRef.current?.click()}
          title="Upload from device"
          style={{
            background: "rgba(232,224,200,0.07)",
            border: "1px solid rgba(232,224,200,0.18)",
            borderRadius: "2px", padding: "7px 12px",
            color: "var(--accent)", cursor: "pointer",
            fontFamily: "'DM Mono', monospace", fontSize: "10px",
            letterSpacing: "1px", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: "5px",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(232,224,200,0.13)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(232,224,200,0.07)"}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
          </svg>
          Upload
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={e => handleFile(e.target.files[0])}
        />
      </div>

      {/* Drop zone + preview */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !value && fileRef.current?.click()}
        style={{
          height: `${height}px`,
          border: `1.5px dashed ${dragging ? "var(--accent)" : value ? "rgba(232,224,200,0.15)" : "#2a2a2a"}`,
          borderRadius: "2px",
          overflow: "hidden",
          background: dragging ? "rgba(232,224,200,0.05)" : "#111",
          cursor: value ? "default" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
          transition: "border-color 0.2s, background 0.2s",
        }}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="preview"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={e => { e.target.style.display = "none"; }}
            />
            <button
              onClick={e => { e.stopPropagation(); onChange(""); }}
              style={{
                position: "absolute", top: "6px", right: "6px",
                background: "rgba(8,8,8,0.8)", border: "1px solid #333",
                borderRadius: "50%", width: "22px", height: "22px",
                color: "#ccc", cursor: "pointer", fontSize: "12px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              title="Remove image"
            >✕</button>
            {isBase64 && (
              <div style={{
                position: "absolute", bottom: "6px", left: "6px",
                background: "rgba(8,8,8,0.8)", border: "1px solid rgba(232,224,200,0.2)",
                borderRadius: "2px", padding: "2px 7px",
                fontFamily: "'DM Mono', monospace", fontSize: "9px",
                letterSpacing: "1px", color: "var(--accent)",
              }}>LOCAL FILE</div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", color: "#444" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 5px", display: "block" }}>
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              Drop image or click Upload
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
