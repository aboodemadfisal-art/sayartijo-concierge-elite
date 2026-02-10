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
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  carCount: number;
}

import heroCarImg from "@/assets/hero-car.jpg";
import lamboImg from "@/assets/car-lambo.jpg";
import gclassImg from "@/assets/car-gclass.jpg";
import rollsImg from "@/assets/car-rolls.jpg";
import ferrariImg from "@/assets/car-ferrari.jpg";
import bentleyImg from "@/assets/car-bentley.jpg";

export const collections: Collection[] = [
  { id: "supercars", title: "Supercars", description: "Raw power meets Italian artistry", image: lamboImg, carCount: 12 },
  { id: "prestige", title: "Prestige Sedans", description: "The pinnacle of refinement", image: rollsImg, carCount: 8 },
  { id: "luxury-suv", title: "Luxury SUVs", description: "Command every road", image: gclassImg, carCount: 6 },
];

export const featuredCars: Car[] = [
  {
    id: "1",
    name: "Aventador SVJ",
    brand: "Lamborghini",
    image: lamboImg,
    pricePerDay: 2500,
    category: "Supercars",
    engine: "6.5L V12",
    acceleration: "2.8s",
    topSpeed: "350 km/h",
    seats: 2,
    features: ["Carbon Ceramic Brakes", "Active Aerodynamics", "Alcantara Interior"],
    vendor: "Elite Motors",
    vendorVerified: true,
    available: true,
  },
  {
    id: "2",
    name: "G63 AMG",
    brand: "Mercedes-Benz",
    image: gclassImg,
    pricePerDay: 1800,
    category: "Luxury SUVs",
    engine: "4.0L V8 Biturbo",
    acceleration: "4.5s",
    topSpeed: "220 km/h",
    seats: 5,
    features: ["AMG Performance Exhaust", "Designo Leather", "Night Package"],
    vendor: "Prestige Garage",
    vendorVerified: true,
    available: true,
  },
  {
    id: "3",
    name: "Ghost",
    brand: "Rolls-Royce",
    image: rollsImg,
    pricePerDay: 3200,
    category: "Prestige Sedans",
    engine: "6.75L V12",
    acceleration: "4.8s",
    topSpeed: "250 km/h",
    seats: 5,
    features: ["Starlight Headliner", "Bespoke Audio", "Rear Theatre"],
    vendor: "Royal Fleet",
    vendorVerified: true,
    available: true,
  },
  {
    id: "4",
    name: "488 GTB",
    brand: "Ferrari",
    image: ferrariImg,
    pricePerDay: 2200,
    category: "Supercars",
    engine: "3.9L V8 Twin-Turbo",
    acceleration: "3.0s",
    topSpeed: "330 km/h",
    seats: 2,
    features: ["Side Slip Control", "Carbon Fiber Racing Seats", "Fiorano Handling Package"],
    vendor: "Elite Motors",
    vendorVerified: true,
    available: true,
  },
  {
    id: "5",
    name: "Continental GT",
    brand: "Bentley",
    image: bentleyImg,
    pricePerDay: 1900,
    category: "Prestige Sedans",
    engine: "6.0L W12",
    acceleration: "3.7s",
    topSpeed: "333 km/h",
    seats: 4,
    features: ["Rotating Display", "Diamond Knurling", "Naim Audio"],
    vendor: "Prestige Garage",
    vendorVerified: true,
    available: true,
  },
  {
    id: "6",
    name: "Phantom VIII",
    brand: "Rolls-Royce",
    image: heroCarImg,
    pricePerDay: 4000,
    category: "Prestige Sedans",
    engine: "6.75L V12",
    acceleration: "5.3s",
    topSpeed: "250 km/h",
    seats: 5,
    features: ["Gallery Dashboard", "Starlight Headliner", "Champagne Cooler"],
    vendor: "Royal Fleet",
    vendorVerified: true,
    available: true,
  },
];

export const heroImage = heroCarImg;
