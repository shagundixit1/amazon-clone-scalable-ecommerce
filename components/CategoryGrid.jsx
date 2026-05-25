"use client";

import CategoryCard from "./CategoryCard";

export default function CategoryGrid({
  products = [],
  className = "",
}) {

  // GROUP PRODUCTS BY CATEGORY
  const categoriesMap = {};

  products.forEach((p) => {
    const cat = p?.category?.name || "Other";

    if (!categoriesMap[cat]) {
      categoriesMap[cat] = [];
    }

    categoriesMap[cat].push(p);
  });

  // TAKE FIRST 4 CATEGORIES
  const categoryKeys = Object.keys(categoriesMap).slice(0, 4);

  return (
    <div
      className={`
        w-full
        grid
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-6
        px-10
        -mt-[140px]
        relative
        z-10
        ${className}
      `}
    >
      {categoryKeys.map((cat) => (
        <CategoryCard
          key={cat}
          title={cat}
          products={categoriesMap[cat] ? categoriesMap[cat].slice(0, 4) : []}
        />
      ))}
    </div>
  );
}