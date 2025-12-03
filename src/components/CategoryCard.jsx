import { getCategoryIcon, getCategoryColor, getCategoryGradient } from '../models/TermCategory.js';

export default function CategoryCard({ category, onClick }) {
  const icon = getCategoryIcon(category);
  const color = getCategoryColor(category);
  const gradient = getCategoryGradient(category);

  return (
    <div
      className="card cursor-pointer"
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${gradient[0]}15 0%, ${gradient[1]}10 50%, ${gradient[2]}05 100%)`,
        border: `1px solid ${color}40`,
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}
    >
      <div style={{ fontSize: '32px' }}>{icon}</div>
      <div
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: color,
          textAlign: 'center'
        }}
      >
        {category}
      </div>
    </div>
  );
}

