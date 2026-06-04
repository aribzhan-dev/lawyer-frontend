import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-dark-gradient"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-gold-500/5 blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-gold-600/4 blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-max section-padding relative z-10 pt-32 md:pt-40">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.15em] uppercase">
              {t('hero.subtitle')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-gray-900 dark:text-dark-50 leading-[1.05] mb-6">
            {t('hero.title1')}
            <br />
            <span className="gold-text">{t('hero.title2')}</span>
            <br />
            <span className="text-gray-700 dark:text-dark-200">{t('hero.title3')}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-gray-600 dark:text-dark-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            {t('hero.description')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link to="/lawyers" className="btn-primary px-8 py-4 text-sm">
              {t('hero.cta_team')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="btn-outline px-8 py-4 text-sm">
              {t('hero.cta_services')}
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-8">
            {[
              { icon: Shield, label: t('metrics.protected', '100% Confidential') },
              { icon: Award, label: t('metrics.success_rate', 'Top Ranked Firm') },
              { icon: Users, label: t('metrics.clients', '500+ Clients') },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-gray-500 dark:text-dark-400 text-sm">
                <div className="w-7 h-7 rounded-md bg-gold-500/10 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-gold-500" />
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-gray-500 dark:text-dark-500 text-[10px] tracking-widest uppercase">{t('hero.scroll', 'Прокрутка')}</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-300 dark:from-dark-500 to-transparent" />
      </div>
    </section>
  );
}
