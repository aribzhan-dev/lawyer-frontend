import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Ilova daraxtidagi kutilmagan xatolarni ushlab, oq ekran o'rniga
 * foydalanuvchiga tushunarli xabar ko'rsatadi.
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Production'da bu yerga monitoring (Sentry va h.k.) ulanishi mumkin.
    console.error('Unhandled UI error:', error, info.componentStack);
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center bg-white dark:bg-dark-950">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-50">
          Произошла ошибка
        </h1>
        <p className="text-gray-500 dark:text-dark-400 text-sm max-w-md">
          Что-то пошло не так. Попробуйте обновить страницу.
        </p>
        <button
          onClick={this.handleReload}
          className="btn-primary"
        >
          Обновить страницу
        </button>
      </div>
    );
  }
}
