import { useState, useEffect } from 'react';
import { pharmacyTermService } from '../services/PharmacyTermService.js';
import TermCard from '../components/TermCard.jsx';
import PharmadicTitle from '../components/PharmadicTitle.jsx';

export default function BookmarksView() {
  const [bookmarkedTerms, setBookmarkedTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    setIsLoading(true);
    const bookmarks = pharmacyTermService.getBookmarkedTerms();
    setBookmarkedTerms(bookmarks);
    setIsLoading(false);
  };

  // Reload when bookmarks change (simple polling for now)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentBookmarks = pharmacyTermService.getBookmarkedTerms();
      if (currentBookmarks.length !== bookmarkedTerms.length) {
        setBookmarkedTerms(currentBookmarks);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [bookmarkedTerms.length]);

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
          Favoriler ({bookmarkedTerms.length})
        </h1>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
            Yükleniyor...
          </div>
        ) : bookmarkedTerms.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>❤️</div>
            <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
              Henüz favori terim eklenmemiş
            </div>
            <div style={{ fontSize: '14px', color: '#9ca3af' }}>
              Terim detay sayfasından favorilere ekleyebilirsiniz.
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {bookmarkedTerms.map((term) => (
              <TermCard key={term.id} term={term} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

