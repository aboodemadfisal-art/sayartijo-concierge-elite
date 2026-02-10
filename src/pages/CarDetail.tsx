import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Gauge, Users, Zap, Car, MapPin, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { featuredCars } from "@/data/cars";
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

const CarDetail = () => {
  const { id } = useParams();
  const car = featuredCars.find((c) => c.id === id);
  const [chauffeur, setChauffeur] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const { t, isRTL } = useLang();

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground font-display text-2xl">{t("detail.notFound")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm tracking-wider"
          >
            <BackArrow className="h-4 w-4" />
            {t("detail.back")}
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="rounded-sm overflow-hidden"
            >
              <img
                src={car.image}
                alt={`${car.brand} ${car.name}`}
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary font-body text-xs tracking-[0.3em] uppercase">
                  {car.brand}
                </span>
                {car.vendorVerified && <BadgeCheck className="h-4 w-4 text-primary" />}
              </div>

              <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">{car.name}</h1>

              <p className="text-muted-foreground font-body text-sm mb-1">
                {t("detail.by")} <span className="text-foreground">{car.vendor}</span>
              </p>

              <div className="flex items-baseline gap-1 mt-4 mb-8">
                <span className="text-gold-gradient font-display text-3xl">${car.pricePerDay}</span>
                <span className="text-muted-foreground font-body text-sm">{t("fleet.perDay")}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-card border border-border rounded-sm">
                  <Zap className="h-4 w-4 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{t("detail.engine")}</p>
                  <p className="text-foreground font-body font-medium">{car.engine}</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-sm">
                  <Gauge className="h-4 w-4 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{t("detail.acceleration")}</p>
                  <p className="text-foreground font-body font-medium">{car.acceleration}</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-sm">
                  <Car className="h-4 w-4 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{t("detail.topSpeed")}</p>
                  <p className="text-foreground font-body font-medium">{car.topSpeed}</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-sm">
                  <Users className="h-4 w-4 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{t("detail.seats")}</p>
                  <p className="text-foreground font-body font-medium">{car.seats}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-display text-lg text-foreground mb-3">{t("detail.features")}</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((f) => (
                    <span key={f} className="px-3 py-1.5 bg-secondary text-secondary-foreground font-body text-xs rounded-sm tracking-wider">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8 space-y-3">
                <h3 className="font-display text-lg text-foreground mb-3">{t("detail.addons")}</h3>
                <label className="flex items-center gap-3 p-4 bg-card border border-border rounded-sm cursor-pointer hover:border-primary/30 transition-colors">
                  <input type="checkbox" checked={chauffeur} onChange={(e) => setChauffeur(e.target.checked)} className="accent-primary" />
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-foreground font-body text-sm">{t("detail.chauffeur")}</p>
                    <p className="text-muted-foreground font-body text-xs">{t("detail.chauffeurPrice")}</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-card border border-border rounded-sm cursor-pointer hover:border-primary/30 transition-colors">
                  <input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} className="accent-primary" />
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-foreground font-body text-sm">{t("detail.doorDelivery")}</p>
                    <p className="text-muted-foreground font-body text-xs">{t("detail.doorDeliveryPrice")}</p>
                  </div>
                </label>
              </div>

              <button className="w-full py-4 bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase rounded-sm hover:bg-primary/90 transition-colors duration-300">
                {t("nav.bookNow")} — ${car.pricePerDay + (chauffeur ? 300 : 0) + (delivery ? 150 : 0)}{t("fleet.perDay")}
              </button>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetail;
