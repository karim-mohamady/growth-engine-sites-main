import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { Phone, Mail, MapPin } from "lucide-react";
import { services } from "@/lib/services";
import { useState, useEffect } from "react";

const BUILD_YEAR = "2026";

const Footer = () => {
  const { lang, t } = useI18n();
  const [year, setYear] = useState(BUILD_YEAR);

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  const popularServices = services.slice(0, 8);

  return (
    <footer className="gradient-navy text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gradient-gold">Web</span>Egypt
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              {t(
                "شركة رائدة في إنشاء وتصميم المواقع والتسويق الرقمي في مصر. نساعدك على بناء حضور رقمي قوي وجذب المزيد من العملاء.",
                "A leading web design and digital marketing company in Egypt. We help you build a strong digital presence and attract more clients."
              )}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">{t("خدماتنا", "Our Services")}</h4>
            <ul className="space-y-2">
              {popularServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/${lang}/${service.slug}`}
                    className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
                  >
                    {t(service.title.ar, service.title.en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">{t("روابط سريعة", "Quick Links")}</h4>
            <ul className="space-y-2">
              <li><Link to={`/${lang}`} className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">{t("الرئيسية", "Home")}</Link></li>
              <li><Link to={`/${lang}/about`} className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">{t("من نحن", "About")}</Link></li>
              <li><Link to={`/${lang}/portfolio`} className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">{t("أعمالنا", "Portfolio")}</Link></li>
              <li><Link to={`/${lang}/blog`} className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">{t("المدونة", "Blog")}</Link></li>
              <li><Link to={`/${lang}/contact`} className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">{t("تواصل معنا", "Contact")}</Link></li>
            </ul>
            <h4 className="text-lg font-semibold mb-3 mt-6 text-accent">{t("مقالات مميزة", "Featured Articles")}</h4>
            <ul className="space-y-2">
              <li><Link to={`/${lang}/blog/website-cost-egypt-2025`} className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">{t("تكلفة إنشاء وتصميم موقع 2026", "Website Cost 2026")}</Link></li>
              <li><Link to={`/${lang}/blog/seo-tips-egypt`} className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">{t("نصائح SEO", "SEO Tips")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">{t("تواصل معنا", "Contact Us")}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/60 text-sm">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="tel:+201017238942" className="hover:text-accent transition-colors" dir="ltr">+20 101 723 8942</a>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/60 text-sm">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span>info@webegypt.com</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/60 text-sm">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>{t("مصر", "Egypt")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-primary-foreground/40 text-sm">
          <p>© {year} WebEgypt. {t("جميع الحقوق محفوظة", "All Rights Reserved")}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
