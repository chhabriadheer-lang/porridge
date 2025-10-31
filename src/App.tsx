import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Team from './pages/Team';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [blogId, setBlogId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page);
    if (id) setBlogId(id);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'team':
        return <Team />;
      case 'insights':
        return <Insights />;
      case 'contact':
        return <Contact />;
      case 'blog':
        return <Blog onNavigate={handleNavigate} />;
      case 'blog-detail':
        return blogId ? <BlogDetail blogId={blogId} onNavigate={handleNavigate} /> : <Blog onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
