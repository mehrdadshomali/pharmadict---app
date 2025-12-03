import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { pharmacyTermService } from '../services/PharmacyTermService.js';
import { ALL_CATEGORIES } from '../models/TermCategory.js';
import CategoryCard from '../components/CategoryCard.jsx';
import TermCard from '../components/TermCard.jsx';
import PharmadicTitle from '../components/PharmadicTitle.jsx';

export default function HomeView() {
  const [searchText, setSearchText] = useState('');
  const [quickSearchResults, setQuickSearchResults] = useState([]);
  const [recentTerms, setRecentTerms] = useState([]);
  const [featuredTerms, setFeaturedTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchText.trim()) {
      const results = pharmacyTermService.searchTerms(searchText, {
        categories: ALL_CATEGORIES
      });
      setQuickSearchResults(results.slice(0, 5).map(r => r.term));
    } else {
      setQuickSearchResults([]);
    }
  }, [searchText]);

  const loadData = () => {
    setIsLoading(true);
    const allTerms = pharmacyTermService.getAllTerms();
    
    // Get recent terms (last 5)
    const sortedByDate = [...allTerms].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    setRecentTerms(sortedByDate.slice(0, 5));

    // Get featured terms (random 5)
    const shuffled = [...allTerms].sort(() => 0.5 - Math.random());
    setFeaturedTerms(shuffled.slice(0, 5));

    setIsLoading(false);
  };

  const clearSearch = () => {
    setSearchText('');
    setQuickSearchResults([]);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ padding: '16px' }}>
        {/* Header */}
        <div
          className="card fade-in"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(6, 182, 212, 0.06) 50%, rgba(16, 185, 129, 0.04) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            marginBottom: '20px',
            padding: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px'
              }}
            >
              💊
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #1f2937 0%, #3B82F6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '4px'
                }}
              >
                Pharmadict ile keşfet
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  background: 'linear-gradient(135deg, #6b7280 0%, #06B6D4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Güncel terimlere kolayca eriş
              </div>
            </div>
          </div>
        </div>

        {/* Quick Search */}
        <div className="fade-in" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '20px' }}>🔍</span>
            <input
              type="text"
              className="input"
              placeholder="Terim ara..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ flex: 1 }}
            />
            {searchText && (
              <button
                onClick={clearSearch}
                style={{
                  padding: '8px 12px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                Temizle
              </button>
            )}
          </div>

          {quickSearchResults.length > 0 && (
            <div
              className="card"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                marginTop: '12px'
              }}
            >
              {quickSearchResults.map((term) => (
                <Link
                  key={term.id}
                  to={`/term/${term.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 0',
                      borderBottom: '1px solid #e5e7eb'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>
                      {term.category === 'İlaçlar' ? '💊' : 
                       term.category === 'Bitkiler' ? '🌿' :
                       term.category === 'Vitaminler' ? '💉' :
                       term.category === 'Mineraller' ? '💎' :
                       term.category === 'Böcekler' ? '🐛' :
                       term.category === 'Bileşenler' ? '⚗️' :
                       term.category === 'Hastalıklar' ? '🏥' : '🫀'}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {term.latinName}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#6b7280',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {term.turkishName}
                      </div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="fade-in" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Kategoriler</h2>
            <Link
              to="/categories"
              style={{
                fontSize: '12px',
                color: '#93c5fd',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Tümünü Gör →
            </Link>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px'
            }}
          >
            {ALL_CATEGORIES.slice(0, 4).map((category) => (
              <Link
                key={category}
                to={`/category/${encodeURIComponent(category)}`}
                style={{ textDecoration: 'none' }}
              >
                <CategoryCard category={category} />
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Terms */}
        <div className="fade-in" style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
            Öne Çıkanlar
          </h2>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
              Yükleniyor...
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                gap: '16px',
                overflowX: 'auto',
                paddingBottom: '8px',
                scrollbarWidth: 'thin'
              }}
            >
              {featuredTerms.map((term) => (
                <TermCard key={term.id} term={term} featured={true} />
              ))}
            </div>
          )}
        </div>

        {/* Recent Terms */}
        <div className="fade-in" style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
            Son Eklenenler
          </h2>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
              Yükleniyor...
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recentTerms.map((term) => (
                <TermCard key={term.id} term={term} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

