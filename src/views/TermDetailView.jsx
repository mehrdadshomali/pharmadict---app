import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { pharmacyTermService } from '../services/PharmacyTermService.js';
import { getCategoryIcon, getCategoryColor } from '../models/TermCategory.js';
import PharmadicTitle from '../components/PharmadicTitle.jsx';

export default function TermDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [term, setTerm] = useState(null);
  const [relatedTerms, setRelatedTerms] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (id) {
      const foundTerm = pharmacyTermService.getTermById(id);
      if (foundTerm) {
        setTerm(foundTerm);
        setIsBookmarked(foundTerm.isBookmarked);
        const related = pharmacyTermService.getRelatedTerms(foundTerm);
        setRelatedTerms(related);
      }
    }
  }, [id]);

  const toggleBookmark = () => {
    if (term) {
      const newBookmarkState = pharmacyTermService.toggleBookmark(term.id);
      setIsBookmarked(newBookmarkState);
      if (term) {
        term.isBookmarked = newBookmarkState;
      }
    }
  };

  if (!term) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ padding: '16px', textAlign: 'center', color: 'white' }}>
          <PharmadicTitle />
          <div style={{ marginTop: '40px' }}>Terim bulunamadı.</div>
        </div>
      </div>
    );
  }

  const icon = getCategoryIcon(term.category);
  const color = getCategoryColor(term.category);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ← Geri
          </button>
          <PharmadicTitle />
        </div>

        <div className="card fade-in">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
              <div style={{ fontSize: '48px' }}>{icon}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: color
                  }}
                >
                  {term.latinName}
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    color: '#6b7280',
                    marginBottom: '8px'
                  }}
                >
                  {term.turkishName}
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    background: `${color}20`,
                    borderRadius: '8px',
                    color: color,
                    fontSize: '14px',
                    fontWeight: 600
                  }}
                >
                  {term.category}
                </div>
              </div>
            </div>
            <button
              onClick={toggleBookmark}
              style={{
                padding: '12px',
                background: isBookmarked ? color : '#e5e7eb',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '24px',
                transition: 'all 0.2s'
              }}
            >
              {isBookmarked ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Definition */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
              Tanım
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
              {term.definition}
            </p>
          </div>

          {/* Etymology */}
          {term.etymology && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
                Etimoloji
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
                {term.etymology}
              </p>
            </div>
          )}

          {/* Usage */}
          {term.usage && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
                Kullanım
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
                {term.usage}
              </p>
            </div>
          )}

          {/* Components */}
          {term.components && term.components.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
                Bileşenler
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {term.components.map((component, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '6px 12px',
                      background: '#f3f4f6',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#374151'
                    }}
                  >
                    {component}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dosage */}
          {term.dosage && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
                Dozaj
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
                {term.dosage}
              </p>
            </div>
          )}

          {/* Side Effects */}
          {term.sideEffects && term.sideEffects.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
                Yan Etkiler
              </h3>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#374151' }}>
                {term.sideEffects.map((effect, index) => (
                  <li key={index} style={{ marginBottom: '4px', fontSize: '16px' }}>
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contraindications */}
          {term.contraindications && term.contraindications.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
                Kontrendikasyonlar
              </h3>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#374151' }}>
                {term.contraindications.map((contra, index) => (
                  <li key={index} style={{ marginBottom: '4px', fontSize: '16px' }}>
                    {contra}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactions */}
          {term.interactions && term.interactions.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
                İlaç Etkileşimleri
              </h3>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#374151' }}>
                {term.interactions.map((interaction, index) => (
                  <li key={index} style={{ marginBottom: '4px', fontSize: '16px' }}>
                    {interaction}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Synonyms */}
          {term.synonyms && term.synonyms.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
                Eş Anlamlılar
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {term.synonyms.map((synonym, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '6px 12px',
                      background: '#f3f4f6',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#374151'
                    }}
                  >
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Terms */}
          {relatedTerms.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
                İlgili Terimler
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {relatedTerms.map((relatedTerm) => (
                  <Link
                    key={relatedTerm.id}
                    to={`/term/${relatedTerm.id}`}
                    style={{
                      padding: '12px',
                      background: '#f3f4f6',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#374151',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
                  >
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                      {relatedTerm.latinName}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                      {relatedTerm.turkishName}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

