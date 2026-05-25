

import { getProductById } from "../../../lib/api";
import ProductClient from "../../../components/ProductClient";
import ProductImages from "../../../components/ProductImages.jsx";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="p-10 text-center">
        Product not found or loading...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      <div className="w-full px-6 py-6">

        <div className="flex gap-6 items-start">

          {/* LEFT IMAGE */}
          <div className="w-[35%]">
            <div className="sticky top-6">

              {/* NEW COMPONENT */}
              <ProductImages product={product} />

            </div>
          </div>

          {/* CENTER */}
          <div className="flex-1 pr-6">

            <h1 className="text-2xl font-medium leading-snug">
              {product.title}
            </h1>

            <p className="text-sm text-blue-600 mt-1 hover:underline cursor-pointer">
              Visit the {product.brand || "Generic"} Store
            </p>

            <div className="border-b my-4"></div>

            <p className="text-3xl text-red-600 font-semibold">
              ₹{product.price}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Inclusive of all taxes
            </p>

            <div className="border-b my-4"></div>

            <h2 className="font-semibold text-lg mb-2">
              About this item
            </h2>

            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description || "No description available"}
            </p>

          </div>

          {/* RIGHT BUY BOX */}
          <div className="w-[300px]">
            <div className="sticky top-6 border rounded-lg p-4 shadow-sm">
              <ProductClient product={product} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}