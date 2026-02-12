export interface Car {
  id: string;
  name: string;
  brand: string;
  image: string;
  pricePerDay: number;
  category: string;
  engine: string;
  acceleration: string;
  topSpeed: string;
  seats: number;
  features: string[];
  vendor: string;
  vendorVerified: boolean;
  available: boolean;
  occasion?: string[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  carCount: number;
}

import rollsGhostImg from "@/assets/car-rolls-ghost.jpg";
import rangeRoverImg from "@/assets/car-range-rover.jpg";
import bmw530Img from "@/assets/car-bmw-530.jpg";
import bmwI3Img from "@/assets/car-bmw-i3.jpg";
import bmw520Img from "@/assets/car-bmw-520.jpg";
import mustangImg from "@/assets/car-mustang.jpg";
import porscheImg from "@/assets/car-porsche.jpg";
import teslaXImg from "@/assets/car-tesla-x.jpg";
import bmw740Img from "@/assets/car-bmw-740.jpg";
import audiR8Img from "@/assets/car-audi-r8.jpg";
import nissanPatrolImg from "@/assets/car-nissan-patrol.jpg";
import mgClassicImg from "@/assets/car-mg-classic.jpg";
import lexusLxImg from "@/assets/car-lexus-lx.jpg";
import teslaYBlackImg from "@/assets/car-tesla-y-black.jpg";
import teslaYBlack2Img from "@/assets/car-tesla-y-black2.jpg";
import mercedesEImg from "@/assets/car-mercedes-e.jpg";
import landcruiserWeddingImg from "@/assets/car-landcruiser-wedding.jpg";
import landcruiser300Img from "@/assets/car-landcruiser-300.jpg";

export const collections: Collection[] = [
  { id: "supercars", title: "Supercars", description: "Raw power meets Italian artistry", image: audiR8Img, carCount: 3 },
  { id: "prestige", title: "Prestige Sedans", description: "The pinnacle of refinement", image: bmw740Img, carCount: 8 },
  { id: "luxury-suv", title: "Luxury SUVs", description: "Command every road", image: landcruiser300Img, carCount: 6 },
  { id: "wedding", title: "Wedding Cars", description: "Make your day unforgettable", image: mgClassicImg, carCount: 4 },
];

export const featuredCars: Car[] = [
  {
    id: "1",
    name: "Ghost",
    brand: "Rolls-Royce",
    image: rollsGhostImg,
    pricePerDay: 0,
    category: "Prestige Sedans",
    engine: "6.75L V12",
    acceleration: "4.8s",
    topSpeed: "250 km/h",
    seats: 5,
    features: ["Starlight Headliner", "Bespoke Audio", "Rear Theatre"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["اعراس", "رجال اعمال", "استخدام شخصي"],
  },
  {
    id: "2",
    name: "Range Rover Sport",
    brand: "Land Rover",
    image: rangeRoverImg,
    pricePerDay: 0,
    category: "Luxury SUVs",
    engine: "3.0L I6 Turbo",
    acceleration: "5.2s",
    topSpeed: "242 km/h",
    seats: 5,
    features: ["Meridian Audio", "Air Suspension", "Panoramic Roof"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["رجال اعمال", "استخدام شخصي"],
  },
  {
    id: "3",
    name: "530i",
    brand: "BMW",
    image: bmw530Img,
    pricePerDay: 0,
    category: "Prestige Sedans",
    engine: "2.0L I4 Turbo",
    acceleration: "6.1s",
    topSpeed: "250 km/h",
    seats: 5,
    features: ["M Sport Package", "Harman Kardon", "Leather Interior"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["رجال اعمال", "استخدام شخصي"],
  },
  {
    id: "4",
    name: "i3 M Sport",
    brand: "BMW",
    image: bmwI3Img,
    pricePerDay: 0,
    category: "Prestige Sedans",
    engine: "Electric",
    acceleration: "7.3s",
    topSpeed: "160 km/h",
    seats: 4,
    features: ["Electric Drive", "Navigation Pro", "Sport Seats"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["استخدام شخصي"],
  },
  {
    id: "5",
    name: "520i",
    brand: "BMW",
    image: bmw520Img,
    pricePerDay: 0,
    category: "Prestige Sedans",
    engine: "2.0L I4 Turbo",
    acceleration: "7.5s",
    topSpeed: "235 km/h",
    seats: 5,
    features: ["Luxury Line", "Comfort Access", "Ambient Lighting"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["رجال اعمال", "اعراس", "استخدام شخصي"],
  },
  {
    id: "6",
    name: "Mustang GT",
    brand: "Ford",
    image: mustangImg,
    pricePerDay: 0,
    category: "Supercars",
    engine: "5.0L V8",
    acceleration: "4.2s",
    topSpeed: "250 km/h",
    seats: 4,
    features: ["Performance Pack", "Active Exhaust", "Launch Control"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["اعراس", "استخدام شخصي"],
  },
  {
    id: "7",
    name: "Panamera",
    brand: "Porsche",
    image: porscheImg,
    pricePerDay: 0,
    category: "Prestige Sedans",
    engine: "2.9L V6 Twin-Turbo",
    acceleration: "4.4s",
    topSpeed: "275 km/h",
    seats: 4,
    features: ["Sport Chrono", "PASM", "Bose Surround"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["اعراس", "رجال اعمال"],
  },
  {
    id: "8",
    name: "Model X",
    brand: "Tesla",
    image: teslaXImg,
    pricePerDay: 0,
    category: "Luxury SUVs",
    engine: "Electric Dual Motor",
    acceleration: "3.8s",
    topSpeed: "250 km/h",
    seats: 6,
    features: ["Falcon Wing Doors", "Autopilot", "Premium Interior"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["رجال اعمال", "استخدام شخصي"],
  },
  {
    id: "9",
    name: "740i",
    brand: "BMW",
    image: bmw740Img,
    pricePerDay: 0,
    category: "Prestige Sedans",
    engine: "3.0L I6 Turbo",
    acceleration: "5.1s",
    topSpeed: "250 km/h",
    seats: 5,
    features: ["Executive Lounge", "Bowers & Wilkins", "Rear Comfort Seats"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["اعراس", "رجال اعمال", "استخدام شخصي"],
  },
  {
    id: "10",
    name: "R8 V10",
    brand: "Audi",
    image: audiR8Img,
    pricePerDay: 0,
    category: "Supercars",
    engine: "5.2L V10",
    acceleration: "3.2s",
    topSpeed: "330 km/h",
    seats: 2,
    features: ["Quattro AWD", "Carbon Ceramic Brakes", "Virtual Cockpit"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["اعراس", "استخدام شخصي"],
  },
  {
    id: "11",
    name: "Patrol 2025",
    brand: "Nissan",
    image: nissanPatrolImg,
    pricePerDay: 0,
    category: "Luxury SUVs",
    engine: "5.6L V8",
    acceleration: "6.6s",
    topSpeed: "210 km/h",
    seats: 7,
    features: ["Intelligent 4WD", "Premium Leather", "Bose Audio"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["رجال اعمال", "استخدام شخصي"],
  },
  {
    id: "12",
    name: "MGB Roadster",
    brand: "MG",
    image: mgClassicImg,
    pricePerDay: 0,
    category: "Wedding Cars",
    engine: "1.8L Classic",
    acceleration: "12.0s",
    topSpeed: "165 km/h",
    seats: 2,
    features: ["Classic Convertible", "Wedding Ready", "Vintage Charm"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["اعراس"],
  },
  {
    id: "13",
    name: "LX 570",
    brand: "Lexus",
    image: lexusLxImg,
    pricePerDay: 0,
    category: "Luxury SUVs",
    engine: "5.7L V8",
    acceleration: "7.3s",
    topSpeed: "220 km/h",
    seats: 7,
    features: ["Mark Levinson Audio", "Crawl Control", "Cool Box"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["رجال اعمال", "اعراس", "استخدام شخصي"],
  },
  {
    id: "14",
    name: "Model Y",
    brand: "Tesla",
    image: teslaYBlackImg,
    pricePerDay: 0,
    category: "Luxury SUVs",
    engine: "Electric Dual Motor",
    acceleration: "5.0s",
    topSpeed: "217 km/h",
    seats: 5,
    features: ["Autopilot", "Glass Roof", "Premium Sound"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["رجال اعمال", "استخدام شخصي"],
  },
  {
    id: "15",
    name: "E-Class",
    brand: "Mercedes-Benz",
    image: mercedesEImg,
    pricePerDay: 0,
    category: "Prestige Sedans",
    engine: "2.0L I4 Turbo",
    acceleration: "6.4s",
    topSpeed: "250 km/h",
    seats: 5,
    features: ["AMG Line", "Burmester Audio", "MBUX System"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["رجال اعمال", "اعراس", "استخدام شخصي"],
  },
  {
    id: "16",
    name: "Land Cruiser VXR",
    brand: "Toyota",
    image: landcruiserWeddingImg,
    pricePerDay: 0,
    category: "Luxury SUVs",
    engine: "4.0L V6",
    acceleration: "8.2s",
    topSpeed: "200 km/h",
    seats: 7,
    features: ["Wedding Package", "VXR Body Kit", "Premium Interior"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["اعراس", "استخدام شخصي"],
  },
  {
    id: "17",
    name: "Land Cruiser 300",
    brand: "Toyota",
    image: landcruiser300Img,
    pricePerDay: 0,
    category: "Luxury SUVs",
    engine: "3.5L V6 Twin-Turbo",
    acceleration: "6.7s",
    topSpeed: "210 km/h",
    seats: 7,
    features: ["GR Sport", "Multi-Terrain Select", "JBL Audio"],
    vendor: "Sayarti Jo",
    vendorVerified: true,
    available: true,
    occasion: ["رجال اعمال", "اعراس", "استخدام شخصي"],
  },
];

export const heroImage = rollsGhostImg;
