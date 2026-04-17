import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.sayartijo43155ac93bb547fea443458bc00775a6',
  appName: 'sayartijo-concierge-elite',
  webDir: 'dist',
  server: {
    url: 'https://43155ac9-3bb5-47fe-a443-458bc00775a6.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-4933996515863261~6657277864',
    },
  },
};

export default config;
