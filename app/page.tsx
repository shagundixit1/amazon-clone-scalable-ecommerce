// import { getProducts } from "../lib/api";

// export default async function Home() {
//   const products = await getProducts();

//   return (
//     <main className="p-10">
//       <h1 className="text-3xl font-bold mb-6">Amazon Clone</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//           >
//             <img
//               src={product.thumbnail || "https://via.placeholder.com/300"}
//               alt={product.title}
//               className="w-full h-40 object-cover mb-4"
//             />

//             <h2 className="font-semibold text-lg">{product.title}</h2>

//             <p className="text-gray-600 text-sm mt-1">
//               {product.category?.name}
//             </p>

//             <p className="text-xl font-bold mt-2">${product.price}</p>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

// import { getProducts } from "../lib/api";
// import ProductCard from "../components/ProductCard";

// export default async function Home() {
//   const products = await getProducts();

//   return (
//     <main className="bg-gray-100 min-h-screen p-6">
//       <h1 className="text-3xl font-bold mb-6">Amazon Clone</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product: any) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </main>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { getProducts } from "../lib/api";
// import ProductCard from "../components/ProductCard";

// export default function Home() {
//   const [products, setProducts] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getProducts();
//       setProducts(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <main className="bg-gray-100 min-h-screen p-6">
//       <h1 className="text-3xl font-bold mb-6">Amazon Clone</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product: any) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </main>
//   );
// }



// import HeroSlider from "../components/HeroSlider";
// import CategoryGrid from "../components/CategoryGrid";
// import ProductSlider from "../components/ProductSlider";
// import { getProducts } from "../lib/api";
// import Footer from "../components/Footer";

// export default async function Home() {

//   const products = await getProducts(); // already data.data

//   // GROUP BY CATEGORY
//   const categoryMap: any = {};

//   products.forEach((p: any) => {
//     const cat = p.category?.name || "Other";

//     if (!categoryMap[cat]) categoryMap[cat] = [];
//     categoryMap[cat].push(p);
//   });

//   // GRID (first 4 categories)
//   const gridData = Object.keys(categoryMap).slice(0, 4).map((cat) => ({
//     title: cat,
//     items: categoryMap[cat].slice(0, 4).map((p: any) => ({
//       name: p.title,
//       image: p.thumbnail,
//     })),
//   }));

//   // SLIDER (first category)
//   const firstCategory = Object.keys(categoryMap)[0];

//   const sliderProducts = categoryMap[firstCategory] || [];

//   // OTHER CATEGORY SLIDERS
//   const otherCategories = Object.keys(categoryMap).slice(1);

//   // UNCATEGORIZED
//   const uncategorizedProducts = categoryMap["Other"] || [];

//   return (
//     <main className="bg-[#eaeded]">

//       <HeroSlider />

//       <CategoryGrid
//         products={products}
//         className="-mt-[180px] relative z-10"
//       />

//       {/* ✅ FIXED: NO MAP */}
//       <ProductSlider
//         title={firstCategory || "Products"}
//         products={sliderProducts}
//       />

//       {/* ✅ FIXED: NO MAP */}
//       {otherCategories.map((cat) => (
//         <ProductSlider
//           key={cat}
//           title={cat}
//           products={categoryMap[cat]}
//         />
//       ))}

//       {/* ✅ FIXED: NO MAP */}
//       {uncategorizedProducts.length > 0 && (
//         <ProductSlider
//           title="More Products"
//           products={uncategorizedProducts}
//         />
//       )}

//       <Footer />

//     </main>
//   );
// }



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