import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Briefcase, Heart, User, CarFront, Truck, Crown, Calendar, Clock } from "lucide-react";
import type { Car } from "@/data/cars";
import { useLang } from "@/contexts/LangContext";

interface BookingModalProps {
  car: Car;
  onClose: () => void;
}

const categories = [
  { id: "رجال اعمال", icon: Briefcase, labelKey: "booking.business" },
  { id: "اعراس", icon: Heart, labelKey: "booking.wedding" },
  { id: "استخدام شخصي", icon: User, labelKey: "booking.personal" },
];

const weddingExtras = [
  { id: "زينة سيارة", labelKey: "booking.carDecor" },
  { id: "مسكة عروس", labelKey: "booking.bouquet" },
];

const additionalServices = [
  { id: "سائق خاص", icon: CarFront, labelKey: "booking.driver" },
  { id: "توصيل باب لباب", icon: Truck, labelKey: "booking.doorDelivery" },
  { id: "خدمة VIP", icon: Crown, labelKey: "booking.vipService" },
];

const BookingModal = ({ car, onClose }: BookingModalProps) => {
  const [category, setCategory] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const { t } = useLang();

  const toggleExtra = (extra: string) => {
    setExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  const toggleService = (service: string) => {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "962791616190";
    let message = `طلب جديد من Sayarti.jo\nالسيارة: ${car.brand} ${car.name}\nالفئة: ${category}`;

    if (bookingDate) {
      message += `\nتاريخ الحجز: ${bookingDate}`;
    }
    if (bookingTime) {
      message += `\nوقت الاستلام: ${bookingTime}`;
    }

    if (category === "اعراس" && extras.length > 0) {
      message += `\nإضافات عرس: ${extras.join(" و ")}`;
    }

    if (services.length > 0) {
      message += `\nخدمات إضافية: ${services.join(" و ")}`;
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-sm w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-display text-xl text-foreground">
              {t("booking.title")} {car.brand} {car.name}
            </h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-5 space-y-5">
            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center gap-1.5 text-muted-foreground font-body text-sm mb-2">
                  <Calendar className="h-4 w-4" />
                  {t("booking.date")}
                </label>
                <input
                  type="date"
                  min={today}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full p-3 bg-secondary border border-border rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-muted-foreground font-body text-sm mb-2">
                  <Clock className="h-4 w-4" />
                  {t("booking.time")}
                </label>
                <input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full p-3 bg-secondary border border-border rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Usage Category */}
            <div>
              <p className="text-muted-foreground font-body text-sm mb-3">{t("booking.selectType")}</p>
              <div className="space-y-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCategory(cat.id);
                        if (cat.id !== "اعراس") setExtras([]);
                      }}
                      className={`w-full flex items-center gap-3 p-4 rounded-sm border transition-colors duration-200 ${
                        category === cat.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-body text-sm tracking-wider">{t(cat.labelKey)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wedding Extras */}
            <AnimatePresence>
              {category === "اعراس" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-secondary rounded-sm space-y-3">
                    <p className="text-primary font-body text-xs tracking-wider uppercase">
                      {t("booking.weddingExtras")}
                    </p>
                    {weddingExtras.map((extra) => (
                      <label key={extra.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={extras.includes(extra.id)}
                          onChange={() => toggleExtra(extra.id)}
                          className="accent-primary"
                        />
                        <span className="text-foreground font-body text-sm">{t(extra.labelKey)}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Additional Services */}
            <div>
              <p className="text-muted-foreground font-body text-sm mb-3">{t("booking.additionalServices")}</p>
              <div className="space-y-2">
                {additionalServices.map((svc) => {
                  const Icon = svc.icon;
                  return (
                    <button
                      key={svc.id}
                      onClick={() => toggleService(svc.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-sm border transition-colors duration-200 ${
                        services.includes(svc.id)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-body text-sm tracking-wider">{t(svc.labelKey)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={sendToWhatsApp}
              disabled={!category}
              className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase rounded-sm hover:bg-primary/90 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <MessageCircle className="h-5 w-5" />
              {t("booking.whatsapp")}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
