import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Users, Eye, Scale, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();

  // Hujjatdagi "Наши преимущества" ro'yxati — ikonkalar bilan
  const advantages = [
    { icon: Shield,       key: 'adv_1' }, // Независимость и беспристрастность
    { icon: Eye,          key: 'adv_2' }, // Конфиденциальность
    { icon: Clock,        key: 'adv_3' }, // Оперативность
    { icon: Scale,        key: 'adv_4' }, // Гибкость процедур
    { icon: Users,        key: 'adv_5' }, // Выбор арбитра
    { icon: CheckCircle,  key: 'adv_6' }, // Соответствие законодательству РК
  ] as const;

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
            backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-max section-padding relative z-10 pt-32 md:pt-40">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-gold-600 dark:text-gold-400 text-xs font-semibold tracking-[0.15em] uppercase">
              {t('hero.subtitle')}
            </span>
          </div>

          {/* Headline — hujjatdan: "Арбитраж города Шымкент и Туркестанской области" */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-gray-900 dark:text-dark-50 leading-[1.05] mb-6">
            {t('hero.title1')}
            <br />
            <span className="gold-text">{t('hero.title2')}</span>
            <br />
            <span className="text-gray-700 dark:text-dark-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {t('hero.title3')}
            </span>
          </h1>

          {/* Description — hujjatdan to'g'ridan-to'g'ri */}
          <p className="text-gray-600 dark:text-dark-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            {t('hero.description')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <Link to="/lawyers" className="btn-primary px-8 py-4 text-sm">
              {t('hero.cta_team')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="btn-outline px-8 py-4 text-sm">
              {t('hero.cta_services')}
            </Link>
            {/* About Us — <a> tegi orqali */}
            <Link to="/about-us" className="text-sm text-gray-500 dark:text-dark-400 hover:text-gold-500 transition-colors underline underline-offset-4">
              {t('about.page_eyebrow')}
            </Link>
          </div>

          {/* Advantages grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl">
            {advantages.map(({ icon: Icon, key }) => (
              <div
                key={key}
                className="flex items-center gap-2.5
                           bg-white dark:bg-dark-800/60
                           shadow-sm dark:shadow-none
                           rounded-xl px-3 py-3
                           text-gray-700 dark:text-dark-200
                           text-xs font-medium
                           overflow-hidden"
              >
                <div className="w-6 h-6 rounded-md bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-gold-500" />
                </div>
                <span className="leading-snug min-w-0 break-words">{t(`hero.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
