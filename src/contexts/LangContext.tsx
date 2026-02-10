import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Lang = "en" | "ar";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.collections": { en: "Collections", ar: "المجموعات" },
  "nav.showrooms": { en: "Showrooms", ar: "صالات العرض" },
  "nav.concierge": { en: "Concierge", ar: "خدمات VIP" },
  "nav.bookNow": { en: "Book Now", ar: "احجز الآن" },

  // Hero
  "hero.subtitle": { en: "Jordan's Premier Luxury Fleet", ar: "أسطول الأردن الفاخر الأول" },
  "hero.title1": { en: "Drive", ar: "قُد" },
  "hero.title2": { en: " Extraordinary", ar: " التميّز" },
  "hero.description": {
    en: "Curated supercars and prestige vehicles, delivered to your door with white-glove service.",
    ar: "سيارات خارقة ومركبات فاخرة مختارة بعناية، تُوصل إلى بابك بخدمة متميزة.",
  },
  "hero.explore": { en: "Explore Fleet", ar: "استكشف الأسطول" },
  "hero.concierge": { en: "Concierge Services", ar: "خدمات الكونسيرج" },

  // Collections
  "collections.subtitle": { en: "Curated For You", ar: "مختارة لك" },
  "collections.title": { en: "Luxury Collections", ar: "مجموعات فاخرة" },
  "collections.vehicles": { en: "vehicles", ar: "مركبة" },

  // Collection names
  "collection.supercars": { en: "Supercars", ar: "السيارات الخارقة" },
  "collection.supercars.desc": { en: "Raw power meets Italian artistry", ar: "القوة الخام تلتقي بالفن الإيطالي" },
  "collection.prestige": { en: "Prestige Sedans", ar: "سيدان فاخرة" },
  "collection.prestige.desc": { en: "The pinnacle of refinement", ar: "قمة الرقي والفخامة" },
  "collection.suv": { en: "Luxury SUVs", ar: "SUV فاخرة" },
  "collection.suv.desc": { en: "Command every road", ar: "تحكّم بكل طريق" },

  // Fleet
  "fleet.subtitle": { en: "Handpicked Excellence", ar: "تميّز مختار بعناية" },
  "fleet.title": { en: "Featured Fleet", ar: "الأسطول المميز" },
  "fleet.perDay": { en: "/day", ar: "/يوم" },
  "fleet.seats": { en: "seats", ar: "مقاعد" },

  // Concierge
  "concierge.subtitle": { en: "White-Glove Experience", ar: "تجربة الخدمة الراقية" },
  "concierge.title": { en: "Concierge Services", ar: "خدمات الكونسيرج" },
  "concierge.chauffeur": { en: "Chauffeur Service", ar: "خدمة السائق الخاص" },
  "concierge.chauffeur.desc": { en: "Professional drivers available 24/7 for any occasion.", ar: "سائقون محترفون متاحون على مدار الساعة لأي مناسبة." },
  "concierge.delivery": { en: "Door-to-Door Delivery", ar: "توصيل من الباب للباب" },
  "concierge.delivery.desc": { en: "Your vehicle delivered and collected at your location.", ar: "سيارتك تُوصل وتُستلم من موقعك." },
  "concierge.insurance": { en: "Full Insurance", ar: "تأمين شامل" },
  "concierge.insurance.desc": { en: "Comprehensive coverage for complete peace of mind.", ar: "تغطية شاملة لراحة بالك التامة." },
  "concierge.support": { en: "24/7 Support", ar: "دعم على مدار الساعة" },
  "concierge.support.desc": { en: "Dedicated concierge line for all your needs.", ar: "خط كونسيرج مخصص لجميع احتياجاتك." },

  // Car Detail
  "detail.back": { en: "Back to Fleet", ar: "العودة للأسطول" },
  "detail.by": { en: "by", ar: "من" },
  "detail.engine": { en: "Engine", ar: "المحرك" },
  "detail.acceleration": { en: "0-100 km/h", ar: "٠-١٠٠ كم/س" },
  "detail.topSpeed": { en: "Top Speed", ar: "السرعة القصوى" },
  "detail.seats": { en: "Seats", ar: "المقاعد" },
  "detail.features": { en: "Luxury Features", ar: "مزايا فاخرة" },
  "detail.addons": { en: "Add-on Services", ar: "خدمات إضافية" },
  "detail.chauffeur": { en: "Chauffeur Service", ar: "خدمة السائق الخاص" },
  "detail.chauffeurPrice": { en: "+$300/day", ar: "+٣٠٠$/يوم" },
  "detail.doorDelivery": { en: "Door-to-Door Delivery", ar: "توصيل من الباب للباب" },
  "detail.doorDeliveryPrice": { en: "+$150", ar: "+١٥٠$" },
  "detail.notFound": { en: "Vehicle not found", ar: "المركبة غير موجودة" },

  // Footer
  "footer.tagline": { en: "© 2026 SayartiJo. The art of luxury mobility.", ar: "© ٢٠٢٦ سيارتي جو. فن التنقل الفاخر." },

  // Language
  "lang.switch": { en: "العربية", ar: "English" },
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string) => translations[key]?.[lang] ?? key,
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL: lang === "ar" }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
};
