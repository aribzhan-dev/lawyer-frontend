interface BadgeProps {
  label: string;
  variant?: 'gold' | 'dark' | 'green';
}

const variants = {
  gold: 'bg-gold-500/15 text-gold-400 border-gold-500/20',
  dark: 'bg-gray-100/60 dark:bg-dark-700/60 text-gray-600 dark:text-dark-300 border-gray-300/40 dark:border-dark-600/40',
  green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
};

export default function Badge({ label, variant = 'gold' }: BadgeProps) {
  return (
    <span className={`badge ${variants[variant]}`}>
      {label}
    </span>
  );
}
