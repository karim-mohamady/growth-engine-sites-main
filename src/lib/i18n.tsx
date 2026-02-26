import { createContext, useContext, ReactNode } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export type Lang = "ar" | "en";

interface I18nContextType {
  lang: Lang;
  dir: "rtl" | "ltr";
  switchLang: () => void;
  t: (ar: string, en: string) => string;
  isAr: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const { lang: langParam } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const lang: Lang = langParam === "en" ? "en" : "ar";
  const dir = lang === "ar" ? "rtl" : "ltr";
  const isAr = lang === "ar";

  const switchLang = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    const path = location.pathname.replace(`/${lang}`, `/${newLang}`);
    navigate(path);
  };

  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);

  return (
    <I18nContext.Provider value={{ lang, dir, switchLang, t, isAr }}>
      <div dir={dir} lang={lang}>
        {children}
      </div>
    </I18nContext.Provider>
  );
};
