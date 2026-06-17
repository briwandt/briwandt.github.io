import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function IntelNoteCard({ note, onReadMore }) {
  // Select badge color class based on category
  const getBadgeColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'ai security':
        return 'badge-purple';
      case 'identity security':
        return 'badge-cyan';
      case 'cloud security':
        return 'badge-emerald';
      default:
        return '';
    }
  };

  return (
    <div className="glass-card note-card">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className={`badge \${getBadgeColor(note.category)}`}>{note.category}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Clock size={12} />
            <span>{note.readingTime}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <Calendar size={12} />
          <span>{note.date}</span>
        </div>

        <h3 className="note-title">{note.title}</h3>
        <p className="note-summary">{note.summary}</p>
      </div>

      <button onClick={() => onReadMore(note)} className="note-read-btn">
        <span>Read Full Note</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
