import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useI18n } from "@/lib/i18n";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-data";
import { getServiceBySlug } from "@/lib/services";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import { renderMarkdown } from "@/lib/renderMarkdown";
import { ChevronLeft, ChevronRight, Clock, Calendar, User } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t, isAr } = useI18n();
  const post = getBlogPostBySlug(slug || "");
  const Chevron = isAr ? ChevronLeft : ChevronRight;

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold">{t("المقال غير موجود", "Article Not Found")}</h1>
          <Link to={`/${lang}/blog`} className="text-accent mt-4 inline-block">{t("العودة للمدونة", "Back to Blog")}</Link>
        </div>
      </Layout>
    );
  }

  const relatedServices = post.relatedServices
    .map(slug => getServiceBySlug(slug))
    .filter(Boolean);

  const otherPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(post.title.ar, post.title.en),
    description: t(post.excerpt.ar, post.excerpt.en),
    image: `https://webegypt.com${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: "WebEgypt" },
    publisher: {
      "@type": "Organization",
      name: "WebEgypt",
      logo: { "@type": "ImageObject", url: "https://webegypt.com/favicon.ico" },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("الرئيسية", "Home"), item: `https://webegypt.com/${lang}` },
      { "@type": "ListItem", position: 2, name: t("المدونة", "Blog"), item: `https://webegypt.com/${lang}/blog` },
      { "@type": "ListItem", position: 3, name: t(post.title.ar, post.title.en), item: `https://webegypt.com/${lang}/blog/${post.slug}` },
    ],
  };

  // Extract FAQ-like sections from content for FAQ JSON-LD
  const faqJsonLd = buildBlogFaqJsonLd(t(post.content.ar, post.content.en));

  const content = t(post.content.ar, post.content.en);

  return (
    <Layout>
      <SEOHead
        title={{ ar: `${post.title.ar} | WebEgypt`, en: `${post.title.en} | WebEgypt` }}
        description={post.excerpt}
        slug={`blog/${post.slug}`}
        type="article"
        jsonLd={articleJsonLd}
        image={`https://webegypt.com${post.image}`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        {faqJsonLd && (
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        )}
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to={`/${lang}`} className="hover:text-accent">{t("الرئيسية", "Home")}</Link>
            <Chevron className="w-3 h-3" />
            <Link to={`/${lang}/blog`} className="hover:text-accent">{t("المدونة", "Blog")}</Link>
            <Chevron className="w-3 h-3" />
            <span className="text-foreground font-medium line-clamp-1">{t(post.title.ar, post.title.en)}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-20 gradient-navy">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
              {t(post.category.ar, post.category.en)}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-primary-foreground mb-6 leading-tight">
              {t(post.title.ar, post.title.en)}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/60 text-sm">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> WebEgypt</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {t(post.readingTime.ar, post.readingTime.en)}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container mx-auto px-4 max-w-4xl -mt-8 relative z-10">
        <img
          src={post.image}
          alt={t(post.title.ar, post.title.en)}
          className="w-full rounded-2xl shadow-2xl border border-border"
          width={800}
          height={450}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Content */}
      <article className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div
            className="prose prose-lg max-w-none text-foreground
              prose-headings:text-foreground prose-headings:font-black
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-foreground
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-li:text-muted-foreground
              prose-table:text-sm
              prose-blockquote:border-accent prose-blockquote:bg-muted/30 prose-blockquote:rounded-lg prose-blockquote:py-2 prose-blockquote:px-4
              prose-pre:bg-muted prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
              prose-code:text-accent prose-code:bg-muted prose-code:px-1 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </div>
      </article>

      {/* Author Box */}
      <section className="bg-muted/30 py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-card p-6 rounded-2xl border border-border flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full gradient-navy flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground text-2xl font-black">WE</span>
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg mb-1">WebEgypt</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(
                  "فريق WebEgypt المتخصص في تصميم المواقع والتسويق الرقمي. أكثر من 10 سنوات خبرة في السوق المصري.",
                  "The WebEgypt team specializing in web design and digital marketing. Over 10 years of experience in the Egyptian market."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-black text-foreground mb-6 text-center">
              {t("خدمات ذات صلة", "Related Services")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedServices.map(s => s && <ServiceCard key={s.slug} service={s} />)}
            </div>
          </div>
        </section>
      )}

      {/* Other Posts */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-black text-foreground mb-6 text-center">
            {t("مقالات أخرى", "Other Articles")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPosts.map(p => (
              <Link key={p.slug} to={`/${lang}/blog/${p.slug}`} className="group bg-card rounded-xl border border-border overflow-hidden hover:border-accent/50 transition-colors">
                <img
                  src={p.image}
                  alt={t(p.title.ar, p.title.en)}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={200}
                />
                <div className="p-4">
                  <span className="text-xs text-accent font-medium">{t(p.category.ar, p.category.en)}</span>
                  <h3 className="text-sm font-bold text-foreground mt-1 group-hover:text-accent transition-colors line-clamp-2">
                    {t(p.title.ar, p.title.en)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

/**
 * Extract FAQ-like Q&A pairs from blog content (bold questions followed by answers).
 * Returns FAQPage JSON-LD or null if no FAQs found.
 */
function buildBlogFaqJsonLd(content: string): Record<string, unknown> | null {
  const faqRegex = /\*\*([^*]+\?)\*\*\n+([^*\n#][^\n]+)/g;
  const faqs: Array<{ question: string; answer: string }> = [];
  let match: RegExpExecArray | null;

  while ((match = faqRegex.exec(content)) !== null) {
    faqs.push({ question: match[1].trim(), answer: match[2].trim() });
  }

  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export default BlogPost;
