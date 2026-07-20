import React, { useState } from 'react';
import { 
  Shield, 
  Terminal, 
  UserCheck, 
  ShieldAlert, 
  Lock, 
  Cloud, 
  Cpu, 
  Key, 
  Database, 
  Brain, 
  MessageSquare, 
  Award, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { certificationsData } from '../data/certifications';

// Map icon names to Lucide icons
const iconMap = {
  Shield: Shield,
  Terminal: Terminal,
  UserCheck: UserCheck,
  ShieldAlert: ShieldAlert,
  Lock: Lock,
  Cloud: Cloud,
  Cpu: Cpu,
  Key: Key,
  Database: Database,
  Brain: Brain,
  MessageSquare: MessageSquare,
  Workflow: Layers // fallback to Layers if Workflow is not found
};

export default function CertificationsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Security & IR', 'Identity Security', 'Cloud & Identity', 'AI & ML', 'Automation & Workflows'];

  const filteredCerts = certificationsData.filter((cert) => {
    return selectedCategory === 'All' || cert.category === selectedCategory;
  });

  return (
    <section id="certifications" className="page-section">
      <div className="container section-container">
        <div className="section-header">
          <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>Credentials</span>
          <h2 className="section-title">Certifications & Badges</h2>
          <p className="section-subtitle">
            Professional certifications, technical training, and validated industry credentials spanning Cybersecurity, Cloud Security, Identity systems, and AI Engineering.
          </p>
        </div>

        {/* Category Filters */}
        <div className="lab-filter-bar" style={{ marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {filteredCerts.map((cert) => {
            const IconComponent = iconMap[cert.iconName] || Award;
            const categoryClass = cert.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
            return (
              <div key={cert.id} className={`glass-card cert-card cert-card-${categoryClass}`}>
                <div className="cert-card-header">
                  <div className={`cert-icon-wrapper cert-icon-${categoryClass}`}>
                    <IconComponent size={22} className="cert-icon" />
                  </div>
                  <span className="cert-category-badge">{cert.category}</span>
                </div>
                
                <div className="cert-card-body">
                  <h3 className="cert-title">{cert.name}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  
                  <div className="cert-meta-info">
                    <div className="cert-meta-item">
                      <span className="cert-meta-label">Issued:</span>
                      <span className="cert-meta-value">{cert.issueDate}</span>
                    </div>
                    {cert.expiryDate && (
                      <div className="cert-meta-item">
                        <span className="cert-meta-label">Expires:</span>
                        <span className="cert-meta-value">{cert.expiryDate}</span>
                      </div>
                    )}
                  </div>

                  {cert.credentialId && (
                    <div className="cert-details">
                      <div className="cert-detail-row">
                        <span>ID: {cert.credentialId}</span>
                      </div>
                      {cert.verificationCode && (
                        <div className="cert-detail-row">
                          <span>Verification Code: <code>{cert.verificationCode}</code></span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {cert.verificationUrl && (
                  <div className="cert-card-footer">
                    <a 
                      href={cert.verificationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cert-verify-link"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
