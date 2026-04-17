import { Capacitor } from "@capacitor/core";
import {
  AdMob,
  BannerAdPosition,
  BannerAdSize,
  type BannerAdOptions,
} from "@capacitor-community/admob";

export const BANNER_AD_UNIT_ID = "ca-app-pub-4933996515863261/8991217036";

let initialized = false;

export const isNative = () => Capacitor.isNativePlatform();

export async function initializeAdMob() {
  if (!isNative() || initialized) return;
  try {
    await AdMob.initialize({
      initializeForTesting: false,
    });
    initialized = true;
  } catch (err) {
    console.error("AdMob init failed", err);
  }
}

export async function showBannerAd() {
  if (!isNative()) return;
  await initializeAdMob();
  const options: BannerAdOptions = {
    adId: BANNER_AD_UNIT_ID,
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: false,
  };
  try {
    await AdMob.showBanner(options);
  } catch (err) {
    console.error("AdMob banner failed", err);
  }
}

export async function hideBannerAd() {
  if (!isNative()) return;
  try {
    await AdMob.removeBanner();
  } catch (err) {
    console.error("AdMob hide banner failed", err);
  }
}
