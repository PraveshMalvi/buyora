import React from "react";
import { Heart as HeartIcon } from "lucide-react";

interface Props {
  categories: string[];
  category: string;
  setCategory: (c: string) => void;
  minRating: number;
  setMinRating: (r: number) => void;
  sortAsc: boolean;
  setSortAsc: (v: boolean) => void;
  showOnlyFavorites: boolean;
  toggleShowFavorites: () => void;
}

const FilterBar: React.FC<Props> = ({
  categories,
  category,
  setCategory,
  minRating,
  setMinRating,
  sortAsc,
  setSortAsc,
  showOnlyFavorites,
  toggleShowFavorites,
}) => {
  return (
    <div className="sticky top-14 z-20 bg-gray-100 p-2 md:p-6 mb-6 rounded-bl-sm rounded-br-sm shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 items-center">
        {/* Category Filter */}
        <div className="flex flex-col md:gap-2 gap-1">
          <label className="md:text-sm text-xs font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded h-8 px-3 border border-gray-300 md:text-sm text-xs bg-white"
          >
            <option value="All" className="md:text-sm text-xs">
              All
            </option>
            {categories.map((c) => (
              <option className="md:text-sm text-xs" key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Min Rating Filter */}
        <div className="flex flex-col md:gap-2 gap-1">
          <label className="md:text-sm text-xs font-medium text-gray-700">
            Min Rating
          </label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="rounded h-8 px-3 border border-gray-300 md:text-sm text-xs bg-white"
          >
            <option className="md:text-sm text-xs" value={0}>
              All
            </option>
            <option className="md:text-sm text-xs" value={1}>
              1+
            </option>
            <option className="md:text-sm text-xs" value={2}>
              2+
            </option>
            <option className="md:text-sm text-xs" value={3}>
              3+
            </option>
            <option className="md:text-sm text-xs" value={4}>
              4+
            </option>
            <option className="md:text-sm text-xs" value={5}>
              5
            </option>
          </select>
        </div>

        {/* Sort by Price */}
        <div className="flex flex-col md:gap-2 gap-1">
          <label className="md:text-sm text-xs font-medium text-gray-700">
            Sort Price
          </label>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="h-8 px-3 rounded border border-gray-300 bg-white hover:bg-gray-50 md:text-sm text-xs font-medium"
          >
            {sortAsc ? (
              <span className="md:text-sm text-xs">Low → High</span>
            ) : (
              <span className="md:text-sm text-xs">High → Low</span>
            )}
          </button>
        </div>

        {/* Favorites Toggle */}
        <div className="flex flex-col md:gap-2 gap-1">
          <label className="md:text-sm text-xs font-medium text-gray-700">
            Favorites
          </label>
          <button
            onClick={toggleShowFavorites}
            className={`h-8 px-3 rounded border md:text-sm text-xs font-medium transition-colors flex items-center justify-center gap-2 ${
              showOnlyFavorites
                ? "bg-red-100 border-red-500 text-red-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <HeartIcon
              size={16}
              fill={showOnlyFavorites ? "currentColor" : "none"}
            />
            {showOnlyFavorites ? (
              <span className="md:text-sm text-xs">Favorited</span>
            ) : (
              <span className="md:text-sm text-xs">All</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
