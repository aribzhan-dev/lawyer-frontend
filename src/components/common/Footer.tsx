import { Link } from 'react-router-dom';
import { Scale, Phone, Mail, MapPin, Linkedin, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const services = [t('services.title1') + ' ' + t('services.title2')];

  return (
    <footer className="bg-white dark:bg-dark-950 border-t border-gray-200/60 dark:border-gray-200 dark:border-dark-800/60">
      {/* Main footer */}
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold-gradient">
                <Scale className="w-5 h-5 text-white dark:text-dark-950" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-serif text-xl font-semibold text-gray-900 dark:text-dark-50">
                  Арбит<span className="text-gold-400">раж</span>
                </span>
                <p className="text-[10px] text-gray-500 dark:text-dark-400 tracking-widest uppercase -mt-0.5">Шымкент</p>
              </div>
            </Link>
            <p className="text-gray-500 dark:text-dark-400 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white dark:bg-dark-800 text-gray-500 dark:text-dark-400 hover:text-gold-400 hover:bg-gray-100 dark:bg-dark-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white dark:bg-dark-800 text-gray-500 dark:text-dark-400 hover:text-gold-400 hover:bg-gray-100 dark:bg-dark-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg text-gray-900 dark:text-dark-50 mb-4">{t('services.page_eyebrow')}</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-gray-500 dark:text-dark-400 text-sm hover:text-gold-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-600 group-hover:bg-gold-400 transition-colors" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-gray-900 dark:text-dark-50 mb-4">{t('footer.quick_links', 'Навигация')}</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/services', label: t('nav.services') },
                { to: '/lawyers', label: t('nav.lawyers') },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-500 dark:text-dark-400 text-sm hover:text-gold-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-600 group-hover:bg-gold-400 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-gray-900 dark:text-dark-50 mb-4">{t('footer.contact_us')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 dark:text-dark-400 text-sm">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span>Казахстан, город Шымкент, район Тұран,<br />Микрорайон 8, дом 54, кв. 18<br />Индекс: 160000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-dark-400 text-sm">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href="tel:+77000000000" className="hover:text-gold-400 transition-colors">
                  +7 (700) 000-00-00
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-dark-400 text-sm">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href="mailto:info@arbitraj-shymkent.kz" className="hover:text-gold-400 transition-colors">
                  info@arbitraj-shymkent.kz
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200/60 dark:border-gray-200 dark:border-dark-800/60">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 dark:text-dark-500 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} ТОО «Постоянно действующий Арбитраж города Шымкент и Туркестанской области». {t('footer.rights')}
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-gray-500 dark:text-dark-500 text-xs hover:text-gray-600 dark:text-dark-300 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 dark:text-dark-500 text-xs hover:text-gray-600 dark:text-dark-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
