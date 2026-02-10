import { motion } from "framer-motion";
import { Car, MapPin, Shield, Clock } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const ConciergeSection = () => {
  const { t } = useLang();

  const services = [
    { icon: Car, title: t("concierge.chauffeur"), description: t("concierge.chauffeur.desc") },
    { icon: MapPin, title: t("concierge.delivery"), description: t("concierge.delivery.desc") },
    { icon: Shield, title: t("concierge.insurance"), description: t("concierge.insurance.desc") },
    { icon: Clock, title: t("concierge.support"), description: t("concierge.support.desc") },
  ];

  return (
    <section id="concierge" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-3">
            {t("concierge.subtitle")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            {t("concierge.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-card border border-border rounded-sm text-center hover-gold hover:border-primary/30 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-5">
                <service.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConciergeSection;
