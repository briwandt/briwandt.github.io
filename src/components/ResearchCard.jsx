import React, { useState } from 'react';
import { FileText, Calendar, ChevronDown, ChevronUp, Lock, ArrowDownToLine, Compass, BookOpen } from 'lucide-react';

export default function ResearchCard({ report, onReadReport }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 1. TEASER REPORT LAYOUT (LOCKED CARD INSIDE GRID)
  if (report.isTeaser) {
    return (
      <div className="glass-card teaser-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px', justifyContent: 'space-between', minHeight: '320px' }}>
        <div className="teaser-header">
          <div className="report-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            <Calendar size={12} />
            <span>{report.date}</span>
          </div>
          <h3 className="teaser-title" style={{ fontSize: '1.25rem', marginBottom: '8px', lineHeight: '1.3', fontWeight: 600 }}>
            {report.title}
          </h3>
          <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: 'var(--text-muted)' }}>
            {report.summary}
          </p>
        </div>
        <div className="teaser-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '12px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {report.tags.slice(0, 2).map((t, idx) => (
              <span key={idx} className="badge" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>{t}</span>
            ))}
          </div>
          <div className="teaser-lock" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Lock size={12} />
            <span>Teaser</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. ACTIVE REPORT LAYOUT (UNLOCKED CARD INSIDE GRID - VERTICAL STACK)
  if (!report.featured) {
    return (
      <div className="glass-card active-grid-report-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px', justifyContent: 'space-between', minHeight: '440px' }}>
        <div>
          {/* Top Aspect-Ratio Image */}
          <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', aspectRatio: '16/10', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
            <img 
              src={report.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"} 
              alt={report.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>Active Research</span>
            </div>
          </div>

          <div className="report-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <Calendar size={12} />
            <span>{report.date}</span>
          </div>

          <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', lineHeight: '1.35', fontWeight: 700 }}>
            {report.title}
          </h3>
          
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
            {report.summary}
          </p>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {report.tags.slice(0, 3).map((t, idx) => (
              <span key={idx} className="badge" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Buttons and Outline Drawer */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {onReadReport && (
              <button 
                onClick={onReadReport} 
                className="btn btn-primary"
                style={{ padding: '8px 12px', fontSize: '0.85rem', width: '100%', justifyContent: 'center' }}
              >
                <BookOpen size={14} />
                <span>Read Full Report</span>
              </button>
            )}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="btn btn-secondary"
                style={{ padding: '8px 12px', fontSize: '0.85rem', flex: 1, justifyContent: 'center' }}
              >
                {isExpanded ? 'Hide Outline' : 'View Outline'}
              </button>
              <a 
                href={report.pdfUrl} 
                className="btn btn-outline"
                style={{ padding: '8px 12px', fontSize: '0.85rem', flex: 1, justifyContent: 'center' }}
                onClick={(e) => {
                  if (report.pdfUrl === '#') {
                    e.preventDefault();
                    alert("This is a demo setup.");
                  }
                }}
              >
                <ArrowDownToLine size={14} />
                <span>PDF</span>
              </a>
            </div>
          </div>

          {isExpanded && (
            <div style={{
              borderTop: '1px solid var(--glass-border)',
              paddingTop: '16px',
              marginTop: '16px',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                <BookOpen size={12} style={{ color: 'var(--accent-indigo)' }} />
                <span>Report Outline</span>
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px', padding: 0 }}>
                {report.tableOfContents.slice(0, 4).map((chapter, idx) => (
                  <li key={idx} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', padding: '4px 8px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                    {chapter}
                  </li>
                ))}
                {report.tableOfContents.length > 4 && (
                  <li style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic', marginTop: '4px' }}>
                    + {report.tableOfContents.length - 4} more sections
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. FEATURED REPORT LAYOUT (FULL WIDTH LANDSCAPE - SHOWN OUTSIDE GRID)
  return (
    <div className="glass-card featured-report-card">
      <div className="report-image-container">
        <img src={report.coverImage} alt={report.title} className="report-image" />
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          zIndex: 2
        }}>
          <span className="badge badge-cyan">Featured Research</span>
        </div>
      </div>

      <div className="report-content">
        <div className="report-meta" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <Calendar size={14} />
          <span>{report.date}</span>
          <span>•</span>
          <span>By {report.author}</span>
        </div>

        <h3 className="report-title">{report.title}</h3>
        <p className="report-summary">{report.summary}</p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {report.tags.map((t, idx) => (
            <span key={idx} className="badge">{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {onReadReport && (
            <button 
              onClick={onReadReport} 
              className="btn btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              <BookOpen size={16} />
              <span>Read Full Report</span>
            </button>
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            {isExpanded ? (
              <>
                <span>Hide Outline</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span>View Outline</span>
                <ChevronDown size={16} />
              </>
            )}
          </button>
          <a 
            href={report.pdfUrl} 
            className="btn btn-outline"
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            <ArrowDownToLine size={16} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {isExpanded && (
        <div className="report-details-drawer">
          <div className="findings-container">
            <h4 className="findings-title" style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} style={{ color: 'var(--accent-cyan)' }} />
              <span>Key Research Findings</span>
            </h4>
            <ul className="findings-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {report.keyFindings.map((finding, idx) => (
                <li key={idx} style={{ position: 'relative', paddingLeft: '20px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--accent-cyan)' }}>→</span>
                  {finding}
                </li>
              ))}
            </ul>
          </div>

          <div className="toc-container">
            <h4 className="toc-title" style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} style={{ color: 'var(--accent-indigo)' }} />
              <span>Report Outline</span>
            </h4>
            <ul className="toc-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {report.tableOfContents.map((chapter, idx) => (
                <li key={idx} style={{ padding: '8px 12px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', borderLeft: '2px solid var(--accent-indigo)', color: 'var(--text-secondary)' }}>
                  {chapter}
                </li>
              ))}
            </ul>
          </div>

          {report.sources && report.sources.length > 0 && (
            <div className="sources-section" style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--glass-border)', paddingTop: '24px', marginTop: '16px' }}>
              <h5 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 600 }}>Citations & References</h5>
              <ul className="sources-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px 24px' }}>
                {report.sources.map((source, idx) => (
                  <li key={idx} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileText size={12} />
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
