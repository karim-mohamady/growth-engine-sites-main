import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { services } from "@/lib/services";
import { blogPosts } from "@/lib/blog-data";
import { CheckCircle, Star, Users, Award, Clock, Calendar, Shield, Zap, HeadphonesIcon } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const { lang, t } = useI18n();
  const featuredServices = services.slice(0, 9);
  const latestPosts = blogPosts.slice(0, 3);

  const stats = [
    { icon: Users, value: "500+", label: t("عميل سعيد", "Happy Clients") },
    { icon: Star, value: "800+", label: t("مشروع منجز", "Projects Completed") },
    { icon: Award, value: "10+", label: t("سنوات خبرة", "Years Experience") },
    { icon: CheckCircle, value: "99%", label: t("رضا العملاء", "Client Satisfaction") },
  ];

  const testimonials = [
    { name: t("أحمد محمد", "Ahmed Mohamed"), role: t("مدير شركة عقارات", "Real Estate Company Director"), text: t("فريق WebEgypt ساعدنا في إنشاء وتصميم موقع عقاري احترافي زاد مبيعاتنا بنسبة 40%. خدمة ممتازة ودعم فني متواصل.", "WebEgypt helped us create a professional real estate website that increased our sales by 40%. Excellent service and continuous support.") },
    { name: t("سارة علي", "Sara Ali"), role: t("صاحبة متجر إلكتروني", "E-commerce Store Owner"), text: t("أفضل شركة إنشاء وتصميم مواقع تعاملت معها. المتجر الإلكتروني يعمل بشكل مثالي وزادت المبيعات من أول شهر.", "Best web design company I've worked with. The e-commerce store works perfectly and sales increased from the first month.") },
    { name: t("محمد حسن", "Mohamed Hassan"), role: t("طبيب أسنان", "Dentist"), text: t("موقع العيادة ساعدني في جذب مرضى جدد بشكل كبير. نظام الحجز الأونلاين وفر علينا وقت كبير.", "The clinic website helped me attract new patients significantly. The online booking system saved us a lot of time.") },
  ];

  const trustBadges = [
    { icon: Shield, label: t("ضمان جودة 100%", "100% Quality Guarantee") },
    { icon: Zap, label: t("تسليم سريع", "Fast Delivery") },
    { icon: HeadphonesIcon, label: t("دعم فني 24/7", "24/7 Support") },
    { icon: Award, label: t("أسعار تنافسية", "Competitive Prices") },
  ];

  return (
    <Layout>
      <SEOHead
        title={{ ar: "أفضل شركة إنشاء وتصميم مواقع في مصر | WebEgypt", en: "Best Web Design Company in Egypt | WebEgypt" }}
        description={{ ar: "شركة رائدة في إنشاء وتصميم المواقع والتسويق الرقمي في مصر. نقدم خدمات إنشاء وتصميم مواقع، تحسين محركات البحث، وإدارة وسائل التواصل.", en: "Leading web design and digital marketing company in Egypt. We offer web design, SEO, and social media management services." }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "WebEgypt",
          url: "https://webegypt.com",
          description: "Leading web design and digital marketing company in Egypt",
          address: { "@type": "PostalAddress", addressCountry: "EG" },
          contactPoint: { "@type": "ContactPoint", telephone: "+201017238942", contactType: "sales" },
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" loading="eager" width={1920} height={1080} />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              {t("🔥 عرض محدود – استشارة مجانية", "🔥 Limited Offer – Free Consultation")}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-primary-foreground leading-tight mb-6">
              {t(
                "ننشئ ونصمم مواقع تجذب العملاء وتنمّي أعمالك",
                "We Design Websites That Attract Clients & Grow Your Business"
              )}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/75 mb-8 leading-relaxed max-w-2xl">
              {t(
                "أفضل شركة إنشاء وتصميم مواقع وتسويق رقمي في مصر. أكثر من 10 سنوات خبرة في تحويل الأفكار إلى مواقع ناجحة تتصدر نتائج البحث.",
                "Top web design and digital marketing company in Egypt. Over 10 years of experience turning ideas into successful websites that rank at the top of search results."
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <WhatsAppButton variant="hero" />
              <Link
                to={`/${lang}/portfolio`}
                className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-foreground/10 transition-colors"
              >
                {t("شاهد أعمالنا", "View Our Work")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 bg-accent/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-sm font-medium text-foreground">
                <badge.icon className="w-5 h-5 text-accent" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <stat.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="text-3xl font-black text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                {t("خدمات إنشاء وتصميم المواقع", "Our Services")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t(
                  "نقدم مجموعة شاملة من خدمات إنشاء وتصميم المواقع والتسويق الرقمي لمساعدة عملك على النمو",
                  "We offer a comprehensive range of web design and digital marketing services to help your business grow"
                )}
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, i) => (
              <AnimatedSection key={service.slug} delay={i * 0.05}>
                <ServiceCard service={service} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="text-center mt-10">
              <Link
                to={`/${lang}/contact`}
                className="inline-flex items-center gap-2 gradient-gold text-accent-foreground px-8 py-3 rounded-xl font-bold shadow-gold hover:opacity-90 transition-opacity"
              >
                {t("عرض جميع الخدمات", "View All Services")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-12 bg-accent/5 border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3">
              {t("احصل على استشارة مجانية الآن", "Get a Free Consultation Now")}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              {t("تواصل معنا وسنساعدك في اختيار أفضل حل لعملك – بدون أي التزام", "Contact us and we'll help you choose the best solution for your business – no commitment required")}
            </p>
            <WhatsAppButton variant="hero" />
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                {t("ماذا يقول عملاؤنا", "What Our Clients Say")}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t("آراء حقيقية من عملاء استفادوا من خدمات إنشاء وتصميم المواقع", "Real testimonials from clients who benefited from our web design services")}
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-card p-6 rounded-xl border border-border hover:border-accent/50 transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">"{item.text}"</p>
                  <div>
                    <div className="font-bold text-foreground text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.role}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                {t("من مدونتنا", "From Our Blog")}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t("أحدث المقالات والنصائح في عالم الويب والتسويق الرقمي", "Latest articles and tips on web and digital marketing")}
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {latestPosts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.1}>
                <Link to={`/${lang}/blog/${post.slug}`} className="group block bg-card rounded-xl border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="relative overflow-hidden">
                    <img src={post.image} alt={t(post.title.ar, post.title.en)} className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={400} height={176} />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-accent font-semibold">{t(post.category.ar, post.category.en)}</span>
                    <h3 className="text-base font-bold text-foreground mt-1 mb-2 group-hover:text-accent transition-colors line-clamp-2">{t(post.title.ar, post.title.en)}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t(post.readingTime.ar, post.readingTime.en)}</span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="text-center mt-8">
              <Link to={`/${lang}/blog`} className="text-accent font-semibold hover:underline">
                {t("عرض جميع المقالات", "View All Articles")} →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-navy">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">
              {t("جاهز لبدء مشروعك؟", "Ready to Start Your Project?")}
            </h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
              {t(
                "تواصل معنا اليوم واحصل على استشارة مجانية وعرض سعر مخصص لمشروعك",
                "Contact us today and get a free consultation and custom quote for your project"
              )}
            </p>
            <WhatsAppButton variant="hero" />
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
