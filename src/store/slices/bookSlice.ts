// src/lib/features/books/booksSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

// 1. TYPES
interface Book {
  id: string;
  title: string;
  author: string[];
  coverUrl: string;
  publishYear: number;
  isbn?: string;
  subjects?: string[]; // Catégories/sujets du livre
}

interface BooksState {
  items: Book[];
  categories: string[];
  selectedCategory: string | null;
  loading: boolean;
  error: string | null;
  selectedBook: Book | null;
  searchQuery: string;
}

// 2. ÉTAT INITIAL
const initialState: BooksState = {
  items: [],
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  selectedBook: null,
  searchQuery: "",
};

// 3. THUNKS ASYNCHRONES

// Rechercher des livres par mot-clé
export const searchBooks = createAsyncThunk<
  Book[],
  string, // Query de recherche
  { rejectValue: string }
>("books/searchBooks", async (query, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`,
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la recherche");
    }

    const data = await response.json();

    // Transformer les données de l'API
    const books: Book[] = data.docs.map((doc: any) => ({
      id: doc.key,
      title: doc.title || "Titre inconnu",
      author: doc.author_name || ["Auteur inconnu"],
      coverUrl: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : "https://via.placeholder.com/150x200?text=No+Cover",
      publishYear: doc.first_publish_year || 0,
      isbn: doc.isbn?.[0],
      subjects: doc.subject?.slice(0, 5) || [],
    }));

    return books;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Erreur de recherche",
    );
  }
});

// Récupérer des livres par catégorie/sujet
export const fetchBooksByCategory = createAsyncThunk<
  Book[],
  string, // Nom de la catégorie
  { rejectValue: string }
>("books/fetchBooksByCategory", async (category, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/subjects/${encodeURIComponent(category.toLowerCase())}.json?limit=20`,
    );

    if (!response.ok) {
      throw new Error("Catégorie introuvable");
    }

    const data = await response.json();

    const books: Book[] = data.works.map((work: any) => ({
      id: work.key,
      title: work.title || "Titre inconnu",
      author: work.authors?.map((a: any) => a.name) || ["Auteur inconnu"],
      coverUrl: work.cover_id
        ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
        : "https://via.placeholder.com/150x200?text=No+Cover",
      publishYear: work.first_publish_year || 0,
      subjects: work.subject?.slice(0, 5) || [],
    }));

    return books;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Erreur lors de la récupération",
    );
  }
});

// Récupérer les détails d'un livre spécifique
export const fetchBookDetails = createAsyncThunk<
  Book,
  string, // ID du livre (key)
  { rejectValue: string }
>("books/fetchBookDetails", async (bookKey, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://openlibrary.org${bookKey}.json`);

    if (!response.ok) {
      throw new Error("Livre introuvable");
    }

    const data = await response.json();

    // Récupérer les informations des auteurs
    const authorNames = await Promise.all(
      (data.authors || []).map(async (author: any) => {
        try {
          const authorRes = await fetch(
            `https://openlibrary.org${author.author.key}.json`,
          );
          const authorData = await authorRes.json();
          return authorData.name;
        } catch {
          return "Auteur inconnu";
        }
      }),
    );

    const book: Book = {
      id: data.key,
      title: data.title || "Titre inconnu",
      author: authorNames.length > 0 ? authorNames : ["Auteur inconnu"],
      coverUrl: data.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
        : "https://via.placeholder.com/150x200?text=No+Cover",
      publishYear: data.first_publish_date
        ? parseInt(data.first_publish_date)
        : 0,
      subjects: data.subjects?.slice(0, 10) || [],
    };

    return book;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Erreur lors de la récupération",
    );
  }
});

// Récupérer les catégories populaires
export const fetchPopularCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("books/fetchPopularCategories", async (_, { rejectWithValue }) => {
  try {
    // Liste de catégories populaires prédéfinies
    const popularCategories = [
      "fiction",
      "science_fiction",
      "fantasy",
      "mystery",
      "romance",
      "thriller",
      "biography",
      "history",
      "science",
      "philosophy",
      "poetry",
      "children",
      "young_adult",
      "horror",
      "adventure",
    ];

    return popularCategories;
  } catch (error) {
    return rejectWithValue("Erreur lors du chargement des catégories");
  }
});

// 4. CRÉER LE SLICE
const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // Actions synchrones
    setSelectedBook: (state, action: PayloadAction<Book | null>) => {
      state.selectedBook = action.payload;
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
  },
  extraReducers: (builder) => {
    // Gestion de searchBooks
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

    // Gestion de fetchBooksByCategory
    builder
      .addCase(fetchBooksByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooksByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooksByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });

    // Gestion de fetchBookDetails
    builder
      .addCase(fetchBookDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });

    // Gestion de fetchPopularCategories
    builder
      .addCase(fetchPopularCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchPopularCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });
  },
});

// 5. EXPORTER LES ACTIONS
export const {
  setSelectedBook,
  setSelectedCategory,
  setSearchQuery,
  clearError,
  clearBooks,
} = booksSlice.actions;

// 6. SELECTORS
export const selectAllBooks = (state: RootState) => state.books.items;
export const selectBooksLoading = (state: RootState) => state.books.loading;
export const selectBooksError = (state: RootState) => state.books.error;
export const selectSelectedBook = (state: RootState) =>
  state.books.selectedBook;
export const selectCategories = (state: RootState) => state.books.categories;
export const selectSelectedCategory = (state: RootState) =>
  state.books.selectedCategory;
export const selectSearchQuery = (state: RootState) => state.books.searchQuery;

// Selector avec filtre
export const selectBooksByCategory = (category: string) => (state: RootState) =>
  state.books.items.filter((book) =>
    book.subjects?.some((subject) =>
      subject.toLowerCase().includes(category.toLowerCase()),
    ),
  );

// 7. EXPORTER LE REDUCER
export default booksSlice.reducer;
