import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Search, Grid3x3, Heart } from 'lucide-react';

const MainTabView = () => {
  const location = useLocation();

  const tabs = [
    { path: '/', icon: Home, label: 'Ana Sayfa' },
    { path: '/search', icon: Search, label: 'Arama' },
    { path: '/categories', icon: Grid3x3, label: 'Kategoriler' },
    { path: '/bookmarks', icon: Heart, label: 'Favoriler' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.path);
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`w-6 h-6 ${active ? 'stroke-2' : ''}`} />
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainTabView;

