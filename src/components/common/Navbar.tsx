import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Scale, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '../../store/uiStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useUIStore();

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/lawyers', label: t('nav.lawyers') },
    { to: '/documents', label: t('nav.documents') },
    { to: '/about-us', label: t('nav.about_us') },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'kk' : 'ru');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white dark:bg-dark-950 border-b border-gray-200 dark:border-dark-800 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold-gradient">
              <Scale className="w-5 h-5 text-white dark:text-dark-950" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-serif text-xl font-semibold text-gray-900 dark:text-dark-50">
                Арбит<span className="text-gold-400">раж</span>
              </span>
              <p className="text-[10px] text-gray-500 dark:text-dark-400 tracking-widest uppercase -mt-0.5">Шымкент</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                    isActive ? 'text-gold-400' : 'text-gray-600 dark:text-dark-300 hover:text-gray-900 dark:hover:text-dark-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-gold-gradient transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Actions + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {/* RU/KK tugmasi — scrolled holatda ham, transparent holatda ham ko'rinadi */}
              <button
                onClick={toggleLanguage}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-semibold uppercase transition-colors ${
                  scrolled
                    ? 'text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-800'
                    : 'text-gray-900 dark:text-dark-50 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {i18n.language.toUpperCase()}
              </button>

              {/* Tema tugmasi */}
              <button
                onClick={toggleTheme}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  scrolled
                    ? 'text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-800'
                    : 'text-gray-900 dark:text-dark-50 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>

            {/* Burger menu tugmasi */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? 'text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-800'
                  : 'text-gray-900 dark:text-dark-50 hover:bg-black/5 dark:hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
              id="navbar-menu-toggle"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — solid background, no transparency */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800 animate-slide-down shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `block px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gold-500/10 text-gold-600 dark:text-gold-400 font-semibold'
                      : 'text-gray-700 dark:text-dark-200 hover:bg-gray-50 dark:hover:bg-dark-800'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
