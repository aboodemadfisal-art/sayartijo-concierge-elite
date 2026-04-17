import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { showBannerAd, hideBannerAd } from "@/lib/admob";
import { Fuel, Zap, Leaf } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CollectionCard from "@/components/CollectionCard";
import CarCard from "@/components/CarCard";
import ConciergeSection from "@/components/ConciergeSection";
import GuaranteesSection from "@/components/GuaranteesSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { collections } from "@/data/cars";
import { getAllCars } from "@/lib/carStore";
import type { Car, FuelType } from "@/data/cars";
import { useLang } from "@/contexts/LangContext";

const fuelFilters: { id: FuelType | "all"; labelKey: string; icon?: typeof Fuel }[] = [
  { id: "all", labelKey: "fuel.all" },
  { id: "gasoline", labelKey: "fuel.gasoline", icon: Fuel },
  { id: "electric", labelKey: "fuel.electric", icon: Zap },
  { id: "hybrid", labelKey: "fuel.hybrid", icon: Leaf },
];

const Index = () => {
  const { t } = useLang();
  const [bookingCar, setBookingCar] = useState<Car | null>(null);
  const [fuelFilter, setFuelFilter] = useState<FuelType | "all">("all");

  const allCars = useMemo(() => getAllCars(), []);

  useEffect(() => {
    showBannerAd();
    return () => {
      hideBannerAd();
    };
  }, []);

  const filteredCars = useMemo(() => {
    if (fuelFilter === "all") return allCars;
    return allCars.filter((car) => car.fuelType === fuelFilter);
  }, [fuelFilter, allCars]);

  // Group cars by brand
  const groupedCars = useMemo(() => {
    const groups: Record<string, Car[]> = {};
    filteredCars.forEach((car) => {
      if (!groups[car.brand]) groups[car.brand] = [];
      groups[car.brand].push(car);
    });
    // Sort brands alphabetically
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredCars]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      <section id="collections" className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-3">
              {t("collections.subtitle")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground">
              {t("collections.title")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((col, i) => (
              <CollectionCard key={col.id} collection={col} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="fleet" className="section-padding bg-card/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-3">
                {t("fleet.subtitle")}
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground">
                {t("fleet.title")}
              </h2>
            </div>

            {/* Fuel type filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {fuelFilters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setFuelFilter(filter.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-sm border font-body text-xs tracking-wider transition-colors duration-200 ${
                      fuelFilter === filter.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    {t(filter.labelKey)}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Cars grouped by brand */}
          {groupedCars.map(([brand, cars]) => (
            <div key={brand} className="mb-12 last:mb-0">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl text-foreground mb-6 border-s-4 border-primary ps-4"
              >
                {brand}
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car, i) => (
                  <CarCard key={car.id} car={car} index={i} onBook={setBookingCar} />
                ))}
              </div>
            </div>
          ))}

          {filteredCars.length === 0 && (
            <p className="text-center text-muted-foreground font-body py-12">
              {t("fleet.noResults") || "No cars found"}
            </p>
          )}
        </div>
      </section>

      <GuaranteesSection />
      <ConciergeSection />
      <Footer />

      {bookingCar && (
        <BookingModal car={bookingCar} onClose={() => setBookingCar(null)} />
      )}
    </div>
  );
};

export default Index;
