export default function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-5 h-5', md: 'w-10 h-10', lg: 'w-16 h-16' };
  return (
    <div className="flex items-center justify-center" role="status" aria-label="Loading">
      <div
        className={`${sizeClasses[size]} rounded-full border-2 border-gray-200 dark:border-dark-700 border-t-gold-500 animate-spin`}
      />
    </div>
  );
}
