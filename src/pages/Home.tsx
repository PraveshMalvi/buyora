import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredSorted,
  selectCategories,
  setCategory,
  setMinRating,
  setSortAsc,
  toggleShowFavorites,
} from "../features/products/productsSlice";
import type { RootState } from "../store";

const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />
    <div className="p-3 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-20" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-5 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const Home: React.FC = () => {
  const all = useSelector(selectFilteredSorted) as any[];
  const categories = useSelector((s: RootState) => selectCategories(s));
  const dispatch = useDispatch();

  const PAGE = 12;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const category = useSelector((s: RootState) => s.products.category);
  const minRating = useSelector((s: RootState) => s.products.minRating);
  const sortAsc = useSelector((s: RootState) => s.products.sortAsc);
  const showOnlyFavorites = useSelector(
    (s: RootState) => s.products.showOnlyFavorites
  );

  useEffect(() => {
    setPage(1);
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {}
  }, [category, minRating, sortAsc, showOnlyFavorites]);

  const visible = all.slice(0, PAGE * page);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const node = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading && visible.length < all.length) {
            setLoading(true);
            setTimeout(() => {
              setPage((p) => p + 1);
              setLoading(false);
            }, 300);
          }
        });
      },
      { rootMargin: "200px" }
    );

    if (visible.length < all.length) observer.observe(node);
    return () => observer.disconnect();
  }, [loading, visible.length, all.length]);

  return (
    <main className="pt-20 px-4 min-h-screen">
      <header className="w-full text-center mb-6">
        <h1 className="">Shop</h1>
        <p className="mt-2 text-gray-600">
          Explore products across categories.
        </p>
      </header>

      <section className="max-w-7xl mx-auto">
        <FilterBar
          categories={categories}
          category={category}
          setCategory={(c) => dispatch(setCategory(c))}
          minRating={minRating}
          setMinRating={(r) => dispatch(setMinRating(r))}
          sortAsc={sortAsc}
          setSortAsc={(v) => dispatch(setSortAsc(v))}
          showOnlyFavorites={showOnlyFavorites}
          toggleShowFavorites={() => dispatch(toggleShowFavorites())}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
        </div>

        <div ref={sentinelRef} className="h-6" />

        <div className="mt-6 flex items-center justify-center">
          {visible.length < all.length ? (
            <div className="text-gray-600">
              {loading ? "Loading..." : "Scroll to load more"}
            </div>
          ) : (
            <div className="text-gray-500">No more products</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
