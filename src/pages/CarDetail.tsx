import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeCheck, Gauge, Users, Zap, Car, MapPin, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { featuredCars } from "@/data/cars";
import { useState } from "react";

const CarDetail = () => {
  const { id } = useParams();
  const car = featuredCars.find((c) => c.id === id);
  const [chauffeur, setChauffeur] = useState(false);
  const [delivery, setDelivery] = useState(false);

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground font-display text-2xl">Vehicle not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Back Link */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Fleet
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
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

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary font-body text-xs tracking-[0.3em] uppercase">
                  {car.brand}
                </span>
                {car.vendorVerified && (
                  <BadgeCheck className="h-4 w-4 text-primary" />
                )}
              </div>

              <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">
                {car.name}
              </h1>

              <p className="text-muted-foreground font-body text-sm mb-1">
                by <span className="text-foreground">{car.vendor}</span>
              </p>

              <div className="flex items-baseline gap-1 mt-4 mb-8">
                <span className="text-gold-gradient font-display text-3xl">
                  ${car.pricePerDay}
                </span>
                <span className="text-muted-foreground font-body text-sm">/ day</span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-card border border-border rounded-sm">
                  <Zap className="h-4 w-4 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Engine</p>
                  <p className="text-foreground font-body font-medium">{car.engine}</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-sm">
                  <Gauge className="h-4 w-4 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">0-100 km/h</p>
                  <p className="text-foreground font-body font-medium">{car.acceleration}</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-sm">
                  <Car className="h-4 w-4 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Top Speed</p>
                  <p className="text-foreground font-body font-medium">{car.topSpeed}</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-sm">
                  <Users className="h-4 w-4 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Seats</p>
                  <p className="text-foreground font-body font-medium">{car.seats}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-display text-lg text-foreground mb-3">Luxury Features</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground font-body text-xs rounded-sm tracking-wider"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div className="mb-8 space-y-3">
                <h3 className="font-display text-lg text-foreground mb-3">Add-on Services</h3>
                <label className="flex items-center gap-3 p-4 bg-card border border-border rounded-sm cursor-pointer hover:border-primary/30 transition-colors">
                  <input
                    type="checkbox"
                    checked={chauffeur}
                    onChange={(e) => setChauffeur(e.target.checked)}
                    className="accent-primary"
                  />
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-foreground font-body text-sm">Chauffeur Service</p>
                    <p className="text-muted-foreground font-body text-xs">+$300/day</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-card border border-border rounded-sm cursor-pointer hover:border-primary/30 transition-colors">
                  <input
                    type="checkbox"
                    checked={delivery}
                    onChange={(e) => setDelivery(e.target.checked)}
                    className="accent-primary"
                  />
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-foreground font-body text-sm">Door-to-Door Delivery</p>
                    <p className="text-muted-foreground font-body text-xs">+$150</p>
                  </div>
                </label>
              </div>

              {/* CTA */}
              <button className="w-full py-4 bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase rounded-sm hover:bg-primary/90 transition-colors duration-300">
                Book Now — ${car.pricePerDay + (chauffeur ? 300 : 0) + (delivery ? 150 : 0)}/day
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
