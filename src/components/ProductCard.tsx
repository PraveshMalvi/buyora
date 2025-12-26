import React, { useState } from "react";

type Product = {
  id: number;
  image: string;
  product_name: string;
  category: string;
  price: number;
  rating: number;
  is_favourite: boolean;
};

const Shimmer: React.FC = () => (
  <div className="w-full h-48 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
);

const Star: React.FC<{ filled?: boolean }> = ({ filled = false }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    viewBox="0 0 20 20"
    fill={filled ? "currentColor" : "none"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 15.9 4.82 17.44l.99-5.77L1.62 7.59l5.79-.84L10 1.5z"
      stroke="currentColor"
      strokeWidth="0.4"
    />
  </svg>
);

const Heart: React.FC<{ filled?: boolean }> = ({ filled = false }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-red-500" : "text-gray-300"}`}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.01 3.99 4 6.5 4 8.24 4 9.91 4.99 11 6.09 12.09 4.99 13.76 4 15.5 4 18.01 4 20 6.01 20 8.5c0 3.78-3.4 6.86-8.55 11.53L12 21.35z"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinejoin="round"
    />
  </svg>
);

import { useDispatch } from "react-redux";
import { toggleFavorite } from "../features/products/productsSlice";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const onToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(product.id));
  };

  return (
    <article className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        {!loaded && <Shimmer />}
        <img
          src={product.image}
          alt={product.product_name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-48 object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0 absolute"
          }`}
        />
        <div className="absolute top-2 right-2 bg-white/50 rounded-full p-1">
          <button
            onClick={onToggle}
            aria-label="Toggle favorite"
            className="p-1 rounded-full"
          >
            <Heart filled={(product as any).is_favourite} />
          </button>
        </div>
      </div>
      <div className="p-3 bg-white">
        <p className="text-xs bg-amber-200 rounded-full px-2 py-0.5 w-fit">
          {product.category}
        </p>
        <p className="mt-1 text-sm font-semibold text-gray-800 truncate">
          {product.product_name}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} filled={idx < Math.round(product.rating)} />
            ))}
            <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
          </div>
          <div className="text-lg font-bold text-indigo-600">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(product.price)}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
