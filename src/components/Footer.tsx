import { Crown } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-primary" />
          <span className="font-display text-lg tracking-wider text-foreground">
            SAYARTI<span className="text-primary">JO</span>
          </span>
        </div>
        <p className="text-muted-foreground font-body text-xs tracking-wider">
          © 2026 SayartiJo. The art of luxury mobility.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
