import { useI18n } from "@/lib/i18n";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  serviceName?: string;
  className?: string;
  variant?: "floating" | "inline" | "hero";
}

const WHATSAPP_NUMBER = "+201017238942";

export const getWhatsAppUrl = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const WhatsAppButton = ({ serviceName, className = "", variant = "inline" }: WhatsAppButtonProps) => {
  const { t, isAr } = useI18n();

  const message = serviceName
    ? isAr
      ? `مرحبًا، أريد طلب خدمة ${serviceName}`
      : `Hello, I want to request the ${serviceName} service.`
    : isAr
      ? "مرحبًا، أريد الاستفسار عن خدماتكم"
      : "Hello, I want to inquire about your services.";

  const label = t("اطلب الخدمة الآن", "Request Service Now");
  const url = getWhatsAppUrl(message);

  if (variant === "floating") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 gradient-gold text-accent-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-gold animate-pulse-gold hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    );
  }

  if (variant === "hero") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 gradient-gold text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg shadow-gold hover:opacity-90 transition-opacity ${className}`}
      >
        <MessageCircle className="w-6 h-6" />
        {label}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 gradient-gold text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-gold ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      {label}
    </a>
  );
};

export default WhatsAppButton;
