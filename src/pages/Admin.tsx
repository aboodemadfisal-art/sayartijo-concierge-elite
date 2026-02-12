import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Car, CheckCircle, XCircle, Calendar, ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredCars } from "@/data/cars";

const ADMIN_PIN = "5050";

const Admin = () => {
  const [pin, setPin] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [carStatuses, setCarStatuses] = useState<Record<string, { status: string; note: string; startDate: string; endDate: string }>>(
    () => {
      const saved = localStorage.getItem("sayarti_car_statuses");
      return saved ? JSON.parse(saved) : {};
    }
  );

  const handlePin = (value: string) => {
    setPin(value);
    if (value === ADMIN_PIN) {
      setIsAuth(true);
    }
  };

  const updateStatus = (carId: string, updates: Partial<{ status: string; note: string; startDate: string; endDate: string }>) => {
    const current = carStatuses[carId] || { status: "متاحة", note: "", startDate: "", endDate: "" };
    const updated = { ...carStatuses, [carId]: { ...current, ...updates } };
    setCarStatuses(updated);
    localStorage.setItem("sayarti_car_statuses", JSON.stringify(updated));
  };

  const cancelBooking = (carId: string) => {
    updateStatus(carId, { status: "متاحة", note: "", startDate: "", endDate: "" });
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-sm p-8 w-full max-w-sm text-center"
        >
          <Lock className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="font-display text-2xl text-foreground mb-2">لوحة التحكم</h2>
          <p className="text-muted-foreground font-body text-sm mb-6">أدخل رمز الدخول</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => handlePin(e.target.value)}
            placeholder="••••"
            maxLength={4}
            className="w-full text-center text-2xl tracking-[1em] bg-secondary border border-border rounded-sm p-4 text-foreground font-mono focus:outline-none focus:border-primary transition-colors"
          />
          {pin.length === 4 && pin !== ADMIN_PIN && (
            <p className="text-destructive font-body text-sm mt-3">رمز خاطئ</p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Car className="h-5 w-5 text-primary" />
          <h1 className="font-display text-xl text-foreground">لوحة تحكم Sayarti.jo</h1>
        </div>
        <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-4">
        {featuredCars.map((car) => {
          const info = carStatuses[car.id] || { status: "متاحة", note: "", startDate: "", endDate: "" };
          return (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-sm p-4 flex flex-col md:flex-row gap-4"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full md:w-32 h-24 object-cover rounded-sm"
              />
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg text-foreground">
                    {car.brand} {car.name}
                  </h3>
                  <span
                    className={`flex items-center gap-1 font-body text-xs px-2 py-1 rounded-sm ${
                      info.status === "متاحة"
                        ? "bg-green-500/10 text-green-500"
                        : info.status === "محجوزة"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {info.status === "متاحة" ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : info.status === "صيانة" ? (
                      <AlertTriangle className="h-3 w-3" />
                    ) : (
                      <XCircle className="h-3 w-3" />
                    )}
                    {info.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(car.id, { status: "متاحة", note: "", startDate: "", endDate: "" })}
                    className={`px-3 py-1.5 rounded-sm font-body text-xs border transition-colors ${
                      info.status === "متاحة"
                        ? "border-green-500 bg-green-500/10 text-green-500"
                        : "border-border text-muted-foreground hover:border-green-500/50"
                    }`}
                  >
                    متاحة
                  </button>
                  <button
                    onClick={() => updateStatus(car.id, { status: "محجوزة" })}
                    className={`px-3 py-1.5 rounded-sm font-body text-xs border transition-colors ${
                      info.status === "محجوزة"
                        ? "border-red-500 bg-red-500/10 text-red-500"
                        : "border-border text-muted-foreground hover:border-red-500/50"
                    }`}
                  >
                    محجوزة
                  </button>
                  <button
                    onClick={() => updateStatus(car.id, { status: "صيانة" })}
                    className={`px-3 py-1.5 rounded-sm font-body text-xs border transition-colors ${
                      info.status === "صيانة"
                        ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                        : "border-border text-muted-foreground hover:border-yellow-500/50"
                    }`}
                  >
                    صيانة
                  </button>
                  {info.status === "محجوزة" && (
                    <button
                      onClick={() => cancelBooking(car.id)}
                      className="px-3 py-1.5 rounded-sm font-body text-xs border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      إلغاء الحجز
                    </button>
                  )}
                </div>

                {/* Booking date range */}
                {info.status === "محجوزة" && (
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground font-body text-xs">من:</span>
                      <input
                        type="date"
                        value={info.startDate}
                        onChange={(e) => updateStatus(car.id, { startDate: e.target.value })}
                        className="bg-secondary border border-border rounded-sm px-2 py-1 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground font-body text-xs">إلى:</span>
                      <input
                        type="date"
                        value={info.endDate}
                        onChange={(e) => updateStatus(car.id, { endDate: e.target.value })}
                        className="bg-secondary border border-border rounded-sm px-2 py-1 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="ملاحظة إضافية..."
                    value={info.note}
                    onChange={(e) => updateStatus(car.id, { note: e.target.value })}
                    className="flex-1 bg-secondary border border-border rounded-sm px-3 py-2 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </main>
    </div>
  );
};

export default Admin;
