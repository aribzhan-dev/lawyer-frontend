import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

const icons = {
  success: <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />,
  error: <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />,
  info: <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />,
};

const borders = {
  success: 'border-l-emerald-500',
  error: 'border-l-red-500',
  info: 'border-l-blue-500',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  if (!toasts.length) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 border-l-4 ${borders[toast.type]} shadow-xl shadow-gray-200/60 dark:shadow-dark-950/60 animate-slide-up`}
        >
          {icons[toast.type]}
          <span className="flex-1 text-gray-800 dark:text-dark-100 text-sm leading-snug">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-500 dark:text-dark-500 hover:text-gray-700 dark:text-dark-200 transition-colors -mt-0.5"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
