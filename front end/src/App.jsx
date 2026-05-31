import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AppProvider, useSahrdayaTech } from './context/AppContext';
import Admin from './pages/Admin';
import Events from './pages/Events';
import Home from './pages/Home';
import Internships from './pages/Internships';
import Login from './pages/Login';
import News from './pages/News';
import Placements from './pages/Placements';
import Research from './pages/Research';
import SubmitArticle from './pages/SubmitArticle';
import SubmitProject from './pages/SubmitProject';
import Videos from './pages/Videos';
import './App.css';

const routes = {
  '/': Home,
  '/news': News,
  '/videos': Videos,
  '/placements': Placements,
  '/internships': Internships,
  '/research': Research,
  '/events': Events,
  '/submit/article': SubmitArticle,
  '/submit/project': SubmitProject,
  '/login': Login,
  '/admin': Admin,
};

function useHashRoute() {
  const [path, setPath] = useState(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const onHashChange = () => setPath(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return routes[path] ? path : '/';
}

function AppShell() {
  const path = useHashRoute();
  const Page = routes[path];
  const { data, loading } = useSahrdayaTech();

  if (loading || !data) {
    return (
      <div className="loading-screen">
        <span className="brand-mark">ST</span>
        <p>Preparing the latest Sahrdaya Tech desk...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar currentPath={path} />
      <Page data={data} />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
