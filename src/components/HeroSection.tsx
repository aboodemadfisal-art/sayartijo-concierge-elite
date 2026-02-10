import { motion } from "framer-motion";
import { heroImage } from "@/data/cars";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const HeroSection = () => {
  const { t, isRTL } = useLang();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Luxury car" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 pb-24 md:pb-32">
        <motion.p
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-2xl"
        >
          {t("hero.title1")}
          <span className="text-gold-gradient">{t("hero.title2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-muted-foreground font-body text-lg md:text-xl max-w-lg mb-10"
        >
          {t("hero.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#fleet"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase rounded-sm hover:bg-primary/90 transition-all duration-300"
          >
            {t("hero.explore")}
            <ArrowIcon className="h-4 w-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </a>
          <a
            href="#concierge"
            className="inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground font-body text-sm tracking-wider uppercase rounded-sm hover:border-primary/50 hover:text-primary transition-all duration-300"
          >
            {t("hero.concierge")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
