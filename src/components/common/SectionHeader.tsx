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
    <div className={centered ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 
        className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-dark-50 leading-[1.2] mb-4 break-words hyphens-auto"
        style={{ fontFamily: 'Tahoma, sans-serif' }}
      >
        {title} {titleHighlight && <span>{titleHighlight}</span>}
      </h2>
      <div className={`gold-divider mb-5 ${centered ? "mx-auto" : ""}`} />
      {subtitle && (
        <p
          className={`text-gray-600 dark:text-dark-300 text-base md:text-lg leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""}`}
        >
          {subtitle.split("\n").map((line, index, array) => (
            <span key={index}>
              {line}
              {index < array.length - 1 && <br />}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
