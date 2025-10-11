import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { Book, Category, BooksFilter } from "@/types/firestore.type";

import {
  createBook,
  fetchAllBooks,
  fetchBookById,
  fetchBooksByCategory,
  fetchCategories,
  fetchCategoriesSuper,
  fetchFeaturedBooks,
  searchBooks,
  updateBook,
  deleteBook,
} from "@/store/slices/booksThunks";

// 1. INTERFACE STATE
interface CategoryCache {
  data: Book[];
  timestamp: number;
  expiresAt: number;
}

interface BooksState {
  items: Book[];
  itemsNoFilter: Book[];
  categories: Category[];
  selectedCategory: string | null;
  loading: boolean;
  error: string | null;
  selectedBook: Book | null;
  searchQuery: string;
  featuredBooks: Book[];
  cache: {
    [categoryId: string]: CategoryCache;
  };
  lastFetch: number | null;
  superCategories: Category[];
}

// 2. ÉTAT INITIAL
const initialState: BooksState = {
  items: [],
  itemsNoFilter: [],
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  selectedBook: null,
  searchQuery: "",
  featuredBooks: [],
  cache: {},
  superCategories: [],
  lastFetch: null,
};

// 6. SLICE
const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSelectedBook: (state, action: PayloadAction<Book | null>) => {
      state.selectedBook = action.payload;
    },
    setBooksFromSnapshot: (state, action: PayloadAction<Book[]>) => {
      state.items = action.payload;
      state.itemsNoFilter = action.payload;
      state.lastFetch = Date.now();
      state.loading = false;
      state.error = null;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearBooks: (state) => {
      state.items = [];
    },
    invalidateCache: (state, action: PayloadAction<string>) => {
      delete state.cache[action.payload];
    },
    clearAllCache: (state) => {
      state.cache = {};
    },
  },
  extraReducers: (builder) => {
    // fetchCategories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });

    // fetchCategoriesSuper
    builder
      .addCase(fetchCategoriesSuper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesSuper.fulfilled, (state, action) => {
        state.loading = false;
        state.superCategories = action.payload;
      })
      .addCase(fetchCategoriesSuper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });

    // fetchBooksByCategory
    builder
      .addCase(fetchBooksByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooksByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;

        state.lastFetch = Date.now();
      })
      .addCase(fetchBooksByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });

    // fetchAllBooks
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        // state.items = action.payload;
        // state.lastFetch = Date.now();
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload || "Erreur inconnue";
      });

    // searchBooks
    builder
      .addCase(searchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });

    // fetchBookById
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });

    // createBook
    builder
      .addCase(createBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state) => {
        state.loading = false;
        // Invalider le cache après création
        state.cache = {};
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });

    // updateBook
    builder
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state) => {
        state.loading = false;
        // Invalider le cache après mise à jour
        state.cache = {};
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });

    // deleteBook
    builder
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (book: any) => book.id !== action.payload,
        );
        // Invalider le cache après suppression
        state.cache = {};
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });

    // fetchFeaturedBooks
    builder
      .addCase(fetchFeaturedBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredBooks = action.payload;
      })
      .addCase(fetchFeaturedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });
  },
});

// 7. ACTIONS
export const {
  setSelectedBook,
  setSelectedCategory,
  setBooksFromSnapshot,
  setSearchQuery,
  clearError,
  clearBooks,
  invalidateCache,
  clearAllCache,
} = booksSlice.actions;

// 8. SELECTORS
export const selectAllBooks = (state: RootState) => state.books.items;
export const selectItemsNoFilter = (state: RootState) =>
  state.books.itemsNoFilter;
export const selectBooksLoading = (state: RootState) => state.books.loading;
export const selectBooksError = (state: RootState) => state.books.error;
export const selectSelectedBook = (state: RootState) =>
  state.books.selectedBook;
export const selectCategories = (state: RootState) => state.books.categories;
export const selectCategoriesSuper = (state: RootState) =>
  state.books.superCategories;
export const selectSelectedCategory = (state: RootState) =>
  state.books.selectedCategory;
export const selectSearchQuery = (state: RootState) => state.books.searchQuery;
export const selectFeaturedBooks = (state: RootState) =>
  state.books.featuredBooks;
export const selectCacheStatus = (state: RootState) => state.books.cache;
export const selectLastFetch = (state: RootState) => state.books.lastFetch;

// 9. REDUCER
export default booksSlice.reducer;
