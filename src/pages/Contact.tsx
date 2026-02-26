import { useI18n } from "@/lib/i18n";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import WhatsAppButton, { getWhatsAppUrl } from "@/components/WhatsAppButton";
import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const { t, isAr } = useI18n();
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });

  const serviceOptions = [
    { ar: "إنشاء وتصميم موقع", en: "Web Design" },
    { ar: "إنشاء وتصميم متجر إلكتروني", en: "E-commerce Store" },
    { ar: "تحسين SEO", en: "SEO Services" },
    { ar: "تسويق رقمي", en: "Digital Marketing" },
    { ar: "أخرى", en: "Other" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = isAr
      ? `مرحبًا، أنا ${form.name}\nرقم الهاتف: ${form.phone}\nالبريد: ${form.email}\nالخدمة: ${form.service}\nالرسالة: ${form.message}`
      : `Hello, I'm ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service}\nMessage: ${form.message}`;
    window.open(getWhatsAppUrl(msg), "_blank");
  };

  return (
    <Layout>
      <SEOHead
        title={{ ar: "تواصل معنا – إنشاء وتصميم مواقع | WebEgypt", en: "Contact Us | WebEgypt" }}
        description={{ ar: "تواصل معنا للحصول على استشارة مجانية وعرض سعر مخصص لمشروعك في إنشاء وتصميم المواقع.", en: "Contact us for a free consultation and custom quote for your project." }}
        slug="contact"
      />

      <section className="py-16 md:py-24 gradient-navy">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-primary-foreground mb-4">
            {t("تواصل معنا", "Contact Us")}
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
            {t("نحن هنا لمساعدتك في إنشاء وتصميم موقعك. تواصل معنا اليوم واحصل على استشارة مجانية.", "We're here to help. Contact us today and get a free consultation.")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-5">
              <h2 className="text-xl font-bold text-foreground mb-2">{t("أرسل رسالتك", "Send Your Message")}</h2>
              <input
                type="text" required placeholder={t("الاسم", "Name")}
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="tel" required placeholder={t("رقم الهاتف", "Phone")}
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="email" placeholder={t("البريد الإلكتروني", "Email")}
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <select
                required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">{t("اختر الخدمة", "Select Service")}</option>
                {serviceOptions.map((opt, i) => (
                  <option key={i} value={t(opt.ar, opt.en)}>{t(opt.ar, opt.en)}</option>
                ))}
              </select>
              <textarea
                required placeholder={t("رسالتك", "Your Message")} rows={4}
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
              <button type="submit" className="w-full gradient-gold text-accent-foreground py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-gold hover:opacity-90 transition-opacity">
                <Send className="w-5 h-5" />
                {t("إرسال عبر واتساب", "Send via WhatsApp")}
              </button>
            </form>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">{t("معلومات التواصل", "Contact Information")}</h2>
                <div className="space-y-4">
                  <a href="tel:+201017238942" className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-accent/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center"><Phone className="w-5 h-5 text-accent-foreground" /></div>
                    <div><div className="text-sm text-muted-foreground">{t("الهاتف", "Phone")}</div><div className="font-semibold text-foreground" dir="ltr">+20 101 723 8942</div></div>
                  </a>
                  <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
                    <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center"><Mail className="w-5 h-5 text-accent-foreground" /></div>
                    <div><div className="text-sm text-muted-foreground">{t("البريد", "Email")}</div><div className="font-semibold text-foreground">info@webegypt.com</div></div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
                    <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center"><MapPin className="w-5 h-5 text-accent-foreground" /></div>
                    <div><div className="text-sm text-muted-foreground">{t("الموقع", "Location")}</div><div className="font-semibold text-foreground">{t("مصر", "Egypt")}</div></div>
                  </div>
                </div>
              </div>
              <WhatsAppButton variant="inline" className="w-full justify-center" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
