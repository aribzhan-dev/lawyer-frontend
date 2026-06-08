import type { ReactNode } from 'react';
import { NavLink, useNavigate, Outlet, Link } from 'react-router-dom';
import { Scale, Users, Briefcase, LogOut, LayoutDashboard, ChevronRight, ExternalLink, FileText } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Дашборд', end: true },
  { to: '/admin/lawyers', icon: Users, label: 'Адвокаты' },
  { to: '/admin/services', icon: Briefcase, label: 'Услуги' },
  { to: '/admin/documents', icon: FileText, label: 'Документы' },
];

interface AdminLayoutProps {
  children?: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { logout, user } = useAuthStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    addToast({ type: 'info', message: 'Вы успешно вышли из системы' });
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-dark-950">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gray-50 dark:bg-dark-900 border-r border-gray-200 dark:border-dark-800 flex flex-col">
        {/* Brand */}
        <div className="p-6 border-b border-gray-200 dark:border-dark-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center">
              <Scale className="w-4.5 h-4.5 text-white dark:text-dark-950" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-serif text-base text-gray-900 dark:text-dark-50">
                Арбит<span className="text-gold-400">раж</span>
              </div>
              <div className="text-[10px] text-gray-500 dark:text-dark-500 tracking-widest uppercase">Шымкент</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gold-500/15 text-gold-400 border border-gold-500/20'
                    : 'text-gray-500 dark:text-dark-400 hover:text-gray-800 dark:text-dark-100 hover:bg-white dark:bg-dark-800'
                }`
              }
              id={`admin-nav-${label.toLowerCase()}`}
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-gray-500 dark:text-dark-500 group-hover:text-gray-600 dark:text-dark-300'}`} />
                  <span className="flex-1">{label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-gold-500/60" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-dark-800 space-y-3">
          {user && (
            <div className="px-3 py-2 glass-card">
              <p className="text-gray-500 dark:text-dark-400 text-xs">Вошли как</p>
              <p className="text-gray-800 dark:text-dark-100 text-sm font-medium truncate">{user.email}</p>
            </div>
          )}
          
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-dark-400 hover:text-gold-400 hover:bg-gold-500/10 transition-all duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            На сайт
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            id="admin-logout-btn"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
        {children}
      </main>
    </div>
  );
}
