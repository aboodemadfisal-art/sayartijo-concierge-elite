import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Gauge, Users, Zap, Car, MessageCircle, Fuel, Leaf, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { getAllCars } from "@/lib/carStore";
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { getCarStatus } from "@/lib/carStatus";

const fuelIcons = { gasoline: Fuel, electric: Zap, hybrid: Leaf };

const CarDetail = () => {
  const { id } = useParams();
  const car = getAllCars().find((c) => c.id === id);
  const [showBooking, setShowBooking] = useState(false);
  const { t, isRTL } = useLang();

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const carStatus = car ? getCarStatus(car.id) : { status: "متاحة", note: "", startDate: "", endDate: "" };

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground font-display text-2xl">{t("detail.notFound")}</p>
      </div>
    );
  }

  const FuelIcon = fuelIcons[car.fuelType];

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
              className="rounded-sm overflow-hidden relative"
            >
              <img
                src={car.image}
                alt={`${car.brand} ${car.name}`}
                className="w-full h-full object-cover aspect-[4/3]"
              />
              <div className="absolute bottom-4 end-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-sm border border-primary/30">
                <span className="text-primary font-body text-[10px] tracking-wider font-semibold">
                  SAYARTI.JO
                </span>
              </div>
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

              <p className="text-muted-foreground font-body text-sm mb-4">
                {t("detail.by")} <span className="text-foreground">{car.vendor}</span>
              </p>

              {/* Status & Fuel badges */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-body text-xs ${
                    carStatus.status === "متاحة"
                      ? "bg-green-500/10 text-green-500"
                      : carStatus.status === "محجوزة"
                      ? "bg-red-500/10 text-red-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  <Shield className="h-3.5 w-3.5" />
                  {carStatus.status}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-primary/10 text-primary font-body text-xs">
                  <FuelIcon className="h-3.5 w-3.5" />
                  {t(`fuel.${car.fuelType}`)}
                </span>
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

              <button
                onClick={() => setShowBooking(true)}
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase rounded-sm hover:bg-primary/90 transition-colors duration-300"
              >
                <MessageCircle className="h-5 w-5" />
                {t("booking.whatsapp")}
              </button>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />

      {showBooking && (
        <BookingModal car={car} onClose={() => setShowBooking(false)} />
      )}
    </div>
  );
};

export default CarDetail;
