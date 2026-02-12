import { motion } from "framer-motion";
import { BadgeCheck, Gauge, Users } from "lucide-react";
import type { Car } from "@/data/cars";
import { useLang } from "@/contexts/LangContext";

const CarCard = ({ car, index, onBook }: { car: Car; index: number; onBook: (car: Car) => void }) => {
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="group block">
        <div className="bg-card border border-border rounded-sm overflow-hidden hover-gold transition-all duration-300 hover:border-primary/30">
          <div className="aspect-[16/10] overflow-hidden relative">
            <img
              src={car.image}
              alt={`${car.brand} ${car.name}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-3 end-3 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-sm">
              <span className="text-primary font-body text-[10px] tracking-wider font-semibold">
                SAYARTI.JO
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-muted-foreground font-body text-xs tracking-widest uppercase">
                {car.brand}
              </span>
              {car.vendorVerified && (
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              )}
            </div>
            <h3 className="font-display text-lg text-foreground mb-3">{car.name}</h3>
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <span className="flex items-center gap-1 text-xs font-body">
                <Gauge className="h-3.5 w-3.5" />
                {car.acceleration}
              </span>
              <span className="flex items-center gap-1 text-xs font-body">
                <Users className="h-3.5 w-3.5" />
                {car.seats} {t("fleet.seats")}
              </span>
              <span className="text-xs font-body">{car.engine}</span>
            </div>
            <button
              onClick={() => onBook(car)}
              className="w-full py-2.5 bg-primary text-primary-foreground font-body text-xs tracking-wider uppercase rounded-sm hover:bg-primary/90 transition-colors duration-300"
            >
              {t("booking.enquire")}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
