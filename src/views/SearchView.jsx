import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { pharmacyTermService } from '../services/PharmacyTermService.js';
import { ALL_CATEGORIES, TermCategory } from '../models/TermCategory.js';
import TermCard from '../components/TermCard.jsx';
import PharmadicTitle from '../components/PharmadicTitle.jsx';

export default function SearchView() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(new Set(ALL_CATEGORIES));
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [sortBy, setSortBy] = useState('Alfabetik');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const filteredResults = useMemo(() => {
    if (!searchText.trim()) {
      return [];
    }

    setIsSearching(true);
    const searchResults = pharmacyTermService.searchTerms(searchText, {
      categories: Array.from(selectedCategories),
      onlyBookmarked,
      sortBy
    });

    setIsSearching(false);
    return searchResults.map(r => r.term);
  }, [searchText, selectedCategories, onlyBookmarked, sortBy]);

  useEffect(() => {
    setResults(filteredResults);
  }, [filteredResults]);

  const toggleCategory = (category) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ padding: '16px' }}>
        <div style={{ marginBottom: '20px' }}>
          <PharmadicTitle />
        </div>

        {/* Search Input */}
        <div style={{ marginBottom: '20px' }}>
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
                onClick={() => setSearchText('')}
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
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Filtreler</h3>
          
          {/* Categories */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#6b7280' }}>
              Kategoriler
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {ALL_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  style={{
                    padding: '6px 12px',
                    background: selectedCategories.has(category) ? '#3B82F6' : '#e5e7eb',
                    color: selectedCategories.has(category) ? 'white' : '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Other Filters */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={onlyBookmarked}
                onChange={(e) => setOnlyBookmarked(e.target.checked)}
              />
              <span style={{ fontSize: '14px' }}>Sadece Favoriler</span>
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px' }}>Sıralama:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '6px 12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="Alfabetik">Alfabetik</option>
                <option value="Kategoriye Göre">Kategoriye Göre</option>
                <option value="Son Eklenenler">Son Eklenenler</option>
                <option value="Favoriler">Favoriler</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
            {searchText ? `Arama Sonuçları (${results.length})` : 'Arama yapmak için yukarıdaki alanı kullanın'}
          </h2>

          {isSearching ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
              Aranıyor...
            </div>
          ) : results.length === 0 && searchText ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              Sonuç bulunamadı.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {results.map((term) => (
                <TermCard key={term.id} term={term} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

