"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/product-card";

type SortKey = "popularity" | "priceLow" | "priceHigh" | "new";

export function ShopFilters({ products }: { products: Product[] }) {
  const [selectedSeats, setSelectedSeats] = useState<number | "all">("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [sortBy, setSortBy] = useState<SortKey>("popularity");

  const filteredProducts = useMemo(() => {
    const nextProducts = products.filter((product) => {
      const seatMatch = selectedSeats === "all" || product.seats === selectedSeats;
      const materialMatch =
        selectedMaterial === "all" ||
        product.fabric.some((fabric) => fabric === selectedMaterial);

      return seatMatch && materialMatch;
    });

    return nextProducts.sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "new") return b.reviews - a.reviews;
      return b.rating * b.reviews - a.rating * a.reviews;
    });
  }, [products, selectedMaterial, selectedSeats, sortBy]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-[2rem] border border-black/5 bg-white p-6 shadow-float">
        <h2 className="text-xl font-semibold text-ink">Filters</h2>

        <div className="mt-6 space-y-6 text-sm">
          <FilterGroup title="Seating Capacity">
            {["all", 1, 2, 3, 5].map((value) => (
              <FilterButton
                key={String(value)}
                active={selectedSeats === value}
                label={value === "all" ? "All" : `${value} Seater`}
                onClick={() => setSelectedSeats(value as number | "all")}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Fabric Type">
            {["all", "Linen", "Velvet", "Chenille", "Leatherette"].map((value) => (
              <FilterButton
                key={value}
                active={selectedMaterial === value}
                label={value === "all" ? "All" : value}
                onClick={() => setSelectedMaterial(value)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Availability">
            <div className="rounded-2xl bg-parchment p-4 leading-6 text-black/70">
              Ready to ship and made-to-order items are both included. Delivery timelines are shown on each card.
            </div>
          </FilterGroup>
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-black/5 bg-white p-5 shadow-float md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-walnut/70">Shopping Experience</p>
            <h2 className="mt-1 text-2xl font-semibold text-ink">
              {filteredProducts.length} Results Found
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-black/40">Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortKey)}
              className="rounded-full border border-black/10 bg-parchment px-5 py-2 text-sm font-semibold text-ink outline-none transition focus:border-walnut/50"
            >
              <option value="popularity">Popularity</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="new">Customer Rating</option>
            </select>
          </div>
        </div>


        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-black/45">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 transition ${
        active
          ? "bg-walnut text-white"
          : "border border-black/10 bg-parchment text-ink hover:border-walnut/40"
      }`}
    >
      {label}
    </button>
  );
}
