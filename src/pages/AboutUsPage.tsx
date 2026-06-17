import {
  Scale,
  Shield,
  Clock,
  Users,
  Eye,
  CheckCircle,
  FileText,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutUsPage() {
  const { t } = useTranslation();

  // Hujjatdagi 8 ta afzallik (Наши преимущества)
  const advantages = [
    { icon: Shield, key: "adv_1" },
    { icon: Eye, key: "adv_2" },
    { icon: Clock, key: "adv_3" },
    { icon: Scale, key: "adv_4" },
    { icon: Users, key: "adv_5" },
    { icon: CheckCircle, key: "adv_6" },
  ] as const;

  // Hujjatdagi kompetensiya ro'yxati
  const competenceItems = (t("about.competence_items") as string).split(";");

  // 4 bosqichlik jarayon (hujjatdan: ПОРЯДОК ОБРАЩЕНИЯ В АРБИТРАЖ)
  const steps = [
    { num: "01", title: t("about.step1_title"), text: t("about.step1_text") },
    { num: "02", title: t("about.step2_title"), text: t("about.step2_text") },
    { num: "03", title: t("about.step3_title"), text: t("about.step3_text") },
    { num: "04", title: t("about.step4_title"), text: t("about.step4_text") },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-dark-950 pt-[200px] sm:pt-[160px] md:pt-48 pb-20">
      {/* ── Hero Header ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-950 border-b border-gray-200/60 dark:border-dark-800/60 py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-[100px]" />
        </div>

        <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-gold-600 dark:text-gold-400 text-xs font-semibold tracking-widest uppercase">
              {t("about.page_eyebrow")}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-dark-50 leading-tight mb-4">
            {t("about.page_title1")}
            <br />
            {t("about.page_title2")}
          </h1>
          <p className="text-gray-500 dark:text-dark-400 text-lg max-w-3xl leading-relaxed">
            {t("about.page_desc")}
          </p>
        </div>
      </section>

      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* ── Missiya + Huquqiy asos ──────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12">
          {/* Maqsad */}
          <div className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-5">
              <Scale className="w-6 h-6 text-gold-500" />
            </div>
            <h2 className=" text-2xl text-gray-900 dark:text-dark-50 mb-3">
              {t("about.mission_title")}
            </h2>
            <div className="w-10 h-0.5 bg-gold-gradient mb-4" />
            <p className="text-gray-600 dark:text-dark-300 text-sm leading-relaxed">
              {t("about.mission_text")}
            </p>
          </div>

          {/* Huquqiy asos */}
          <div className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-5">
              <FileText className="w-6 h-6 text-gold-500" />
            </div>
            <h2 className=" text-2xl text-gray-900 dark:text-dark-50 mb-3">
              {t("about.reg_title")}
            </h2>
            <div className="w-10 h-0.5 bg-gold-gradient mb-4" />
            <p className="text-gray-600 dark:text-dark-300 text-sm leading-relaxed mb-4">
              {t("about.reg_text")}
            </p>
            {/* Prinsiplar */}
            <p className="text-gold-600 dark:text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
              {t("about.principles_title")}
            </p>
            <p className="text-gray-500 dark:text-dark-400 text-xs leading-relaxed">
              {t("about.principles")}
            </p>
          </div>
        </div>

        {/* ── Arbitraj nima? ──────────────────────────────────── */}
        <section className="py-10 border-t border-gray-200/60 dark:border-dark-800/60">
          <div className="max-w-3xl">
            <h2 className=" text-3xl text-gray-900 dark:text-dark-50 mb-2">
              {t("about.arbitration_title")}
            </h2>
            <div className="w-12 h-0.5 bg-gold-gradient mb-6" />
            <p className="text-gray-600 dark:text-dark-300 leading-relaxed text-base">
              {t("about.arbitration_text")}
            </p>
          </div>
        </section>

        {/* ── Kompetentsiya — hujjatdagi ro'yxat ──────────────── */}
        <section className="py-10 border-t border-gray-200/60 dark:border-dark-800/60">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className=" text-3xl text-gray-900 dark:text-dark-50 mb-2">
                {t("about.competence_title")}
              </h2>
              <div className="w-12 h-0.5 bg-gold-gradient mb-4" />
              <p className="text-gray-500 dark:text-dark-400 text-sm mb-5">
                {t("about.competence_text")}
              </p>
              <ul className="space-y-2.5">
                {competenceItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-dark-300"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arbiraj ogovorkasi */}
            <div className="glass-card p-6 border-l-2 border-gold-500/40">
              <p className="text-gold-600 dark:text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
                {t("about.clause_title")}
              </p>
              <blockquote className="text-gray-600 dark:text-dark-300 text-sm leading-relaxed italic">
                {t("about.clause_text")}
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── Murojaat tartibi (4 qadam) ──────────────────────── */}
        <section className="py-10 border-t border-gray-200/60 dark:border-dark-800/60">
          <h2 className=" text-3xl text-gray-900 dark:text-dark-50 mb-2">
            {t("about.process_title")}
          </h2>
          <div className="w-12 h-0.5 bg-gold-gradient mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="glass-card p-5 flex flex-col gap-3 group hover:border-gold-500/30 transition-colors"
              >
                <span className=" text-3xl text-gold-500/30 font-semibold leading-none">
                  {step.num}
                </span>
                <p className="text-gold-600 dark:text-gold-400 text-xs font-semibold uppercase tracking-wider">
                  {step.title}
                </p>
                <p className="text-gray-600 dark:text-dark-300 text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Afzalliklar ─────────────────────────────────────── */}
        <section className="py-10 border-t border-gray-200/60 dark:border-dark-800/60">
          <h2 className=" text-3xl text-gray-900 dark:text-dark-50 mb-2">
            {t("about.advantages_title")}
          </h2>
          <div className="w-12 h-0.5 bg-gold-gradient mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map(({ icon: Icon, key }, idx) => (
              <div
                key={key}
                className="glass-card p-5 flex items-start gap-4 group hover:border-gold-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <Icon className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <span className="text-[10px] text-gold-500 font-semibold tracking-widest uppercase mb-1 block">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-gray-700 dark:text-dark-200 text-sm font-medium">
                    {t(`about.${key}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Joylashuv va Kontakt ─────────────────────────────── */}
        <section className="py-10 border-t border-gray-200/60 dark:border-dark-800/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Manzil */}
            <div>
              <h2 className=" text-2xl text-gray-900 dark:text-dark-50 mb-2">
                {t("about.location_title")}
              </h2>
              <div className="w-10 h-0.5 bg-gold-gradient mb-5" />
              <div className="flex items-start gap-3 text-gray-600 dark:text-dark-300 text-sm">
                <MapPin className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  Казахстан, город Шымкент,
                  <br />
                  район Тұран, Микрорайон 8,
                  <br />
                  дом 54, кв. 18
                  <br />
                  <span className="text-gray-400 dark:text-dark-500 text-xs mt-1 block">
                    Индекс: 160000
                  </span>
                </span>
              </div>
              {/* Ish vaqti */}
              <div className="mt-4 glass-card p-4">
                <p className="text-gray-500 dark:text-dark-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Время работы
                </p>
                <p className="text-gray-600 dark:text-dark-300 text-sm">
                  Понедельник – Пятница: 09:00–18:00
                </p>
                <p className="text-gray-400 dark:text-dark-500 text-sm">
                  Суббота, Воскресенье: выходные дни
                </p>
              </div>
            </div>

            {/* Kontakt */}
            <div>
              <h2 className=" text-2xl text-gray-900 dark:text-dark-50 mb-2">
                {t("about.contact_title")}
              </h2>
              <div className="w-10 h-0.5 bg-gold-gradient mb-5" />
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  {/* tel: protokoli — <a> tegi */}
                  <a
                    href="tel:+77000000000"
                    className="text-gray-600 dark:text-dark-300 hover:text-gold-500 transition-colors"
                  >
                    +7 (700) 000-00-00
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  {/* mailto: protokoli — <a> tegi */}
                  <a
                    href="mailto:info@arbitraj-shymkent.kz"
                    className="text-gray-600 dark:text-dark-300 hover:text-gold-500 transition-colors"
                  >
                    info@arbitraj-shymkent.kz
                  </a>
                </li>
              </ul>

              {/* Huquqiy e'lon */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-800/50 rounded-xl border border-gray-200/60 dark:border-dark-700/40">
                <p className="text-gray-400 dark:text-dark-500 text-xs leading-relaxed">
                  {t("footer.disclaimer")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
