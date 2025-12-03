import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { pharmacyTermService } from '../services/PharmacyTermService.js';
import { ALL_CATEGORIES } from '../models/TermCategory.js';
import CategoryCard from '../components/CategoryCard.jsx';
import TermCard from '../components/TermCard.jsx';
import PharmadicTitle from '../components/PharmadicTitle.jsx';

export default function CategoriesView() {
  const { categoryName } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(categoryName ? decodeURIComponent(categoryName) : null);
  const [terms, setTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      loadCategoryTerms(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(decodeURIComponent(categoryName));
    }
  }, [categoryName]);

  const loadCategoryTerms = (category) => {
    setIsLoading(true);
    const categoryTerms = pharmacyTermService.getTermsByCategory(category);
    setTerms(categoryTerms);
    setIsLoading(false);
  };

  if (selectedCategory) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <button
              onClick={() => setSelectedCategory(null)}
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

          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px'
            }}
          >
            {selectedCategory}
          </h1>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
              Yükleniyor...
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {terms.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  Bu kategoride terim bulunamadı.
                </div>
              ) : (
                terms.map((term) => <TermCard key={term.id} term={term} />)
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ padding: '16px' }}>
        <div style={{ marginBottom: '20px' }}>
          <PharmadicTitle />
        </div>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px'
          }}
        >
          Kategoriler
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}
        >
          {ALL_CATEGORIES.map((category) => (
            <Link
              key={category}
              to={`/category/${encodeURIComponent(category)}`}
              style={{ textDecoration: 'none' }}
            >
              <CategoryCard
                category={category}
                onClick={() => setSelectedCategory(category)}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

