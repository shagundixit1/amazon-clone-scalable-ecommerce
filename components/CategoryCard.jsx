"use client";

import { useRouter } from "next/navigation";

export default function CategoryCard({ title, products = [] }) {
  const router = useRouter();

  return (
    <div className="bg-white h-[440px] flex flex-col">

      <h2 className="text-[21px] font-bold px-5 pt-5 mb-3">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-5 flex-1">
        {products.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer"
            onClick={() => router.push(`/product/${item.id}`)}
          >
            <img
              src={
                item?.images?.[0]?.imageUrl ||
                item?.thumbnail ||
                "/placeholder.png"
              }
              className="w-full h-[120px] object-cover"
            />

            <p className="text-[12px] mt-1 text-gray-800 line-clamp-1">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="px-5 pb-4 mt-auto">
        <span className="text-[#007185] text-[13px] cursor-pointer hover:underline">
          See more
        </span>
      </div>

    </div>
  );
}