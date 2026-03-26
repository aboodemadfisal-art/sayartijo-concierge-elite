import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Save, Trash2, Edit3, Image, ChevronDown, ChevronUp } from "lucide-react";
import type { Car, FuelType } from "@/data/cars";
import { addCar, updateCarEdits, deleteCar, isCustomCar, generateCarId } from "@/lib/carStore";

const CATEGORIES = ["Prestige Sedans", "Luxury SUVs", "Supercars", "Wedding Cars"];
const FUEL_TYPES: FuelType[] = ["gasoline", "electric", "hybrid"];
const OCCASIONS = ["اعراس", "رجال اعمال", "استخدام شخصي"];

interface CarFormData {
  name: string;
  brand: string;
  image: string;
  engine: string;
  acceleration: string;
  topSpeed: string;
  seats: number;
  features: string;
  category: string;
  fuelType: FuelType;
  occasion: string[];
}

const emptyForm: CarFormData = {
  name: "",
  brand: "",
  image: "",
  engine: "",
  acceleration: "",
  topSpeed: "",
  seats: 5,
  features: "",
  category: CATEGORIES[0],
  fuelType: "gasoline",
  occasion: [],
};

function carToForm(car: Car): CarFormData {
  return {
    name: car.name,
    brand: car.brand,
    image: car.image,
    engine: car.engine,
    acceleration: car.acceleration,
    topSpeed: car.topSpeed,
    seats: car.seats,
    features: car.features.join(", "),
    category: car.category,
    fuelType: car.fuelType,
    occasion: car.occasion || [],
  };
}

interface AdminCarEditorProps {
  cars: Car[];
  onUpdate: () => void;
}

const AdminCarEditor = ({ cars, onUpdate }: AdminCarEditorProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [form, setForm] = useState<CarFormData>(emptyForm);
  const [expandedCar, setExpandedCar] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setForm({ ...form, image: result });
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name || !form.brand) return;

    const features = form.features.split(",").map((f) => f.trim()).filter(Boolean);

    if (editingCarId) {
      updateCarEdits(editingCarId, {
        name: form.name,
        brand: form.brand,
        image: form.image,
        engine: form.engine,
        acceleration: form.acceleration,
        topSpeed: form.topSpeed,
        seats: form.seats,
        features,
        category: form.category,
        fuelType: form.fuelType,
        occasion: form.occasion,
      });
    } else {
      const newCar: Car = {
        id: generateCarId(),
        name: form.name,
        brand: form.brand,
        image: form.image,
        pricePerDay: 0,
        category: form.category,
        engine: form.engine,
        acceleration: form.acceleration,
        topSpeed: form.topSpeed,
        seats: form.seats,
        features,
        vendor: "Sayarti Jo",
        vendorVerified: true,
        available: true,
        occasion: form.occasion,
        fuelType: form.fuelType,
      };
      addCar(newCar);
    }

    setShowForm(false);
    setEditingCarId(null);
    setForm(emptyForm);
    setImagePreview("");
    onUpdate();
  };

  const handleEdit = (car: Car) => {
    setEditingCarId(car.id);
    setForm(carToForm(car));
    setImagePreview(car.image);
    setShowForm(true);
  };

  const handleDelete = (carId: string) => {
    if (confirm("هل أنت متأكد من حذف هذه السيارة؟")) {
      deleteCar(carId);
      onUpdate();
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCarId(null);
    setForm(emptyForm);
    setImagePreview("");
  };

  const toggleOccasion = (occ: string) => {
    setForm((prev) => ({
      ...prev,
      occasion: prev.occasion.includes(occ)
        ? prev.occasion.filter((o) => o !== occ)
        : [...prev.occasion, occ],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-foreground">إدارة السيارات</h2>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditingCarId(null); setForm(emptyForm); setImagePreview(""); }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-body text-xs tracking-wider rounded-sm hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            إضافة سيارة
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card border border-border rounded-sm p-5 space-y-4 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base text-foreground">
                {editingCarId ? "تعديل سيارة" : "إضافة سيارة جديدة"}
              </h3>
              <button onClick={handleCancel} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-muted-foreground font-body text-xs mb-1 block">الماركة *</label>
                <input
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  placeholder="مثال: BMW"
                  className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-muted-foreground font-body text-xs mb-1 block">اسم السيارة *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="مثال: 530i"
                  className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-muted-foreground font-body text-xs mb-1 block">المحرك</label>
                <input
                  value={form.engine}
                  onChange={(e) => setForm({ ...form, engine: e.target.value })}
                  placeholder="مثال: 3.0L I6 Turbo"
                  className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-muted-foreground font-body text-xs mb-1 block">التسارع</label>
                <input
                  value={form.acceleration}
                  onChange={(e) => setForm({ ...form, acceleration: e.target.value })}
                  placeholder="مثال: 5.2s"
                  className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-muted-foreground font-body text-xs mb-1 block">السرعة القصوى</label>
                <input
                  value={form.topSpeed}
                  onChange={(e) => setForm({ ...form, topSpeed: e.target.value })}
                  placeholder="مثال: 250 km/h"
                  className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-muted-foreground font-body text-xs mb-1 block">عدد المقاعد</label>
                <input
                  type="number"
                  value={form.seats}
                  onChange={(e) => setForm({ ...form, seats: parseInt(e.target.value) || 0 })}
                  className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-muted-foreground font-body text-xs mb-1 block">الفئة</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-muted-foreground font-body text-xs mb-1 block">نوع الوقود</label>
                <select
                  value={form.fuelType}
                  onChange={(e) => setForm({ ...form, fuelType: e.target.value as FuelType })}
                  className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="gasoline">بنزين</option>
                  <option value="electric">كهربائي</option>
                  <option value="hybrid">هجين</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-muted-foreground font-body text-xs mb-1 block">المميزات (مفصولة بفاصلة)</label>
              <input
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                placeholder="مثال: M Sport, Leather, Navigation"
                className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-muted-foreground font-body text-xs mb-1 block">المناسبات</label>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => toggleOccasion(occ)}
                    className={`px-3 py-1.5 rounded-sm font-body text-xs border transition-colors ${
                      form.occasion.includes(occ)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Image upload */}
            <div>
              <label className="text-muted-foreground font-body text-xs mb-1 block">صورة السيارة</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-sm cursor-pointer hover:border-primary/50 transition-colors">
                  <Image className="h-4 w-4 text-muted-foreground" />
                  <span className="font-body text-xs text-muted-foreground">اختر صورة</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="h-16 w-24 object-cover rounded-sm border border-border" />
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSave}
                disabled={!form.name || !form.brand}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-body text-xs tracking-wider rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {editingCarId ? "حفظ التعديلات" : "إضافة السيارة"}
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 border border-border text-muted-foreground font-body text-xs tracking-wider rounded-sm hover:border-primary/50 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Car list with edit buttons */}
      {cars.map((car) => (
        <div
          key={car.id}
          className="bg-card border border-border rounded-sm overflow-hidden"
        >
          <div
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-secondary/50 transition-colors"
            onClick={() => setExpandedCar(expandedCar === car.id ? null : car.id)}
          >
            <img src={car.image} alt={car.name} className="w-16 h-12 object-cover rounded-sm" />
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm text-foreground truncate">{car.brand} {car.name}</p>
              <p className="text-muted-foreground font-body text-xs">{car.category}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); handleEdit(car); }}
                className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                title="تعديل"
              >
                <Edit3 className="h-4 w-4" />
              </button>
              {isCustomCar(car.id) && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(car.id); }}
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  title="حذف"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              {expandedCar === car.id ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          <AnimatePresence>
            {expandedCar === car.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden border-t border-border"
              >
                <div className="p-3 grid grid-cols-2 gap-2 text-xs font-body">
                  <div><span className="text-muted-foreground">المحرك:</span> <span className="text-foreground">{car.engine}</span></div>
                  <div><span className="text-muted-foreground">التسارع:</span> <span className="text-foreground">{car.acceleration}</span></div>
                  <div><span className="text-muted-foreground">السرعة:</span> <span className="text-foreground">{car.topSpeed}</span></div>
                  <div><span className="text-muted-foreground">المقاعد:</span> <span className="text-foreground">{car.seats}</span></div>
                  <div className="col-span-2"><span className="text-muted-foreground">الوقود:</span> <span className="text-foreground">{car.fuelType}</span></div>
                  <div className="col-span-2"><span className="text-muted-foreground">المميزات:</span> <span className="text-foreground">{car.features.join(", ")}</span></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default AdminCarEditor;
