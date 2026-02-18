import { Crown } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border bg-card px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8 text-center">
          سيارتي جو هي الوجهة الأولى لتأجير السيارات الفاخرة في الأردن. نقدم لك أفضل سيارات للإيجار في عمان مع خدمة التوصيل. إذا كنت تبحث عن تأجير سيارات فاخرة أو سيارات زفاف أو سيارات مع سائق، نحن هنا لخدمتك.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            <span className="font-display text-lg tracking-wider text-foreground">
              SAYARTI<span className="text-primary">JO</span>
            </span>
          </div>
          <p className="text-muted-foreground font-body text-xs tracking-wider">
            {t("footer.tagline")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
