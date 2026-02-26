import { useI18n } from "@/lib/i18n";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { CheckCircle, Users, Award, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/lib/services";

const About = () => {
  const { lang, t } = useI18n();
  const topServices = services.slice(0, 4);

  return (
    <Layout>
      <SEOHead
        title={{ ar: "من نحن – شركة إنشاء وتصميم مواقع | WebEgypt", en: "About Us | WebEgypt" }}
        description={{ ar: "تعرف على WebEgypt - شركة رائدة في إنشاء وتصميم المواقع والتسويق الرقمي في مصر.", en: "Learn about WebEgypt - a leading web design and digital marketing company in Egypt." }}
        slug="about"
      />

      <section className="py-16 md:py-24 gradient-navy">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-3xl md:text-5xl font-black text-primary-foreground mb-4">
              {t("من نحن", "About Us")}
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              {t(
                "فريق متخصص من المصممين والمطورين والمسوقين الرقميين نعمل معًا لمساعدة الشركات في مصر على النمو رقميًا من خلال إنشاء وتصميم مواقع احترافية",
                "A specialized team of designers, developers, and digital marketers working together to help businesses in Egypt grow digitally"
              )}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-black text-foreground mb-4">
                  {t("رؤيتنا", "Our Vision")}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t(
                    "أن نكون الشركة الرائدة في مصر والشرق الأوسط في مجال إنشاء وتصميم المواقع والتسويق الرقمي، وأن نحدث فرقًا حقيقيًا في نجاح عملائنا.",
                    "To be the leading web design and digital marketing company in Egypt and the Middle East, and to make a real difference in our clients' success."
                  )}
                </p>
              </div>
              <Target className="w-40 h-40 text-accent mx-auto" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <Users className="w-40 h-40 text-accent mx-auto" />
              <div>
                <h2 className="text-2xl font-black text-foreground mb-4">
                  {t("مهمتنا", "Our Mission")}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t(
                    "تقديم حلول مبتكرة ومخصصة في إنشاء وتصميم المواقع والتسويق الرقمي، وتحقيق أعلى مستويات الجودة ورضا العملاء، والمساهمة في تطوير المجتمع الرقمي في مصر.",
                    "To provide innovative and customized solutions in web design and digital marketing, achieve the highest levels of quality and customer satisfaction, and contribute to the development of the digital community in Egypt."
                  )}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-foreground mb-4">
                {t("لماذا تختار WebEgypt؟", "Why Choose WebEgypt?")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t(
                  "نحن نجمع بين الخبرة والإبداع لتقديم أفضل حلول إنشاء وتصميم المواقع والتسويق الرقمي التي تحقق أهداف عملك.",
                  "We combine experience and creativity to provide the best web design and digital marketing solutions that achieve your business goals."
                )}
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="text-center">
                <Award className="w-12 h-12 text-accent mx-auto mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("خبرة واسعة", "Extensive Experience")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "أكثر من 10 سنوات من الخبرة في مجال إنشاء وتصميم المواقع والتسويق الرقمي في السوق المصري.",
                    "Over 10 years of experience in web design and digital marketing in the Egyptian market."
                  )}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-accent mx-auto mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("جودة عالية", "High Quality")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "نحرص على تقديم أعلى مستويات الجودة في جميع خدماتنا، بدءًا من التصميم وحتى التنفيذ والدعم الفني.",
                    "We are committed to providing the highest levels of quality in all our services, from design to implementation and technical support."
                  )}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="text-center">
                <Users className="w-12 h-12 text-accent mx-auto mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t("رضا العملاء", "Customer Satisfaction")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "نسعى دائمًا لتحقيق رضا عملائنا وتجاوز توقعاتهم، ونعتبر نجاحهم هو نجاحنا.",
                    "We always strive to achieve customer satisfaction and exceed their expectations, and we consider their success to be our success."
                  )}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Internal links to services */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground mb-4">{t("تعرف على خدماتنا في إنشاء وتصميم المواقع", "Explore Our Web Design Services")}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {topServices.map(s => (
                  <Link key={s.slug} to={`/${lang}/${s.slug}`} className="bg-card px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors">
                    {t(s.title.ar, s.title.en)}
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div className="text-center mt-12">
            <WhatsAppButton variant="hero" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
