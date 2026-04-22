"use client";

interface TopFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function TopFilter({ categories, activeCategory, onSelectCategory }: TopFilterProps) {
  const allCategories = ["Semua Koleksi", ...categories];

  return (
    <div className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar pb-2">
      {allCategories.map((cat) => {
        const isActive = activeCategory === cat || (activeCategory === "" && cat === "Semua Koleksi");
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat === "Semua Koleksi" ? "" : cat)}
            className={`whitespace-nowrap text-[11px] uppercase tracking-[0.2em] transition-all pb-1 border-b-2 ${
              isActive
                ? "border-neutral-900 text-neutral-900 font-semibold"
                : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}