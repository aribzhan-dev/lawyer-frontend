interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {eyebrow && (
        <p className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl md:text-5xl font-semibold text-gray-900 dark:text-dark-50 leading-tight mb-4">
        {title}{' '}
        {titleHighlight && <span className="gold-text">{titleHighlight}</span>}
      </h2>
      <div className={`gold-divider mb-5 ${centered ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className="text-gray-600 dark:text-dark-300 text-base md:text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
