import { useEffect, useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

export default function MainTabView() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/search')) {
      setActiveTab('search');
    } else if (path.startsWith('/categories') || path.startsWith('/category')) {
      setActiveTab('categories');
    } else if (path.startsWith('/bookmarks')) {
      setActiveTab('bookmarks');
    } else {
      setActiveTab('home');
    }
  }, [location.pathname]);

  const tabs = [
    { id: 'home', label: 'Ana Sayfa', icon: '🏠', path: '/' },
    { id: 'categories', label: 'Kategoriler', icon: '📂', path: '/categories' },
    { id: 'search', label: 'Ara', icon: '🔍', path: '/search' },
    { id: 'bookmarks', label: 'Favoriler', icon: '❤️', path: '/bookmarks' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Content Area */}
      <div style={{ flex: 1, paddingBottom: '80px' }}>
        <Outlet />
      </div>

      {/* Tab Bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '12px 0',
          zIndex: 1000,
          boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: activeTab === tab.id ? '#3B82F6' : '#6b7280',
              transition: 'color 0.2s',
              padding: '8px 16px',
              borderRadius: '8px'
            }}
          >
            <span style={{ fontSize: '24px' }}>{tab.icon}</span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: activeTab === tab.id ? 600 : 400
              }}
            >
              {tab.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

