


import HeroSlider from "../components/HeroSlider";
import CategoryGrid from "../components/CategoryGrid";
import ProductSlider from "../components/ProductSlider";
import { getProducts } from "../lib/api";
import Footer from "../components/Footer";

export default async function Home() {

  const products = await getProducts();

  const categoryMap: any = {};

  products.forEach((p: any) => {
    const cat = p.category?.name || "Other";

    if (!categoryMap[cat]) categoryMap[cat] = [];
    categoryMap[cat].push(p);
  });

  const gridData = Object.keys(categoryMap).slice(0, 4).map((cat) => ({
    title: cat,
    items: categoryMap[cat].slice(0, 4).map((p: any) => ({
      name: p.title,
      image: p.thumbnail,
    })),
  }));

  const firstCategory = Object.keys(categoryMap)[0];
  const sliderProducts = categoryMap[firstCategory] || [];
  const otherCategories = Object.keys(categoryMap).slice(1);
  const uncategorizedProducts = categoryMap["Other"] || [];

  return (
    <main className="bg-[#eaeded]">

      {/* HERO SECTION */}
      <div className="relative">

        {/* SLIDER */}
        <HeroSlider />

        {/* FADE EFFECT (IMPORTANT) */}
        <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-[#eaeded] to-transparent" />

      </div>

      {/* CATEGORY GRID OVERLAP */}
      <div className="relative z-10 -mt-[260px] px-6">

        <CategoryGrid
          products={products}
        />

      </div>

      {/* MAIN CONTENT */}
      <div className="px-6 space-y-6 mt-6">

        <ProductSlider
          title={firstCategory || "Products"}
          products={sliderProducts}
        />

        {otherCategories.map((cat) => (
          <ProductSlider
            key={cat}
            title={cat}
            products={categoryMap[cat]}
          />
        ))}

        {uncategorizedProducts.length > 0 && (
          <ProductSlider
            title="More Products"
            products={uncategorizedProducts}
          />
        )}

      </div>

      <Footer />

    </main>
  );
}