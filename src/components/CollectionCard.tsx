import { motion } from "framer-motion";
import type { Collection } from "@/data/cars";

const CollectionCard = ({ collection, index }: { collection: Collection; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-sm cursor-pointer hover-gold"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-primary font-body text-xs tracking-[0.2em] uppercase mb-1">
          {collection.carCount} vehicles
        </p>
        <h3 className="font-display text-2xl text-foreground mb-1">{collection.title}</h3>
        <p className="text-muted-foreground font-body text-sm">{collection.description}</p>
      </div>
    </motion.div>
  );
};

export default CollectionCard;
