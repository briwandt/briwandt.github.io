import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Shield size={16} style={{ color: 'var(--accent-cyan)' }} />
            <span className="footer-brand">Brianna Wandt</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Brianna Wandt. All rights reserved.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div>
            <h5 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Specializations
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <li>Incident Response (IR) & Threat Hunting</li>
              <li>Cloud Security & Attack Path Auditing</li>
              <li>Identity Threat Detection & Response (ITDR)</li>
              <li>Agentic AI Security Auditing</li>
            </ul>
          </div>
          <div>
            <h5 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Research Mission
            </h5>
            <p style={{ maxWidth: '300px', fontSize: '0.8rem', lineHeight: '1.4', color: 'var(--text-muted)' }}>
              Leveraging an extensive background in Incident Response (IR) to proactively document how emerging AI agent runtimes, modern identity providers, and cloud control planes alter the enterprise attack surface.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
