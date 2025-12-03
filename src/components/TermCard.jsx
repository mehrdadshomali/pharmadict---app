import { getCategoryIcon, getCategoryColor } from '../models/TermCategory.js';
import { Link } from 'react-router-dom';

export default function TermCard({ term, featured = false }) {
  const icon = getCategoryIcon(term.category);
  const color = getCategoryColor(term.category);

  if (featured) {
    return (
      <Link
        to={`/term/${term.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div
          className="card fade-in"
          style={{
            width: '200px',
            minHeight: '140px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '20px' }}>{icon}</span>
            <span
              style={{
                fontSize: '12px',
                padding: '4px 8px',
                background: `${color}20`,
                borderRadius: '8px',
                color: color,
                fontWeight: 600
              }}
            >
              {term.category}
            </span>
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {term.latinName}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.4',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {term.turkishName}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#9ca3af',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {term.definition}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/term/${term.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="card fade-in" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontSize: '24px' }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '1.4',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {term.latinName}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.4',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginTop: '4px'
            }}
          >
            {term.turkishName}
          </div>
        </div>
        <div
          style={{
            fontSize: '12px',
            padding: '4px 8px',
            background: `${color}20`,
            borderRadius: '8px',
            color: color,
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}
        >
          {term.category}
        </div>
      </div>
    </Link>
  );
}

