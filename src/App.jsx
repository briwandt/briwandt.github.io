import React, { useState, useEffect } from 'react';
import { Shield, BookOpen, Terminal, Rss, ArrowRight, Search, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResearchCard from './components/ResearchCard';
import DetectionCard from './components/DetectionCard';
import IntelNoteCard from './components/IntelNoteCard';
import { researchReports } from './data/research';
import { detectionProjects } from './data/detections';
import { intelNotes } from './data/intelNotes';
import { fullReportsData } from './data/fullReportText';
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [intelSearch, setIntelSearch] = useState('');
  const [selectedIntelCategory, setSelectedIntelCategory] = useState('All');
  const [selectedDetectionTag, setSelectedDetectionTag] = useState('All');
  const [activeModalNote, setActiveModalNote] = useState(null);
  const [isReportReaderOpen, setIsReportReaderOpen] = useState(false);
  const [activeReportSectionId, setActiveReportSectionId] = useState('summary');
  const [activeReportId, setActiveReportId] = useState('identity-at-the-center');

  // Contact Form States
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' }); // 'success', 'error', 'submitting'

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({ type: 'error', message: 'Please fill in all required fields (Name, Email, Message).' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setFormStatus({ type: 'submitting', message: 'Sending inquiry...' });

    try {
      const response = await fetch('https://contact-worker.briwandt.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus({ 
          type: 'success', 
          message: 'Inquiry submitted successfully! I will get back to you shortly.' 
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errMsg = await response.text();
        setFormStatus({ 
          type: 'error', 
          message: `Failed to send message: ${errMsg || 'Please try again later.'}` 
        });
      }
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: 'Network error. Please verify the Cloudflare Worker is active and online.' 
      });
    }
  };

  // Scroll spy to highlight navbar links automatically
  useEffect(() => {
    const sections = ['home', 'research', 'detections', 'intel', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Filter handlers
  const intelCategories = ['All', 'AI Security', 'Identity Security', 'Cloud Security', 'Threat Intelligence'];
  const detectionTags = ['All', 'Detection Engineering', 'Cloud Monitoring', 'Security Tool', 'Threat Hunting'];

  const filteredNotes = intelNotes.filter((note) => {
    const matchesCategory = selectedIntelCategory === 'All' || note.category === selectedIntelCategory;
    const matchesSearch = 
      note.title.toLowerCase().includes(intelSearch.toLowerCase()) || 
      note.summary.toLowerCase().includes(intelSearch.toLowerCase()) ||
      note.content.toLowerCase().includes(intelSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredDetections = detectionProjects.filter((project) => {
    return selectedDetectionTag === 'All' || project.tag === selectedDetectionTag;
  });

  // Prevent background scrolling when modal or report reader is active
  useEffect(() => {
    if (activeModalNote || isReportReaderOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModalNote, isReportReaderOpen]);

  // Mini-parser to render the report markdown content beautifully
  const renderReportContent = (text) => {
    return text.split('\n\n').map((block, idx) => {
      if (block.startsWith('### ')) {
        return (
          <h3 
            key={idx} 
            style={{ 
              fontSize: '1.6rem', 
              color: 'var(--text-primary)', 
              marginBottom: '16px', 
              marginTop: idx > 0 ? '28px' : '0',
              borderBottom: '1px solid var(--glass-border)', 
              paddingBottom: '8px',
              fontFamily: 'var(--font-heading)'
            }}
          >
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('#### ')) {
        return (
          <h4 
            key={idx} 
            style={{ 
              fontSize: '1.2rem', 
              color: 'var(--text-primary)', 
              marginBottom: '12px', 
              marginTop: '20px',
              fontFamily: 'var(--font-heading)'
            }}
          >
            {block.replace('#### ', '')}
          </h4>
        );
      }
      if (block.startsWith('- ')) {
        return (
          <ul key={idx} style={{ marginLeft: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {block.split('\n').map((item, itemIdx) => (
              <li key={itemIdx} style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.5' }}>
                {item.replace('- ', '').replace('**', '').replace('**', '')}
              </li>
            ))}
          </ul>
        );
      }
      if (block.startsWith('| ')) {
        const lines = block.split('\n').filter(l => l.trim() !== '');
        const headers = lines[0].split('|').map(s => s.trim()).filter(s => s !== '');
        const rows = lines.slice(2).map(r => r.split('|').map(s => s.trim()).filter(s => s !== ''));
        return (
          <div key={idx} className="table-responsive" style={{ overflowX: 'auto', marginBottom: '24px', marginTop: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left', border: '1px solid var(--glass-border)' }}>
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '2px solid var(--glass-border)' }}>
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--text-primary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid var(--glass-border)', background: rIdx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '12px 16px', color: 'var(--text-secondary)', verticalAlign: 'top', lineHeight: '1.5' }}>
                        {cell.startsWith('**') ? <strong>{cell.replace(/\*\*/g, '')}</strong> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      return <p key={idx} style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.65', marginBottom: '16px' }}>{block}</p>;
    });
  };

  return (
    <>
      <div className="glow-orb glow-orb-cyan"></div>
      <div className="glow-orb glow-orb-purple"></div>

      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main style={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <section id="home" className="hero-section container">
          <div className="hero-badge">
            <Shield size={16} style={{ color: 'var(--accent-cyan)' }} />
            <span className="text-gradient-cyan-indigo" style={{ fontWeight: 600 }}>Active Security Research</span>
          </div>

          <h1 className="hero-title">
            Brianna Wandt
          </h1>
          
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 500,
            marginBottom: '20px',
            color: 'var(--text-secondary)'
          }}>
            Security & Incident Response Researcher <span style={{ color: 'var(--accent-indigo)' }}>|</span> Cloud Security <span style={{ color: 'var(--accent-cyan)' }}>|</span> AI Threat Intelligence
          </h2>

          <p className="hero-description">
            Researching how emerging AI systems, modern identity providers, and cloud control planes reshape enterprise attack surfaces, while leveraging hands-on Incident Response (IR) detection engineering to protect agentic runtimes.
          </p>

          <div className="hero-ctas">
            <a 
              href="#research" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary"
            >
              <span>Explore Research</span>
              <ArrowRight size={16} />
            </a>
            <a 
              href="#detections" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('detections')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-outline"
            >
              <span>View Detections</span>
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-val text-gradient-cyan-indigo">01</span>
              <span className="stat-lbl">Featured Report</span>
            </div>
            <div className="stat-item">
              <span className="stat-val text-gradient-cyan-indigo">05</span>
              <span className="stat-lbl">Active Detections</span>
            </div>
            <div className="stat-item">
              <span className="stat-val text-gradient-cyan-indigo">04</span>
              <span className="stat-lbl">Weekly Intel Notes</span>
            </div>
          </div>
        </section>

        {/* Research Program Section */}
        <section id="research" className="page-section bg-secondary" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
          <div className="container section-container">
            <div className="section-header">
              <span className="badge" style={{ marginBottom: '12px' }}>Publications</span>
              <h2 className="section-title">Research Program</h2>
              <p className="section-subtitle">
                Comprehensive reports tracing cloud pivot points, compromised credentials in machine workflows, and vulnerabilities in large language model pipelines.
              </p>
            </div>

            {/* Featured Report */}
            {researchReports.filter(r => r.featured).map(report => (
              <ResearchCard 
                key={report.id} 
                report={report} 
                onReadReport={() => {
                  setActiveReportId(report.id);
                  setActiveReportSectionId('summary');
                  setIsReportReaderOpen(true);
                }}
              />
            ))}

            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', marginTop: '24px', fontWeight: 600 }}>Research Publications Roadmap</h3>
            
            {/* Teaser & Unlocked Reports Grid */}
            <div className="research-grid">
              {researchReports.filter(r => !r.featured).map(report => (
                <ResearchCard 
                  key={report.id} 
                  report={report} 
                  onReadReport={report.isTeaser ? null : () => {
                    setActiveReportId(report.id);
                    setActiveReportSectionId('summary');
                    setIsReportReaderOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Detection Lab Section */}
        <section id="detections" className="page-section">
          <div className="container section-container">
            <div className="section-header">
              <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>Code & Rules</span>
              <h2 className="section-title">Detection Lab</h2>
              <p className="section-subtitle">
                Production-ready KQL queries, Splunk SPL logs, and Infrastructure-as-Code setups to proactively hunt for emerging threats and audit AI workflows.
              </p>
            </div>

            {/* Detections Category Filter */}
            <div className="lab-filter-bar">
              {detectionTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedDetectionTag(tag)}
                  className={`filter-btn ${selectedDetectionTag === tag ? 'active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Detections List */}
            <div className="detections-list">
              {filteredDetections.length > 0 ? (
                filteredDetections.map((project) => (
                  <DetectionCard key={project.id} project={project} />
                ))
              ) : (
                <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>No detection projects found matching the criteria.</p>
              )}
            </div>
          </div>
        </section>

        {/* Intelligence Notes Section */}
        <section id="intel" className="page-section bg-secondary" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)' }}>
          <div className="container section-container">
            <div className="section-header">
              <span className="badge badge-purple" style={{ marginBottom: '12px' }}>Weekly Briefings</span>
              <h2 className="section-title">Intelligence Notes</h2>
              <p className="section-subtitle">
                Bite-sized assessments analyzing active threats, OAuth consent campaigns, and machine identities inside enterprise cloud SaaS ecosystems.
              </p>
            </div>

            {/* Intel Filters & Search */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
              <div className="search-container">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search intelligence notes..."
                  value={intelSearch}
                  onChange={(e) => setIntelSearch(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="lab-filter-bar" style={{ margin: 0 }}>
                {intelCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedIntelCategory(cat)}
                    className={`filter-btn ${selectedIntelCategory === cat ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes Grid */}
            <div className="notes-grid">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <IntelNoteCard 
                    key={note.id} 
                    note={note} 
                    onReadMore={(n) => setActiveModalNote(n)} 
                  />
                ))
              ) : (
                <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>No intelligence notes found matching your search.</p>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="page-section">
          <div className="container section-container">
            <div className="section-header">
              <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>Inquiries</span>
              <h2 className="section-title">Submit Inquiry</h2>
              <p className="section-subtitle">
                Have a question about my research, detection engineering templates, or malware analyses? Submit an inquiry below, and I'll get back to you.
              </p>
            </div>

            <div className="contact-layout">
              {/* Contact Info Card */}
              <div className="glass-card contact-info-card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', fontWeight: 600 }}>Let's Collaborate</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  I'm always open to discussing threat intelligence, cloud infrastructure security, custom detection engineering strategies, and joint malware research campaigns.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="contact-icon-wrapper">
                      <Shield size={18} style={{ color: 'var(--accent-cyan)' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>Specializations</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Incident Response & Cloud Defenses</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="contact-icon-wrapper">
                      <BookOpen size={18} style={{ color: 'var(--accent-indigo)' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>GitHub Publications</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Open-source YARA & KQL rules</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Card */}
              <div className="glass-card contact-form-card">
                {formStatus.type === 'success' ? (
                  <div className="contact-success-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '40px 0' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '2px solid var(--accent-emerald)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      color: 'var(--accent-emerald)',
                      boxShadow: '0 0 16px rgba(16, 185, 129, 0.2)'
                    }}>
                      <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Message Sent!</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '320px', margin: '0 auto 24px', lineHeight: '1.5' }}>
                      {formStatus.message}
                    </p>
                    <button 
                      onClick={() => setFormStatus({ type: '', message: '' })} 
                      className="btn btn-secondary"
                      style={{ padding: '8px 20px' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-mobile">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="contact-name" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                          Name <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="form-input"
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="contact-email" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                          Email <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="contact-subject" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Inquiry Subject"
                        className="form-input"
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="contact-message" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        Message <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows="5"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Type your message here..."
                        className="form-input"
                        style={{ resize: 'vertical' }}
                      />
                    </div>

                    {formStatus.type === 'error' && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', padding: '10px 12px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-sm)' }}>
                        {formStatus.message}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ alignSelf: 'flex-start', padding: '10px 24px', minWidth: '140px', justifyContent: 'center' }}
                      disabled={formStatus.type === 'submitting'}
                    >
                      {formStatus.type === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Intelligence Note Modal Detail Overlay */}
      {activeModalNote && (
        <div className="modal-overlay" onClick={() => setActiveModalNote(null)}>
          <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModalNote(null)} aria-label="Close modal">
              <X size={18} />
            </button>
            <div className="note-header">
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <span className="badge">{activeModalNote.category}</span>
                <span className="badge badge-cyan">{activeModalNote.readingTime}</span>
              </div>
              <h3 style={{ fontSize: '2rem', lineHeight: '1.2', marginBottom: '8px' }}>{activeModalNote.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Published on {activeModalNote.date} by Brianna Wandt</p>
            </div>
            <div className="modal-body">
              {activeModalNote.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full Report Reader View Overlay */}
      {isReportReaderOpen && (() => {
        const currentReport = fullReportsData[activeReportId] || {};
        return (
          <div className="report-reader-overlay" onClick={() => setIsReportReaderOpen(false)}>
            <div className="report-reader-content" onClick={(e) => e.stopPropagation()}>
              <div className="report-reader-header">
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
                    {currentReport.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentReport.metadata}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <a 
                    href={currentReport.pdfUrl} 
                    className="btn btn-secondary" 
                    style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                    download
                  >
                    Download PDF
                  </a>
                  <button 
                    className="modal-close" 
                    style={{ position: 'static', width: '32px', height: '32px' }} 
                    onClick={() => setIsReportReaderOpen(false)}
                    aria-label="Close reader"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="report-reader-layout">
                {/* Sidebar Outline Navigation */}
                <aside className="report-reader-sidebar">
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', paddingLeft: '16px', marginBottom: '8px', fontWeight: 600 }}>
                    Report Contents
                  </span>
                  {currentReport.sections?.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveReportSectionId(section.id);
                        const bodyEl = document.getElementById('report-body-scroller');
                        if (bodyEl) bodyEl.scrollTop = 0;
                      }}
                      className={`report-sidebar-btn ${activeReportSectionId === section.id ? 'active' : ''}`}
                    >
                      {section.title}
                    </button>
                  ))}
                </aside>

                {/* Main Reader Body */}
                <div id="report-body-scroller" className="report-reader-body">
                  {currentReport.sections
                    ?.filter((s) => s.id === activeReportSectionId)
                    .map((section) => (
                      <div key={section.id} style={{ maxWidth: '780px', margin: '0 auto' }}>
                        {renderReportContent(section.content)}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
