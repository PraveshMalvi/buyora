import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsData from "../../assets/products.json";

export type Product = {
  id: number;
  image: string;
  product_name: string;
  category: string;
  price: number;
  rating: number;
};

type ProductsState = {
  all: Product[];
  favorites: number[];
  category: string;
  minRating: number;
  sortAsc: boolean;
  showOnlyFavorites: boolean;
};

const FAVORITES_KEY = "buyora:favorites";

const loadFavorites = (): number[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
};

const saveFavorites = (list: number[]) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
};

const initialState: ProductsState = {
  all: productsData as unknown as Product[],
  favorites: loadFavorites(),
  category: "All",
  minRating: 0,
  sortAsc: true,
  showOnlyFavorites: false,
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      const idx = state.favorites.indexOf(id);
      if (idx === -1) state.favorites.push(id);
      else state.favorites.splice(idx, 1);
      saveFavorites(state.favorites);
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setMinRating(state, action: PayloadAction<number>) {
      state.minRating = action.payload;
    },
    setSortAsc(state, action: PayloadAction<boolean>) {
      state.sortAsc = action.payload;
    },
    toggleShowFavorites(state) {
      state.showOnlyFavorites = !state.showOnlyFavorites;
    },
  },
});

export const {
  toggleFavorite,
  setCategory,
  setMinRating,
  setSortAsc,
  toggleShowFavorites,
} = slice.actions;

export default slice.reducer;

// selectors
export const selectAllProducts = (state: { products: ProductsState }) =>
  state.products.all;

export const selectCategories = (state: { products: ProductsState }) =>
  Array.from(new Set(state.products.all.map((p) => p.category)));

export const selectFilteredSorted = (state: { products: ProductsState }) => {
  const { all, category, minRating, sortAsc, favorites, showOnlyFavorites } =
    state.products;
  let list = all.filter((p) => p.rating >= minRating);
  if (category && category !== "All")
    list = list.filter((p) => p.category === category);
  if (showOnlyFavorites) list = list.filter((p) => favorites.includes(p.id));
  list = list.slice();
  list.sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));
  return list.map((p) => ({ ...p, is_favourite: favorites.includes(p.id) }));
};
