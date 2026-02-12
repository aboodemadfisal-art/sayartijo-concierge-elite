import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Briefcase, Heart, User } from "lucide-react";
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

const BookingModal = ({ car, onClose }: BookingModalProps) => {
  const [category, setCategory] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const { t } = useLang();

  const toggleExtra = (extra: string) => {
    setExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "962791616190";
    let message = `مرحباً اريد حجز من سيارتي دوت جو\nالسيارة: ${car.brand} ${car.name}\nالفئة: ${category}`;

    if (category === "اعراس" && extras.length > 0) {
      message += `\nالإضافات: ${extras.join(" و ")}`;
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

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
                      <label
                        key={extra.id}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={extras.includes(extra.id)}
                          onChange={() => toggleExtra(extra.id)}
                          className="accent-primary"
                        />
                        <span className="text-foreground font-body text-sm">
                          {t(extra.labelKey)}
                        </span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
