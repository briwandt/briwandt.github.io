import React, { useState } from 'react';
import { Terminal, Copy, Check, Info } from 'lucide-react';

export default function DetectionCard({ project }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(project.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="glass-card detection-card">
      <div className="detection-card-grid">
        <div className="detection-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="badge badge-emerald">{project.tag}</span>
          </div>

          <h3 style={{ fontSize: '1.5rem', margin: '12px 0 8px' }}>{project.title}</h3>
          <p style={{ fontSize: '0.95rem', marginBottom: '16px' }}>{project.description}</p>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.01)',
            borderLeft: '2px solid var(--accent-emerald)',
            padding: '12px 16px',
            borderRadius: '0 8px 8px 0',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <Info size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
            <span>{project.details}</span>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Deployment / Syntax:</span>
            <div className="tech-tag-container">
              {project.tech.map((t, idx) => (
                <span key={idx} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="code-container">
          <div className="code-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={14} style={{ color: 'var(--text-secondary)' }} />
              <span className="code-lang">{project.language}</span>
            </div>
            <button onClick={handleCopy} className="copy-btn" aria-label="Copy code">
              {copied ? <Check size={14} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={14} />}
            </button>
          </div>
          <pre className="code-block">
            <code>{project.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
