import { useI18n } from "@/lib/i18n";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { blogPosts } from "@/lib/blog-data";
import { Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Blog = () => {
  const { lang, t } = useI18n();

  return (
    <Layout>
      <SEOHead
        title={{ ar: "مدونة إنشاء وتصميم المواقع | WebEgypt", en: "Blog | WebEgypt" }}
        description={{ ar: "مقالات ونصائح في إنشاء وتصميم المواقع والتسويق الرقمي وتحسين محركات البحث.", en: "Articles and tips on web design, digital marketing, and SEO." }}
        slug="blog"
      />

      <section className="py-16 md:py-24 gradient-navy">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-3xl md:text-5xl font-black text-primary-foreground mb-4">
              {t("المدونة", "Blog")}
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              {t("مقالات ونصائح في عالم الويب والتسويق الرقمي", "Articles and tips on web and digital marketing")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Featured Post */}
          {blogPosts[0] && (
            <AnimatedSection className="mb-12">
              <Link to={`/${lang}/blog/${blogPosts[0].slug}`} className="group block bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={blogPosts[0].image}
                      alt={t(blogPosts[0].title.ar, blogPosts[0].title.en)}
                      className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                      width={600}
                      height={400}
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-accent text-sm font-semibold mb-2">{t(blogPosts[0].category.ar, blogPosts[0].category.en)}</span>
                    <h2 className="text-2xl font-black text-foreground mb-3 group-hover:text-accent transition-colors">
                      {t(blogPosts[0].title.ar, blogPosts[0].title.en)}
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{t(blogPosts[0].excerpt.ar, blogPosts[0].excerpt.en)}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {blogPosts[0].date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {t(blogPosts[0].readingTime.ar, blogPosts[0].readingTime.en)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/${lang}/blog/${post.slug}`} className="group block bg-card rounded-xl border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={t(post.title.ar, post.title.en)}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width={400}
                      height={200}
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-accent font-semibold">{t(post.category.ar, post.category.en)}</span>
                    <h2 className="text-lg font-bold text-foreground mt-1 mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {t(post.title.ar, post.title.en)}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{t(post.excerpt.ar, post.excerpt.en)}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t(post.readingTime.ar, post.readingTime.en)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
