import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainTabView from './components/MainTabView.jsx';
import HomeView from './views/HomeView.jsx';
import CategoriesView from './views/CategoriesView.jsx';
import SearchView from './views/SearchView.jsx';
import BookmarksView from './views/BookmarksView.jsx';
import TermDetailView from './views/TermDetailView.jsx';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/term/:id" element={<TermDetailView />} />
        <Route path="/" element={<MainTabView />}>
          <Route index element={<HomeView />} />
          <Route path="categories" element={<CategoriesView />} />
          <Route path="category/:categoryName" element={<CategoriesView />} />
          <Route path="search" element={<SearchView />} />
          <Route path="bookmarks" element={<BookmarksView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

