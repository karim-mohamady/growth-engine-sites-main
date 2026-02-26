import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { Service } from "@/lib/services";
import { ArrowLeft, ArrowRight, Globe, ShoppingCart, Search, Building2, Heart, Smile, Briefcase, Rocket, User, UtensilsCrossed, GraduationCap, Plane, Scale, Hammer, Car, Share2, Megaphone, Palette, PenTool, Target, RefreshCw, Zap, Wrench, Code, Store, CalendarCheck, Hospital, Lightbulb, FileText, DollarSign } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, ShoppingCart, Search, Building2, Heart, Smile, Briefcase, Rocket, User, UtensilsCrossed, GraduationCap, Plane, Scale, Hammer, Car, Share2, Megaphone, Palette, PenTool, Target, RefreshCw, Zap, Wrench, Code, Store, CalendarCheck, Hospital, Lightbulb, FileText, DollarSign,
};

const ServiceCard = ({ service }: { service: Service }) => {
  const { lang, t, isAr } = useI18n();
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const IconComponent = iconMap[service.icon] || Globe;

  return (
    <Link
      to={`/${lang}/${service.slug}`}
      className="group block bg-card rounded-xl p-6 border border-border hover:border-accent/50 hover:shadow-gold transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <IconComponent className="w-6 h-6 text-accent-foreground" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
        {t(service.title.ar, service.title.en)}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
        {t(service.description.ar, service.description.en).slice(0, 120)}...
      </p>
      <span className="inline-flex items-center gap-1 text-accent text-sm font-medium">
        {t("اعرف المزيد", "Learn More")}
        <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
      </span>
    </Link>
  );
};

export default ServiceCard;
