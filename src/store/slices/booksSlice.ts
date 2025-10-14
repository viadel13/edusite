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
  items: Array<{
    books: Book[];
    booksByIdCategorie: Book[];
    searchBooks: Book[];
    categories: Category[];
    superCategories: Category[];
    bookById: Book[];
    featuredBooks: Book[];
    loadingBooks: boolean;
    loadingBooksByIdCategorie: boolean;
    loadingSearchBooks: boolean;
    loadingCategories: boolean;
    loadingSuperCategories: boolean;
    loadingBookById: boolean;
    loadingFeaturedBooks: boolean;
    errorBookById: string | null;
    errorBooks: string | null;
    errorBooksByIdCategorie: string | null;
    errorSearchBooks: string | null;
    errorCategories: string | null;
    errorFeaturedBooks: string | null;
    errorSuperCategories: string | null;
  }>;
  itemsCRUD: Array<{
    loaderCreateBook: boolean;
    loaderUpdateBook: boolean;
    loaderDeleteBook: boolean;
    errorUpdateBook: string | null;
    errorCreateBook: string | null;
    errorDeleteBook: string | null;
  }>;

  selectedCategory: string | null;
  loading: boolean;
  selectedBook: Book | null;
  searchQuery: string;
  lastFetch: number | null;
}

// 2. ÉTAT INITIAL
const initialState: BooksState = {
  items: [
    {
      books: [],
      booksByIdCategorie: [],
      searchBooks: [],
      categories: [],
      superCategories: [],
      bookById: [],
      featuredBooks: [],
      loadingBooksByIdCategorie: false,
      loadingBooks: false,
      loadingSearchBooks: false,
      loadingCategories: false,
      loadingSuperCategories: false,
      loadingBookById: false,
      loadingFeaturedBooks: false,
      errorBooks: null,
      errorSearchBooks: null,
      errorCategories: null,
      errorSuperCategories: null,
      errorBookById: null,
      errorFeaturedBooks: null,
      errorBooksByIdCategorie: null,
    },
  ],

  itemsCRUD: [
    {
      loaderCreateBook: false,
      errorCreateBook: null,
      loaderUpdateBook: false,
      errorUpdateBook: null,
      loaderDeleteBook: false,
      errorDeleteBook: null,
    },
  ],

  selectedCategory: null,
  loading: false,
  selectedBook: null,
  searchQuery: "",
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
      state.items.forEach((item) => {
        item.books = action.payload;
        item.loadingBooks = false;
        item.errorBooks = null;
      });
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.items.forEach((item) => {
        item.errorBooks = null;
        item.errorBooksByIdCategorie = null;
      });
    },
    clearBooks: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    // fetchCategories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.items.forEach((item) => {
          item.loadingCategories = true;
          item.errorCategories = null;
        });
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items.forEach((item) => {
          item.loadingCategories = false;
          item.categories = action.payload;
        });
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.items.forEach((item) => {
          item.loadingCategories = false;
          item.errorCategories = action.payload || "Erreur inconnue";
        });
      });

    // fetchCategoriesSuper
    builder
      .addCase(fetchCategoriesSuper.pending, (state) => {
        state.items.forEach((item) => {
          item.loadingSuperCategories = true;
          item.errorSuperCategories = null;
        });
      })
      .addCase(fetchCategoriesSuper.fulfilled, (state, action) => {
        state.items.forEach((item) => {
          item.loadingSuperCategories = false;
          item.superCategories = action.payload;
        });
      })
      .addCase(fetchCategoriesSuper.rejected, (state, action) => {
        state.items.forEach((item) => {
          item.loadingSuperCategories = false;
          item.errorSuperCategories = action.payload || "Erreur inconnue";
        });
      });

    // fetchBooksByCategory
    builder
      .addCase(fetchBooksByCategory.pending, (state) => {
        state.items.forEach((item) => {
          item.loadingBooksByIdCategorie = true;
          item.errorBooksByIdCategorie = null;
        });
      })
      .addCase(fetchBooksByCategory.fulfilled, (state, action) => {
        state.items.forEach((item) => {
          item.loadingBooksByIdCategorie = false;
          item.booksByIdCategorie = action.payload;
        });

        state.lastFetch = Date.now();
      })
      .addCase(fetchBooksByCategory.rejected, (state, action) => {
        state.items.forEach((item) => {
          item.loadingBooksByIdCategorie = false;
          item.errorBooksByIdCategorie = action.payload || "Erreur inconnue";
        });
      });

    // fetchAllBooks
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.items.forEach((item) => {
          item.loadingBooks = true;
          item.errorBooks = null;
        });
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.items.forEach((item) => {
          item.loadingBooks = false;
        });
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.items.forEach((item) => {
          item.loadingBooks = false;
          item.errorBooks = action.payload || "Erreur inconnue";
        });
      });

    // searchBooks
    builder
      .addCase(searchBooks.pending, (state) => {
        state.items.forEach((item) => {
          item.loadingSearchBooks = true;
          item.errorSearchBooks = null;
        });
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.items.forEach((item) => {
          item.loadingSearchBooks = false;
          item.searchBooks = action.payload;
        });
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.items.forEach((item) => {
          item.loadingSearchBooks = false;
          item.errorSearchBooks = action.payload || "Erreur inconnue";
        });
      });

    // fetchBookById
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.items.forEach((item) => {
          item.loadingBookById = true;
          item.errorBookById = null;
        });
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.items.forEach((item) => {
          item.loadingBookById = false;
          item.bookById = [action.payload];
        });
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.items.forEach((item) => {
          item.loadingBookById = false;
          item.errorBookById = action.payload || "Erreur inconnue";
        });
      });

    // fetchFeaturedBooks
    builder
      .addCase(fetchFeaturedBooks.pending, (state) => {
        state.items.forEach((item) => {
          item.loadingFeaturedBooks = true;
          item.errorFeaturedBooks = null;
        });
      })
      .addCase(fetchFeaturedBooks.fulfilled, (state, action) => {
        state.items.forEach((item) => {
          item.loadingFeaturedBooks = false;
          item.featuredBooks = action.payload;
        });
      })
      .addCase(fetchFeaturedBooks.rejected, (state, action) => {
        state.items.forEach((item) => {
          item.loadingFeaturedBooks = false;
          item.errorFeaturedBooks = action.payload || "Erreur inconnue";
        });
      });

    // createBook
    builder
      .addCase(createBook.pending, (state) => {
        state.itemsCRUD.forEach((item) => {
          item.loaderCreateBook = true;
          item.errorCreateBook = null;
        });
      })
      .addCase(createBook.fulfilled, (state) => {
        state.itemsCRUD.forEach((item) => {
          item.loaderCreateBook = false;
        });
      })
      .addCase(createBook.rejected, (state, action) => {
        state.itemsCRUD.forEach((item) => {
          item.loaderCreateBook = false;
          item.errorCreateBook = action.payload || "Erreur inconnue";
        });
      });

    // updateBook
    builder
      .addCase(updateBook.pending, (state) => {
        state.itemsCRUD.forEach((item) => {
          item.loaderUpdateBook = true;
          item.errorUpdateBook = null;
        });
      })
      .addCase(updateBook.fulfilled, (state) => {
        state.itemsCRUD.forEach((item) => {
          item.loaderUpdateBook = false;
        });
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.itemsCRUD.forEach((item) => {
          item.loaderUpdateBook = false;
          item.errorUpdateBook = action.payload || "Erreur inconnue";
        });
      });

    // deleteBook
    builder
      .addCase(deleteBook.pending, (state) => {
        state.itemsCRUD.forEach((item) => {
          item.loaderDeleteBook = true;
          item.errorDeleteBook = null;
        });
      })
      .addCase(deleteBook.fulfilled, (state) => {
        state.itemsCRUD.forEach((item) => {
          item.loaderDeleteBook = false;
        });
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.itemsCRUD.forEach((item) => {
          item.loaderDeleteBook = false;
          item.errorDeleteBook = action.payload || "Erreur inconnue";
        });
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
} = booksSlice.actions;

// 8. SELECTORS
export const selectAllBooks = (state: RootState) => state.books.items[0].books;
export const selectBooksByIdCategorie = (state: RootState) =>
  state.books.items[0].booksByIdCategorie;
export const selectCategoriesSuper = (state: RootState) =>
  state.books.items[0].superCategories;

export const selectBooksLoading = (state: RootState) =>
  state.books.items[0].loadingBooks;
export const selectBooksloadingCatetogerie = (state: RootState) =>
  state.books.items[0].loadingCategories;
export const selectBooksloadingSuperCategories = (state: RootState) =>
  state.books.items[0].loadingSuperCategories;
export const selectloadingBooksByIdCategorie = (state: RootState) =>
  state.books.items[0].loadingBooksByIdCategorie;
export const selectSelectedCategory = (state: RootState) =>
  state.books.selectedCategory;

export const selectBooksError = (state: RootState) =>
  state.books.items[0].errorBooks;

export const selectErrorBooksByIdCategorie = (state: RootState) =>
  state.books.items[0].errorBooksByIdCategorie;

// 9. REDUCER
export default booksSlice.reducer;
