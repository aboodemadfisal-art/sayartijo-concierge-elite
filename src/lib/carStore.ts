import { featuredCars as defaultCars } from "@/data/cars";
import type { Car } from "@/data/cars";

const STORAGE_KEY = "sayarti_custom_cars";
const EDITS_KEY = "sayarti_car_edits";

export interface CarEdits {
  name?: string;
  brand?: string;
  image?: string;
  engine?: string;
  acceleration?: string;
  topSpeed?: string;
  seats?: number;
  features?: string[];
  category?: string;
  fuelType?: "gasoline" | "electric" | "hybrid";
  occasion?: string[];
}

function getCustomCars(): Car[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function getCarEdits(): Record<string, CarEdits> {
  try {
    const saved = localStorage.getItem(EDITS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function getAllCars(): Car[] {
  const edits = getCarEdits();
  const baseCars = defaultCars.map((car) => {
    const edit = edits[car.id];
    return edit ? { ...car, ...edit } : car;
  });
  const custom = getCustomCars();
  return [...baseCars, ...custom];
}

export function addCar(car: Car): void {
  const custom = getCustomCars();
  custom.push(car);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
}

export function updateCarEdits(carId: string, edits: CarEdits): void {
  // Check if it's a custom car
  const custom = getCustomCars();
  const customIdx = custom.findIndex((c) => c.id === carId);
  if (customIdx !== -1) {
    custom[customIdx] = { ...custom[customIdx], ...edits };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
  } else {
    // It's a default car, save edits overlay
    const allEdits = getCarEdits();
    allEdits[carId] = { ...allEdits[carId], ...edits };
    localStorage.setItem(EDITS_KEY, JSON.stringify(allEdits));
  }
}

export function deleteCar(carId: string): void {
  const custom = getCustomCars();
  const filtered = custom.filter((c) => c.id !== carId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function isCustomCar(carId: string): boolean {
  return getCustomCars().some((c) => c.id === carId);
}

export function generateCarId(): string {
  return `custom_${Date.now()}`;
}
