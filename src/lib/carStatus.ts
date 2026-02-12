export interface CarStatusInfo {
  status: string;
  note: string;
  startDate: string;
  endDate: string;
}

export function getCarStatus(carId: string): CarStatusInfo {
  try {
    const saved = localStorage.getItem("sayarti_car_statuses");
    if (saved) {
      const statuses = JSON.parse(saved);
      const info = statuses[carId] as CarStatusInfo | undefined;
      if (info) {
        // Auto-expire: if booked and endDate has passed, reset to available
        if (info.status === "محجوزة" && info.endDate) {
          const end = new Date(info.endDate);
          end.setHours(23, 59, 59, 999);
          if (end < new Date()) {
            const updated = { ...statuses, [carId]: { status: "متاحة", note: "", startDate: "", endDate: "" } };
            localStorage.setItem("sayarti_car_statuses", JSON.stringify(updated));
            return { status: "متاحة", note: "", startDate: "", endDate: "" };
          }
        }
        return info;
      }
    }
  } catch {}
  return { status: "متاحة", note: "", startDate: "", endDate: "" };
}

export function isCarAvailable(carId: string): boolean {
  return getCarStatus(carId).status === "متاحة";
}
