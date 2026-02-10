import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BadgeCheck, Gauge, Users } from "lucide-react";
import type { Car } from "@/data/cars";
import { useLang } from "@/contexts/LangContext";

const CarCard = ({ car, index }: { car: Car; index: number }) => {
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/car/${car.id}`} className="group block">
        <div className="bg-card border border-border rounded-sm overflow-hidden hover-gold transition-all duration-300 hover:border-primary/30">
          <div className="aspect-[16/10] overflow-hidden relative">
            <img
              src={car.image}
              alt={`${car.brand} ${car.name}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-3 end-3 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-sm">
              <span className="text-primary font-body text-xs tracking-wider font-semibold">
                ${car.pricePerDay}{t("fleet.perDay")}
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
            <div className="flex items-center gap-4 text-muted-foreground">
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
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;
