// 5. THUNKS ASYNCHRONES

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Book, Category } from "@/types/firestore.type";
import {
  createBook as createBookFirestore,
  deleteBook as deleteBookFirestore,
  getAllBooks,
  getAllCategories,
  getAllCategoriesSuper,
  getBookById,
  getBooksByCategory,
  getFeaturedBooks as getFeaturedBooksFirestore,
  searchBooks as searchBooksFirestore,
  updateBook as updateBookFirestore,
} from "@/lib/firebase/firestore";
import type { RootState } from "@/store/store";

/**
 * Récupérer toutes les catégories
 */
export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("books/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const categories = await getAllCategories();
    return categories;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Erreur récupération catégories",
    );
  }
});

/**
 * Récupérer toutes les super catégories
 */

export const fetchCategoriesSuper = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("books/fetchCategoriesSuper", async (_, { rejectWithValue }) => {
  try {
    const categories = await getAllCategoriesSuper();
    return categories;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Erreur récupération catégories",
    );
  }
});

/**
 * Récupérer les livres par catégorie (avec cache)
 */
export const fetchBooksByCategory = createAsyncThunk<
  Book[],
  string,
  { rejectValue: string; state: RootState }
>(
  "books/fetchBooksByCategory",
  async (categoryId, { rejectWithValue, getState }) => {
    try {
      const books = await getBooksByCategory(categoryId);
      return books;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Erreur récupération livres",
      );
    }
  },
);

/**
 * Récupérer tous les livres
 */
export const fetchAllBooks = createAsyncThunk<
  Book[],
  void,
  { rejectValue: string }
>("books/fetchAllBooks", async (_, { rejectWithValue }) => {
  try {
    const books = await getAllBooks({ limit: 50, page: 1 });
    return books;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Erreur récupération livres",
    );
  }
});

/**
 * Rechercher des livres
 */
export const searchBooks = createAsyncThunk<
  Book[],
  string,
  { rejectValue: string }
>("books/searchBooks", async (query, { rejectWithValue }) => {
  try {
    const books = await searchBooksFirestore(query);
    return books;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Erreur recherche",
    );
  }
});

/**
 * Récupérer un livre par ID
 */
export const fetchBookById = createAsyncThunk<
  Book,
  string,
  { rejectValue: string }
>("books/fetchBookById", async (bookId, { rejectWithValue }) => {
  try {
    const book = await getBookById(bookId);
    if (!book) {
      throw new Error("Livre introuvable");
    }
    return book;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Erreur récupération livre",
    );
  }
});

/**
 * Créer un nouveau livre
 */
export const createBook = createAsyncThunk<
  string,
  Omit<Book, "id" | "createdAt" | "updatedAt">,
  { rejectValue: string }
>("books/createBook", async (bookData, { rejectWithValue }) => {
  try {
    const bookId = await createBookFirestore(bookData);
    return bookId;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Erreur création livre",
    );
  }
});

/**
 * Mettre à jour un livre
 */
export const updateBook = createAsyncThunk<
  void,
  { bookId: string; updates: Partial<Book> },
  { rejectValue: string }
>("books/updateBook", async ({ bookId, updates }, { rejectWithValue }) => {
  try {
    await updateBookFirestore(bookId, updates);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Erreur mise à jour livre",
    );
  }
});

/**
 * Supprimer un livre
 */
export const deleteBook = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("books/deleteBook", async (bookId, { rejectWithValue }) => {
  try {
    await deleteBookFirestore(bookId);
    return bookId;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Erreur suppression livre",
    );
  }
});

/**
 * Récupérer les livres en vedette
 */
export const fetchFeaturedBooks = createAsyncThunk<
  Book[],
  number | undefined,
  { rejectValue: string }
>("books/fetchFeaturedBooks", async (limit = 10, { rejectWithValue }) => {
  try {
    const books = await getFeaturedBooksFirestore(limit);
    return books;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Erreur récupération livres vedette",
    );
  }
});
