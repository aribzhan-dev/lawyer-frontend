import { useState, useEffect } from "react";
import { FileText, Download, Eye, ChevronRight, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { documentsApi } from "@/api/documentsApi";
import type { Document } from "@/types/document";
import Spinner from "@/components/common/Spinner";

import { getFileUrl } from "@/utils/getFileUrl";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function DocumentsPage() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Document | null>(null);

  // Backend dan hujjatlarni yuklash
  useEffect(() => {
    documentsApi
      .getAll()
      .then((docs) => {
        setDocuments(docs);
        // Birinchi hujjatni avtomatik tanlash
        if (docs.length > 0) setSelected(docs[0]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Kategoriyalarni alohida ajratib olish (takrorlanmasiz)
  const categories = Array.from(
    new Set(documents.map((d) => d.category).filter(Boolean)),
  ) as string[];

  // Tanlangan hujjat uchun hosil qilingan qiymatlar
  const fileUrl = selected ? getFileUrl(selected.file_url) : "";
  const isPdf = selected
    ? selected.file_url.toLowerCase().endsWith(".pdf")
    : false;

  return (
    <main className="min-h-screen bg-white dark:bg-dark-950 pt-[200px] sm:pt-[160px] md:pt-48 pb-16">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-950 border-b border-gray-200/60 dark:border-dark-800/60 py-12">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-gold-500 text-xs font-semibold tracking-widest uppercase">
              {t("documents.page_eyebrow")}
            </span>
          </div>

          <h1 
            className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-dark-50 leading-[1.2] mb-3 break-words hyphens-auto"
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            {t('documents.page_title1')} {t('documents.page_title2')}
          </h1>
          <p className="text-gray-500 dark:text-dark-400 text-base max-w-2xl">
            {t("documents.page_desc")}
          </p>
        </div>
      </section>

      {/* ── Content: 2-column layout ────────────────────────────────── */}
      <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : documents.length === 0 ? (
          /* Hujjatlar yo'q holati */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gold-500" />
            </div>
            <p className="text-gray-500 dark:text-dark-400 text-sm">
              {t("documents.empty")}
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ── LEFT: Document list sidebar ─────────────────────── */}
            <aside className="lg:w-72 xl:w-80 flex-shrink-0">
              <div className="glass-card overflow-hidden sticky top-24">
                {/* Kategoriyalar bo'yicha guruhlangan ro'yxat */}
                {categories.length > 0
                  ? categories.map((cat) => (
                      <div key={cat}>
                        {/* Kategoriya sarlavhasi */}
                        <div className="px-4 py-2.5 bg-gold-500/10 border-b border-gold-500/20">
                          <p className="text-gold-600 dark:text-gold-400 text-xs font-semibold uppercase tracking-wider">
                            {cat}
                          </p>
                        </div>

                        {/* Shu kategoriyaga tegishli hujjatlar */}
                        {documents
                          .filter((d) => d.category === cat)
                          .map((doc) => (
                            <DocumentListItem
                              key={doc.id}
                              doc={doc}
                              isSelected={selected?.id === doc.id}
                              onSelect={setSelected}
                            />
                          ))}
                      </div>
                    ))
                  : /* Kategoriyasiz — oddiy ro'yxat */
                    documents.map((doc) => (
                      <DocumentListItem
                        key={doc.id}
                        doc={doc}
                        isSelected={selected?.id === doc.id}
                        onSelect={setSelected}
                      />
                    ))}
              </div>
            </aside>

            {/* ── RIGHT: PDF viewer ───────────────────────────────── */}
            <section className="flex-1 min-w-0">
              {selected ? (
                <div className="glass-card overflow-hidden flex flex-col h-full min-h-[600px]">
                  {/* Viewer header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200/60 dark:border-dark-700/50 flex-shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex-shrink-0 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-gold-500" />
                      </div>
                      <h2 className="font-medium text-gray-900 dark:text-dark-50 text-sm truncate">
                        {selected.title}
                      </h2>
                    </div>

                    {/* Yuklab olish + yangi tabda ochish — <a> tegi bilan */}
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`doc-view-${selected.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                                   text-gold-600 dark:text-gold-400 bg-gold-500/10 hover:bg-gold-500/20
                                   border border-gold-500/20 transition-colors"
                        title={t("documents.view")}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">
                          {t("documents.view")}
                        </span>
                      </a>

                      <a
                        href={fileUrl}
                        download
                        id={`doc-download-${selected.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                                   text-white bg-gold-500 hover:bg-gold-600
                                   border border-gold-600 transition-colors"
                        title={t("documents.download")}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">
                          {t("documents.download")}
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* PDF viewer.
                      Mobil brauzerlar PDF ni <iframe> ichida ko'rsata olmaydi
                      (ko'pincha to'g'ridan-to'g'ri yuklab oladi), shuning uchun
                      faqat desktopda iframe ishlatamiz; mobilda ochish/yuklash kartasini. */}
                  <div className="flex-1 bg-gray-100 dark:bg-dark-900">
                    {isPdf && !isMobile ? (
                      <iframe
                        key={selected.id}
                        src={`${fileUrl}#toolbar=1&view=FitH`}
                        title={selected.title}
                        className="w-full h-full min-h-[580px] border-0"
                        loading="lazy"
                      />
                    ) : (
                      /* Mobil PDF yoki PDF bo'lmagan fayllar — ochish/yuklash kartasi */
                      <div className="flex flex-col items-center justify-center h-full py-20 px-6 gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-gold-500" />
                        </div>
                        <p className="text-gray-500 dark:text-dark-400 text-sm text-center max-w-xs">
                          {selected.title}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-2.5">
                          {isPdf && (
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium
                                         text-gold-600 dark:text-gold-400 bg-gold-500/10 hover:bg-gold-500/20
                                         border border-gold-500/20 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              {t("documents.view")}
                            </a>
                          )}
                          <a
                            href={fileUrl}
                            download
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium
                                       text-white bg-gold-500 hover:bg-gold-600 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            {t("documents.download")}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Hech narsa tanlanmagan holat */
                <div className="glass-card flex flex-col items-center justify-center min-h-[400px] text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-gold-500/50" />
                  </div>
                  <p className="text-gray-400 dark:text-dark-500 text-sm">
                    {t("documents.select_hint")}
                  </p>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

/* ── Document list item component ────────────────────────────────────── */
interface DocumentListItemProps {
  doc: Document;
  isSelected: boolean;
  onSelect: (doc: Document) => void;
}

function DocumentListItem({
  doc,
  isSelected,
  onSelect,
}: DocumentListItemProps) {
  return (
    /* 
      Foydalanuvchi qulay bo'lishi uchun tugmani <button> sifatida qoldiramiz — 
      bu sahifa ichidagi tanlash amali (navigatsiya emas), shuning uchun <a> to'g'ri kelmaydi.
      Sahifadan tashqariga o'tish uchun esa barcha joylarda <a> ishlatilgan.
    */
    <button
      onClick={() => onSelect(doc)}
      id={`doc-list-item-${doc.id}`}
      className={`w-full text-left flex items-center gap-3 px-4 py-3 text-sm transition-all duration-150 border-b border-gray-200/40 dark:border-dark-800/40 last:border-0 ${
        isSelected
          ? "bg-gold-500/10 text-gold-600 dark:text-gold-400 font-medium"
          : "text-gray-600 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-800 hover:text-gray-900 dark:hover:text-dark-50"
      }`}
    >
      <FileText
        className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-gold-500" : "text-gray-400 dark:text-dark-500"}`}
      />
      <span className="flex-1 leading-snug">{doc.title}</span>
      {isSelected && (
        <ChevronRight className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
      )}
    </button>
  );
}
