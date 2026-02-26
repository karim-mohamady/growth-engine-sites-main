import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { I18nProvider } from "@/lib/i18n";
import { Home, ArrowLeft, ArrowRight } from "lucide-react";

const NotFoundContent = () => {
  const { lang, t, isAr } = useI18n();
  const Arrow = isAr ? ArrowRight : ArrowLeft;

  return (
    <Layout>
      <SEOHead
        title={{ ar: "الصفحة غير موجودة | WebEgypt", en: "Page Not Found | WebEgypt" }}
        description={{ ar: "الصفحة التي تبحث عنها غير موجودة. تصفح خدماتنا في إنشاء وتصميم المواقع.", en: "The page you are looking for does not exist. Browse our web design services." }}
        slug=""
      />
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <div className="text-8xl font-black text-accent mb-6">404</div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t("الصفحة غير موجودة", "Page Not Found")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t(
              "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يمكنك العودة للصفحة الرئيسية أو تصفح خدماتنا.",
              "Sorry, the page you're looking for doesn't exist or has been moved. Go back to the homepage or browse our services."
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={`/${lang}`}
              className="inline-flex items-center gap-2 gradient-gold text-accent-foreground px-6 py-3 rounded-xl font-bold shadow-gold hover:opacity-90 transition-opacity"
            >
              <Home className="w-5 h-5" />
              {t("الصفحة الرئيسية", "Homepage")}
            </Link>
            <Link
              to={`/${lang}/contact`}
              className="inline-flex items-center gap-2 border-2 border-border text-foreground px-6 py-3 rounded-xl font-bold hover:border-accent/50 transition-colors"
            >
              {t("تواصل معنا", "Contact Us")}
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const NotFound = () => {
  const location = useLocation();
  const langMatch = location.pathname.match(/^\/(ar|en)/);

  if (langMatch) {
    return <NotFoundContent />;
  }

  return (
    <I18nProvider>
      <NotFoundContent />
    </I18nProvider>
  );
};

export default NotFound;
