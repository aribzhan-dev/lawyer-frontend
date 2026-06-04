import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import AppRouter from '@/router/AppRouter';
import ToastContainer from './components/common/ToastContainer';
import Spinner from './components/common/Spinner';
import { useUIStore } from './store/uiStore';

function App() {
  const isLoading = useUIStore((state) => state.isLoading);
  const theme = useUIStore((state) => state.theme);
  const { i18n } = useTranslation();

  // Sync theme with HTML class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle rtl or specific html lang attributes if needed
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      {isLoading && <Spinner />}
      <AppRouter />
    </>
  );
}

export default App;
