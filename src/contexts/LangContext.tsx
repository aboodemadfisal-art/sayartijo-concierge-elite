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
  "nav.admin": { en: "Admin", ar: "لوحة التحكم" },

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
  "collection.wedding": { en: "Wedding Cars", ar: "سيارات أعراس" },
  "collection.wedding.desc": { en: "Make your day unforgettable", ar: "اجعل يومك لا يُنسى" },

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

  // Booking
  "booking.title": { en: "Book", ar: "حجز" },
  "booking.selectType": { en: "Select usage type:", ar: "اختر نوع الاستخدام:" },
  "booking.business": { en: "Business", ar: "رجال أعمال" },
  "booking.wedding": { en: "Wedding", ar: "أعراس" },
  "booking.personal": { en: "Personal Use", ar: "استخدام شخصي" },
  "booking.weddingExtras": { en: "Wedding Extras", ar: "إضافات خاصة بالعرسان" },
  "booking.carDecor": { en: "Car Decoration", ar: "زينة سيارة" },
  "booking.bouquet": { en: "Bridal Bouquet", ar: "مسكة عروس" },
  "booking.whatsapp": { en: "Book via WhatsApp", ar: "حجز عبر واتساب" },
  "booking.enquire": { en: "Enquire Now", ar: "استفسر الآن" },
  "booking.additionalServices": { en: "Additional Services", ar: "خدمات إضافية" },
  "booking.driver": { en: "Private Chauffeur", ar: "سائق خاص" },
  "booking.doorDelivery": { en: "Door-to-Door Delivery", ar: "توصيل باب لباب" },
  "booking.vipService": { en: "VIP Service", ar: "خدمة VIP — تسليم في الموقع" },
  "booking.date": { en: "Booking Date", ar: "تاريخ الحجز" },
  "booking.time": { en: "Pickup Time", ar: "وقت الاستلام" },

  // Fuel types
  "fuel.all": { en: "All", ar: "الكل" },
  "fuel.gasoline": { en: "Gasoline", ar: "بنزين" },
  "fuel.electric": { en: "Electric", ar: "كهرباء" },
  "fuel.hybrid": { en: "Hybrid", ar: "هايبرد" },

  // Guarantees
  "guarantee.subtitle": { en: "Why Choose Us", ar: "لماذا نحن" },
  "guarantee.title": { en: "Our Guarantees", ar: "ضماناتنا" },
  "guarantee.insurance": { en: "Full Insurance", ar: "تأمين شامل" },
  "guarantee.insurance.desc": { en: "Every vehicle comes with comprehensive insurance coverage for your complete peace of mind.", ar: "كل مركبة تأتي بتغطية تأمينية شاملة لراحة بالك التامة." },
  "guarantee.fleet": { en: "Exclusive Fleet", ar: "أسطول حصري" },
  "guarantee.fleet.desc": { en: "Jordan's most unique collection of luxury and prestige vehicles, handpicked for excellence.", ar: "أفخم مجموعة سيارات في الأردن، مختارة بعناية للتميّز." },
  "guarantee.quality": { en: "Premium Quality", ar: "جودة فاخرة" },
  "guarantee.quality.desc": { en: "Each car is meticulously maintained and detailed to the highest standards before every rental.", ar: "كل سيارة تُصان وتُجهّز بأعلى المعايير قبل كل تأجير." },
  "guarantee.support": { en: "24/7 Support", ar: "دعم متواصل" },
  "guarantee.support.desc": { en: "Round-the-clock assistance with a dedicated concierge team always ready to help.", ar: "مساعدة على مدار الساعة مع فريق كونسيرج مخصص جاهز دائماً." },

  // Status labels
  "status.available": { en: "Available", ar: "متاحة" },
  "status.booked": { en: "Booked", ar: "محجوزة" },
  "status.maintenance": { en: "Under Maintenance", ar: "صيانة" },
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
