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
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [intelSearch, setIntelSearch] = useState('');
  const [selectedIntelCategory, setSelectedIntelCategory] = useState('All');
  const [selectedDetectionTag, setSelectedDetectionTag] = useState('All');
  const [activeModalNote, setActiveModalNote] = useState(null);

  // Scroll spy to highlight navbar links automatically
  useEffect(() => {
    const sections = ['home', 'research', 'detections', 'intel'];
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

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (activeModalNote) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModalNote]);

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
            Security Researcher <span style={{ color: 'var(--accent-indigo)' }}>|</span> AI Threat Intelligence <span style={{ color: 'var(--accent-cyan)' }}>|</span> Identity Security
          </h2>

          <p className="hero-description">
            Researching how artificial intelligence, cloud infrastructure, and modern identity systems are reshaping the enterprise attack surface. Developing proactive detections to secure agentic runtimes and decentralized identities.
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
              <ResearchCard key={report.id} report={report} />
            ))}

            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', marginTop: '24px', fontWeight: 600 }}>Upcoming Publications Roadmap</h3>
            
            {/* Teaser Reports Grid */}
            <div className="research-grid">
              {researchReports.filter(r => !r.featured).map(report => (
                <ResearchCard key={report.id} report={report} />
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
    </>
  );
}
