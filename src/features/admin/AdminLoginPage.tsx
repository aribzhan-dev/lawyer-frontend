import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import apiClient from '@/api/apiClient';
import type { Token } from '@/types/auth';
import Button from '@/components/common/Button';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { setToken, isAuthenticated } = useAuthStore();
  const { addToast } = useUIStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/admin', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // OAuth2 password form requires URL-encoded body
      const form = new URLSearchParams();
      form.append('username', email);
      form.append('password', password);
      const { data } = await apiClient.post<Token>('/auth/login', form, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      setToken(data.access_token);
      addToast({ type: 'success', message: 'Signed in successfully' });
      navigate('/admin');
    } catch {
      addToast({ type: 'error', message: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-dark-gradient px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center">
            <Scale className="w-7 h-7 text-white dark:text-dark-950" strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <h1 className="font-serif text-3xl text-gray-900 dark:text-dark-50">Панель Администратора</h1>
            <p className="text-gray-500 dark:text-dark-400 text-sm mt-1">Арбитраж Шымкент</p>
          </div>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="admin-email" className="label">Электронная почта</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                autoComplete="email"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="label">Пароль</label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-dark-400 hover:text-gray-700 dark:hover:text-dark-200"
                  aria-label={showPwd ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full justify-center py-3.5"
              id="admin-login-submit"
            >
              Войти в систему
            </Button>
          </form>
        </div>

        <p className="text-center text-gray-400 dark:text-dark-600 text-xs mt-6">
          Доступ разрешен только для авторизованного персонала.
        </p>
      </div>
    </div>
  );
}
