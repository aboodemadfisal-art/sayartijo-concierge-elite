import { motion } from "framer-motion";
import { Shield, Car, Star, Clock } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const guarantees = [
  { icon: Shield, titleKey: "guarantee.insurance", descKey: "guarantee.insurance.desc" },
  { icon: Car, titleKey: "guarantee.fleet", descKey: "guarantee.fleet.desc" },
  { icon: Star, titleKey: "guarantee.quality", descKey: "guarantee.quality.desc" },
  { icon: Clock, titleKey: "guarantee.support", descKey: "guarantee.support.desc" },
];

const GuaranteesSection = () => {
  const { t } = useLang();

  return (
    <section id="guarantees" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-3">
            {t("guarantee.subtitle")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            {t("guarantee.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-sm p-6 text-center hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">
                  {t(item.titleKey)}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {t(item.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GuaranteesSection;
