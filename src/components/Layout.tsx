import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import { useI18n } from "@/lib/i18n";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "./WhatsAppButton";

const StickyMobileCTA = () => {
  const { t, isAr } = useI18n();
  const message = isAr
    ? "مرحبًا، أريد الاستفسار عن خدمات إنشاء وتصميم المواقع"
    : "Hello, I want to inquire about your web design services";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-primary/95 backdrop-blur-md border-t border-primary-foreground/10 p-3 safe-bottom">
      <a
        href={getWhatsAppUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full gradient-gold text-accent-foreground py-3 rounded-xl font-bold text-base shadow-gold"
      >
        <MessageCircle className="w-5 h-5" />
        {t("احصل على عرض سعر مجاني", "Get a Free Quote")}
      </a>
    </div>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20 pb-16 md:pb-0">{children}</main>
      <Footer />
      <WhatsAppButton variant="floating" />
      <StickyMobileCTA />
    </div>
  );
};

export default Layout;
