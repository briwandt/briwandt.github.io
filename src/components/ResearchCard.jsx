import React, { useState } from 'react';
import { FileText, Calendar, Tag, ChevronDown, ChevronUp, Lock, ArrowDownToLine, Compass, BookOpen } from 'lucide-react';

export default function ResearchCard({ report, onReadReport }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (report.isTeaser) {
    return (
      <div className="glass-card teaser-card">
        <div className="teaser-header">
          <div className="report-meta">
            <Calendar size={14} />
            <span>{report.date}</span>
          </div>
          <h3 className="teaser-title" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{report.title}</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.4', color: 'var(--text-secondary)' }}>{report.summary}</p>
        </div>
        <div className="teaser-footer">
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {report.tags.slice(0, 2).map((t, idx) => (
              <span key={idx} className="badge" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>{t}</span>
            ))}
          </div>
          <div className="teaser-lock">
            <Lock size={12} />
            <span>Teaser</span>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="report-meta">
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
            onClick={(e) => {
              if (report.pdfUrl === '#') {
                e.preventDefault();
                alert("This is a demo setup. In your production build, place your PDF report in 'public/research/Identity_at_the_Center_Report.pdf' and update the research.js link.");
              }
            }}
          >
            <ArrowDownToLine size={16} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {isExpanded && (
        <div className="report-details-drawer">
          <div className="findings-container">
            <h4 className="findings-title">
              <Compass size={18} style={{ color: 'var(--accent-cyan)' }} />
              <span>Key Research Findings</span>
            </h4>
            <ul className="findings-list">
              {report.keyFindings.map((finding, idx) => (
                <li key={idx}>{finding}</li>
              ))}
            </ul>
          </div>

          <div className="toc-container">
            <h4 className="toc-title">
              <BookOpen size={18} style={{ color: 'var(--accent-indigo)' }} />
              <span>Report Outline</span>
            </h4>
            <ul className="toc-list">
              {report.tableOfContents.map((chapter, idx) => (
                <li key={idx}>{chapter}</li>
              ))}
            </ul>
          </div>

          {report.sources && report.sources.length > 0 && (
            <div className="sources-section">
              <h5 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '12px' }}>Citations & References</h5>
              <ul className="sources-list">
                {report.sources.map((source, idx) => (
                  <li key={idx}>
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
