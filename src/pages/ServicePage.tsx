import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useI18n } from "@/lib/i18n";
import { getServiceBySlug, services } from "@/lib/services";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceCard from "@/components/ServiceCard";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t, isAr } = useI18n();
  const service = getServiceBySlug(slug || "");

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold">{t("الصفحة غير موجودة", "Page Not Found")}</h1>
          <Link to={`/${lang}`} className="text-accent mt-4 inline-block">{t("العودة للرئيسية", "Back to Home")}</Link>
        </div>
      </Layout>
    );
  }

  const relatedServices = services.filter(s => s.category === service.category && s.slug !== service.slug).slice(0, 3);
  const Chevron = isAr ? ChevronLeft : ChevronRight;

  const processSteps = [
    { ar: "تحليل المتطلبات", en: "Requirements Analysis" },
    { ar: "التصميم والتخطيط", en: "Design & Planning" },
    { ar: "التطوير والبرمجة", en: "Development" },
    { ar: "الاختبار والإطلاق", en: "Testing & Launch" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t(service.title.ar, service.title.en),
    description: t(service.metaDesc.ar, service.metaDesc.en),
    provider: { "@type": "Organization", name: "WebEgypt" },
    areaServed: { "@type": "Country", name: "Egypt" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map(faq => ({
      "@type": "Question",
      name: t(faq.q.ar, faq.q.en),
      acceptedAnswer: { "@type": "Answer", text: t(faq.a.ar, faq.a.en) },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("الرئيسية", "Home"), item: `https://webegypt.com/${lang}` },
      { "@type": "ListItem", position: 2, name: t(service.title.ar, service.title.en), item: `https://webegypt.com/${lang}/${service.slug}` },
    ],
  };

  return (
    <Layout>
      <SEOHead
        title={service.metaTitle}
        description={service.metaDesc}
        slug={service.slug}
        type="website"
        jsonLd={jsonLd}
        image={`https://webegypt.com/images/services/${service.slug}.webp`}
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to={`/${lang}`} className="hover:text-accent transition-colors">{t("الرئيسية", "Home")}</Link>
            <Chevron className="w-3 h-3" />
            <span className="text-foreground font-medium">{t(service.title.ar, service.title.en)}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 gradient-navy">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection>
              <h1 className="text-3xl md:text-5xl font-black text-primary-foreground mb-6 leading-tight">
                {t(service.h1.ar, service.h1.en)}
              </h1>
              <p className="text-primary-foreground/75 text-lg leading-relaxed mb-8">
                {t(service.description.ar, service.description.en)}
              </p>
              <WhatsAppButton serviceName={t(service.title.ar, service.title.en)} variant="hero" />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <img
                src={`/images/services/${service.slug}.webp`}
                alt={t(service.title.ar, service.title.en)}
                className="w-full rounded-2xl shadow-2xl border border-primary-foreground/10"
                loading="eager"
                width={600}
                height={400}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-10 text-center">
              {t("ما نقدمه لك", "What We Offer")}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {service.features.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.1} direction={isAr ? "left" : "right"}>
                <div className="flex items-start gap-3 bg-card p-5 rounded-xl border border-border hover:border-accent/50 hover:shadow-sm transition-all duration-300">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{t(f.ar, f.en)}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-10 text-center">
              {t("كيف نعمل", "How We Work")}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {processSteps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full gradient-gold text-accent-foreground flex items-center justify-center font-bold text-xl mx-auto mb-3 shadow-gold">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base">{t(step.ar, step.en)}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-10 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-3">{t("قد يهمك أيضاً:", "You may also be interested in:")}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {services.filter(s => s.slug !== service.slug).slice(0, 5).map(s => (
                <Link key={s.slug} to={`/${lang}/${s.slug}`} className="text-accent hover:underline">
                  {t(s.title.ar, s.title.en)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-10 text-center">
              {t("الأسئلة الشائعة", "Frequently Asked Questions")}
            </h2>
          </AnimatedSection>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <FAQItem question={t(faq.q.ar, faq.q.en)} answer={t(faq.a.ar, faq.a.en)} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-navy text-center">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-black text-primary-foreground mb-4">
              {t("جاهز للبدء؟", "Ready to Get Started?")}
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              {t("تواصل معنا الآن واحصل على استشارة مجانية", "Contact us now and get a free consultation")}
            </p>
            <WhatsAppButton serviceName={t(service.title.ar, service.title.en)} variant="hero" />
          </AnimatedSection>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-2xl font-black text-foreground mb-8 text-center">
                {t("خدمات ذات صلة", "Related Services")}
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedServices.map((s, i) => (
                <AnimatedSection key={s.slug} delay={i * 0.1}>
                  <ServiceCard service={s} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-start bg-card hover:bg-muted/50 transition-colors">
        <span className="font-semibold text-foreground">{question}</span>
        <ChevronLeft className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${open ? "rotate-90" : "-rotate-90"}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 bg-card text-muted-foreground leading-relaxed">{answer}</div>
      </motion.div>
    </div>
  );
};

export default ServicePage;
