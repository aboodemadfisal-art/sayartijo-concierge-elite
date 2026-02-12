import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CollectionCard from "@/components/CollectionCard";
import CarCard from "@/components/CarCard";
import ConciergeSection from "@/components/ConciergeSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { collections, featuredCars } from "@/data/cars";
import type { Car } from "@/data/cars";
import { useLang } from "@/contexts/LangContext";

const Index = () => {
  const { t } = useLang();
  const [bookingCar, setBookingCar] = useState<Car | null>(null);

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
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-3">
                {t("fleet.subtitle")}
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground">
                {t("fleet.title")}
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} onBook={setBookingCar} />
            ))}
          </div>
        </div>
      </section>

      <ConciergeSection />
      <Footer />

      {bookingCar && (
        <BookingModal car={bookingCar} onClose={() => setBookingCar(null)} />
      )}
    </div>
  );
};

export default Index;
