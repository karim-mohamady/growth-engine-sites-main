import { Helmet } from "react-helmet-async";
import { useI18n } from "@/lib/i18n";

interface SEOHeadProps {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  slug?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
  image?: string;
}

const SEOHead = ({ title, description, slug = "", type = "website", jsonLd, image }: SEOHeadProps) => {
  const { lang, t } = useI18n();
  const altLang = lang === "ar" ? "en" : "ar";
  const baseUrl = "https://webegypt.com";
  const currentUrl = `${baseUrl}/${lang}/${slug}`.replace(/\/+$/, "");
  const altUrl = `${baseUrl}/${altLang}/${slug}`.replace(/\/+$/, "");
  const defaultUrl = `${baseUrl}/ar/${slug}`.replace(/\/+$/, "");

  const pageTitle = t(title.ar, title.en);
  const pageDesc = t(description.ar, description.en);
  const ogImage = image || `${baseUrl}/images/services/${slug || "og-default"}.webp`;

  return (
    <Helmet>
      <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hrefLang="ar" href={lang === "ar" ? currentUrl : altUrl} />
      <link rel="alternate" hrefLang="en" href={lang === "en" ? currentUrl : altUrl} />
      <link rel="alternate" hrefLang="x-default" href={defaultUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang === "ar" ? "ar_EG" : "en_US"} />
      <meta property="og:locale:alternate" content={altLang === "ar" ? "ar_EG" : "en_US"} />
      <meta property="og:site_name" content="WebEgypt" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
