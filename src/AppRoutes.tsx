import { Routes, Route, Navigate } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "@/pages/Index";
import ServicePage from "@/pages/ServicePage";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Portfolio from "@/pages/Portfolio";
import NotFound from "@/pages/NotFound";

const LangRoutes = () => (
  <I18nProvider>
    <ScrollToTop />
    <Routes>
      <Route path="" element={<Index />} />
      <Route path="contact" element={<Contact />} />
      <Route path="about" element={<About />} />
      <Route path="blog" element={<Blog />} />
      <Route path="blog/:slug" element={<BlogPost />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path=":slug" element={<ServicePage />} />
    </Routes>
  </I18nProvider>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/ar" replace />} />
    <Route path="/:lang/*" element={<LangRoutes />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
