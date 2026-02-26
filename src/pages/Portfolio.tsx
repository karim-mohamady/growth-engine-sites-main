import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import WhatsAppButton, { getWhatsAppUrl } from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface Project {
  title: { ar: string; en: string };
  category: string;
  categoryLabel: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
}

const projects: Project[] = [
  { title: { ar: "متجر أزياء إلكتروني", en: "Fashion E-commerce Store" }, category: "ecommerce", categoryLabel: { ar: "متاجر إلكترونية", en: "E-commerce" }, description: { ar: "إنشاء وتصميم متجر إلكتروني متكامل للأزياء مع بوابات دفع وإدارة مخزون", en: "Complete fashion e-commerce with payment gateways and inventory" }, image: "/images/services/ecommerce-store-egypt.webp" },
  { title: { ar: "موقع عيادة أسنان", en: "Dental Clinic Website" }, category: "medical", categoryLabel: { ar: "طبي", en: "Medical" }, description: { ar: "إنشاء وتصميم موقع احترافي لعيادة أسنان مع نظام حجز مواعيد", en: "Professional dental clinic site with appointment booking" }, image: "/images/services/dental-clinic-website-design.webp" },
  { title: { ar: "موقع شركة عقارات", en: "Real Estate Company" }, category: "real-estate", categoryLabel: { ar: "عقارات", en: "Real Estate" }, description: { ar: "إنشاء وتصميم موقع عقاري متطور مع بحث متقدم وخرائط تفاعلية", en: "Advanced real estate site with search and interactive maps" }, image: "/images/services/real-estate-website-design.webp" },
  { title: { ar: "موقع شركة احترافي", en: "Corporate Website" }, category: "corporate", categoryLabel: { ar: "شركات", en: "Corporate" }, description: { ar: "إنشاء وتصميم موقع شركة يعكس هوية العلامة التجارية", en: "Corporate website reflecting brand identity" }, image: "/images/services/corporate-website-design.webp" },
  { title: { ar: "متجر إلكترونيات", en: "Electronics Store" }, category: "ecommerce", categoryLabel: { ar: "متاجر إلكترونية", en: "E-commerce" }, description: { ar: "إنشاء وتصميم متجر إلكتروني للإلكترونيات مع مقارنة المنتجات", en: "Electronics store with product comparison feature" }, image: "/images/services/shopify-store-setup.webp" },
  { title: { ar: "موقع شركة مقاولات", en: "Construction Company" }, category: "corporate", categoryLabel: { ar: "شركات", en: "Corporate" }, description: { ar: "إنشاء وتصميم موقع احترافي لشركة مقاولات مع معرض مشاريع", en: "Professional construction site with project gallery" }, image: "/images/services/construction-company-website.webp" },
  { title: { ar: "موقع مستشفى متكامل", en: "Hospital Website" }, category: "medical", categoryLabel: { ar: "طبي", en: "Medical" }, description: { ar: "إنشاء وتصميم موقع مستشفى مع نظام حجز ودليل أطباء", en: "Hospital website with booking system and doctor directory" }, image: "/images/services/hospital-website-design.webp" },
  { title: { ar: "صفحة هبوط تسويقية", en: "Marketing Landing Page" }, category: "landing", categoryLabel: { ar: "صفحات هبوط", en: "Landing Pages" }, description: { ar: "إنشاء وتصميم صفحة هبوط عالية التحويل لحملة إعلانية", en: "High-converting landing page for ad campaign" }, image: "/images/services/landing-page-design.webp" },
  { title: { ar: "موقع مكتب محاماة", en: "Law Firm Website" }, category: "corporate", categoryLabel: { ar: "شركات", en: "Corporate" }, description: { ar: "إنشاء وتصميم موقع احترافي يعكس الثقة والمصداقية", en: "Professional site reflecting trust and credibility" }, image: "/images/services/law-firm-website-design.webp" },
  { title: { ar: "منصة تعليمية", en: "Educational Platform" }, category: "saas", categoryLabel: { ar: "منصات تعليمية", en: "Educational" }, description: { ar: "إنشاء وتصميم منصة تعليمية شاملة مع بوابة أولياء أمور", en: "Comprehensive educational platform with parent portal" }, image: "/images/services/school-website-design.webp" },
  { title: { ar: "متجر شوبيفاي مخصص", en: "Custom Shopify Store" }, category: "ecommerce", categoryLabel: { ar: "متاجر إلكترونية", en: "E-commerce" }, description: { ar: "إنشاء وتصميم متجر شوبيفاي مخصص مع تصميم فريد", en: "Custom Shopify store with unique design" }, image: "/images/services/shopify-store-setup.webp" },
  { title: { ar: "موقع شركة سياحة", en: "Tourism Company" }, category: "corporate", categoryLabel: { ar: "شركات", en: "Corporate" }, description: { ar: "إنشاء وتصميم موقع سياحي جذاب مع نظام حجز رحلات", en: "Attractive tourism site with trip booking system" }, image: "/images/services/tourism-website-design.webp" },
  { title: { ar: "موقع عقاري فاخر", en: "Luxury Real Estate" }, category: "real-estate", categoryLabel: { ar: "عقارات", en: "Real Estate" }, description: { ar: "إنشاء وتصميم موقع عقاري للمشاريع الفاخرة مع جولات افتراضية", en: "Luxury real estate website with virtual tours" }, image: "/images/services/real-estate-website-design.webp" },
  { title: { ar: "موقع عيادة تجميل", en: "Beauty Clinic Website" }, category: "medical", categoryLabel: { ar: "طبي", en: "Medical" }, description: { ar: "إنشاء وتصميم موقع عيادة تجميل مع معرض قبل وبعد", en: "Beauty clinic website with before/after gallery" }, image: "/images/services/medical-website-design.webp" },
  { title: { ar: "صفحة هبوط SaaS", en: "SaaS Landing Page" }, category: "saas", categoryLabel: { ar: "منصات تعليمية", en: "SaaS" }, description: { ar: "إنشاء وتصميم صفحة هبوط لمنتج SaaS مع نظام تسجيل", en: "SaaS product landing page with registration system" }, image: "/images/services/startup-website-design.webp" },
  { title: { ar: "موقع مطعم فاخر", en: "Fine Dining Website" }, category: "corporate", categoryLabel: { ar: "شركات", en: "Corporate" }, description: { ar: "إنشاء وتصميم موقع مطعم مع قائمة طعام تفاعلية وحجز طاولات", en: "Restaurant website with interactive menu and table booking" }, image: "/images/services/restaurant-website-design.webp" },
  { title: { ar: "حملة تسويق رقمي", en: "Digital Marketing Campaign" }, category: "landing", categoryLabel: { ar: "صفحات هبوط", en: "Landing Pages" }, description: { ar: "حملة تسويق رقمي متكاملة لزيادة الحجوزات والمبيعات", en: "Complete digital marketing campaign to increase bookings" }, image: "/images/services/social-media-management.webp" },
  { title: { ar: "بوابة حجز مواعيد", en: "Appointment Booking Portal" }, category: "saas", categoryLabel: { ar: "منصات تعليمية", en: "SaaS" }, description: { ar: "إنشاء وتصميم نظام حجز مواعيد متكامل مع إشعارات تلقائية", en: "Integrated appointment booking system with auto-notifications" }, image: "/images/services/booking-system-website.webp" },
];

const categories = [
  { id: "all", label: { ar: "الكل", en: "All" } },
  { id: "corporate", label: { ar: "شركات", en: "Corporate" } },
  { id: "ecommerce", label: { ar: "متاجر إلكترونية", en: "E-commerce" } },
  { id: "medical", label: { ar: "طبي", en: "Medical" } },
  { id: "real-estate", label: { ar: "عقارات", en: "Real Estate" } },
  { id: "saas", label: { ar: "منصات SaaS", en: "SaaS" } },
  { id: "landing", label: { ar: "صفحات هبوط", en: "Landing Pages" } },
];

const Portfolio = () => {
  const { t, isAr } = useI18n();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all" ? projects : projects.filter(p => p.category === activeFilter);

  const requestMessage = isAr
    ? "مرحبًا، أريد إنشاء وتصميم موقع مشابه لأحد مشاريعكم"
    : "Hello, I'd like to create a website similar to one of your projects";

  return (
    <Layout>
      <SEOHead
        title={{ ar: "أعمالنا في إنشاء وتصميم المواقع | WebEgypt", en: "Portfolio | WebEgypt" }}
        description={{ ar: "استعرض مشاريعنا السابقة في إنشاء وتصميم المواقع والتسويق الرقمي.", en: "Browse our previous web design and digital marketing projects." }}
        slug="portfolio"
      />

      <section className="py-16 md:py-24 gradient-navy">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-3xl md:text-5xl font-black text-primary-foreground mb-4">{t("أعمالنا", "Our Portfolio")}</h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">{t("نماذج من مشاريعنا الناجحة في إنشاء وتصميم المواقع التي ساعدت عملاءنا على النمو", "Samples of our successful projects that helped our clients grow")}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === cat.id
                    ? "gradient-gold text-accent-foreground shadow-gold"
                    : "bg-card text-muted-foreground border border-border hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {t(cat.label.ar, cat.label.en)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title.en}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={t(project.title.ar, project.title.en)}
                      className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={208}
                    />
                    <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">{t("عرض التفاصيل", "View Details")}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-accent font-semibold">{t(project.categoryLabel.ar, project.categoryLabel.en)}</span>
                    <h3 className="text-lg font-bold text-foreground mt-1 group-hover:text-accent transition-colors">
                      {t(project.title.ar, project.title.en)}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2 mb-3">{t(project.description.ar, project.description.en)}</p>
                    <a
                      href={getWhatsAppUrl(requestMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      {t("طلب إنشاء وتصميم موقع مشابه", "Request Similar Website")}
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mt-14">
            <AnimatedSection>
              <p className="text-muted-foreground mb-6">{t("هل تريد مشروعاً مشابهاً؟ تواصل معنا الآن", "Want a similar project? Contact us now")}</p>
              <WhatsAppButton variant="hero" />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
