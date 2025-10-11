// src/lib/firebase/firestore.ts
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  DocumentSnapshot,
  QueryConstraint,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./config";
import {
  Book,
  Category,
  BooksByCategory,
  BooksFilter,
  PaginationOptions,
} from "@/types/firestore.type";

// ============================================
// CATEGORIES
// ============================================

/**
 * Récupérer toutes les catégories
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef, orderBy("name", "asc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Category,
    );
  } catch (error) {
    console.error("Erreur récupération catégories:", error);
    throw error;
  }
}

/**
 * Récupérer toutes super catégories
 */

export async function getAllCategoriesSuper(): Promise<Category[]> {
  try {
    const categoriesRef = collection(db, "categories");

    const q = query(
      categoriesRef,
      where("super", "==", true),
      orderBy("name", "asc"), // Trier les résultats par nom
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Category,
    );
  } catch (error) {
    console.error("Erreur récupération catégories:", error);
    throw error;
  }
}

/**
 * Récupérer une catégorie par ID
 */
export async function getCategoryById(
  categoryId: string,
): Promise<Category | null> {
  try {
    const docRef = doc(db, "categories", categoryId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Category;
  } catch (error) {
    console.error("Erreur récupération catégorie:", error);
    throw error;
  }
}

/**
 * Créer une nouvelle catégorie
 */
export async function createCategory(
  category: Omit<Category, "id" | "createdAt">,
): Promise<string> {
  try {
    const categoriesRef = collection(db, "categories");
    const newDocRef = doc(categoriesRef);

    await setDoc(newDocRef, {
      ...category,
      createdAt: Timestamp.now(),
      booksCount: 0,
    });

    return newDocRef.id;
  } catch (error) {
    console.error("Erreur création catégorie:", error);
    throw error;
  }
}

// ============================================
// BOOKS
// ============================================

/**
 * Récupérer tous les livres
 */
// export async function getAllBooks(
//   options?: PaginationOptions,
// ): Promise<Book[]> {
//   try {
//     const booksRef = collection(db, "books");
//     const constraints: QueryConstraint[] = [
//       orderBy(options?.sortBy || "createdAt", options?.sortOrder || "desc"),
//     ];
//
//     if (options?.limit) {
//       constraints.push(limit(options.limit));
//     }
//
//     const q = query(booksRef, ...constraints);
//     const snapshot = await getDocs(q);
//
//     return snapshot.docs.map(
//       (doc) =>
//         ({
//           id: doc.id,
//           ...doc.data(),
//         }) as Book,
//     );
//   } catch (error) {
//     console.error("Erreur récupération livres:", error);
//     throw error;
//   }
// }

export function getAllBooks(
  callback: (books: Book[]) => void,
  options?: PaginationOptions,
): () => void {
  try {
    const booksRef = collection(db, "books");
    const constraints: QueryConstraint[] = [
      orderBy(options?.sortBy || "createdAt", options?.sortOrder || "desc"),
    ];

    if (options?.limit) {
      constraints.push(limit(options.limit));
    }

    const q = query(booksRef, ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log(
          "📚 onSnapshot déclenché - Nombre de documents:",
          snapshot.docs.length,
        );

        const books = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Book,
        );

        callback(books);
      },
      (error) => {
        console.error("❌ Erreur récupération livres en temps réel:", error);
      },
    );

    console.log("✅ Listener onSnapshot configuré avec succès");

    return unsubscribe;
  } catch (error) {
    console.error("❌ Erreur configuration listener:", error);
    throw error;
  }
}

/**
 * Récupérer les livres par catégorie (avec cache Firestore)
 */
export async function getBooksByCategory(categoryId: string): Promise<Book[]> {
  try {
    // Sinon, requête normale
    console.log("🔍 Requête Firestore normale");
    const booksRef = collection(db, "books");
    const q = query(
      booksRef,
      where("categoryId", "==", categoryId),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);
    const books = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Book,
    );

    // Mettre à jour le cache
    await updateCategoryCache(categoryId, books);

    return books;
  } catch (error) {
    console.error("Erreur récupération livres par catégorie:", error);
    throw error;
  }
}

/**
 * Mettre à jour le cache de catégorie
 */
async function updateCategoryCache(
  categoryId: string,
  books: Book[],
): Promise<void> {
  try {
    const cacheRef = doc(db, "booksByCategory", categoryId);
    await setDoc(cacheRef, {
      categoryId,
      books,
      lastUpdated: Timestamp.now(),
    });
  } catch (error) {
    console.warn("Erreur mise à jour cache:", error);
  }
}

/**
 * Récupérer un livre par ID
 */
export async function getBookById(bookId: string): Promise<Book | null> {
  try {
    const docRef = doc(db, "books", bookId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Book;
  } catch (error) {
    console.error("Erreur récupération livre:", error);
    throw error;
  }
}

/**
 * Créer un nouveau livre
 */
export async function createBook(
  book: Omit<Book, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  try {
    const booksRef = collection(db, "books");
    const newDocRef = doc(booksRef);

    const bookData = {
      ...book,
      rating: book.rating || 0,
      reviewCount: book.reviewCount || 0,
      inStock: book.inStock ?? true,
      featured: book.featured || false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    await setDoc(newDocRef, bookData);

    // Invalider le cache de la catégorie
    await invalidateCategoryCache(book.categoryId);

    return newDocRef.id;
  } catch (error) {
    console.error("Erreur création livre:", error);
    throw error;
  }
}

/**
 * Mettre à jour un livre
 */
export async function updateBook(
  bookId: string,
  updates: Partial<Book>,
): Promise<void> {
  try {
    const docRef = doc(db, "books", bookId);

    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });

    // Si la catégorie a changé, invalider les deux caches
    if (updates.categoryId) {
      const oldBook = await getBookById(bookId);
      if (oldBook && oldBook.categoryId !== updates.categoryId) {
        await invalidateCategoryCache(oldBook.categoryId);
        await invalidateCategoryCache(updates.categoryId);
      }
    } else {
      const book = await getBookById(bookId);
      if (book) {
        await invalidateCategoryCache(book.categoryId);
      }
    }
  } catch (error) {
    console.error("Erreur mise à jour livre:", error);
    throw error;
  }
}

/**
 * Supprimer un livre
 */
export async function deleteBook(bookId: string): Promise<void> {
  try {
    const book = await getBookById(bookId);
    const docRef = doc(db, "books", bookId);

    await deleteDoc(docRef);

    // Invalider le cache de la catégorie
    if (book) {
      await invalidateCategoryCache(book.categoryId);
    }
  } catch (error) {
    console.error("Erreur suppression livre:", error);
    throw error;
  }
}

/**
 * Invalider le cache d'une catégorie
 */
async function invalidateCategoryCache(categoryId: string): Promise<void> {
  try {
    const cacheRef = doc(db, "booksByCategory", categoryId);
    await deleteDoc(cacheRef);
  } catch (error) {
    console.warn("Erreur invalidation cache:", error);
  }
}

/**
 * Rechercher des livres
 */
export async function searchBooks(searchQuery: string): Promise<Book[]> {
  try {
    const booksRef = collection(db, "books");

    // Firestore ne supporte pas la recherche full-text nativement
    // Option 1: Utiliser Algolia ou Meilisearch
    // Option 2: Récupérer tous les livres et filtrer côté client (si petit dataset)

    const snapshot = await getDocs(booksRef);
    const allBooks = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Book,
    );

    // Filtrage côté client
    const searchLower = searchQuery.toLowerCase();
    return allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.some((a) => a.toLowerCase().includes(searchLower)) ||
        book.subjects.some((s) => s.toLowerCase().includes(searchLower)),
    );
  } catch (error) {
    console.error("Erreur recherche livres:", error);
    throw error;
  }
}

/**
 * Récupérer les livres en vedette
 */
export async function getFeaturedBooks(
  limitCount: number = 10,
): Promise<Book[]> {
  try {
    const booksRef = collection(db, "books");
    const q = query(
      booksRef,
      where("featured", "==", true),
      orderBy("createdAt", "desc"),
      limit(limitCount),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Book,
    );
  } catch (error) {
    console.error("Erreur récupération livres vedette:", error);
    throw error;
  }
}

/**
 * Récupérer les livres avec filtres
 */
export async function getFilteredBooks(filters: BooksFilter): Promise<Book[]> {
  try {
    const booksRef = collection(db, "books");
    const constraints: QueryConstraint[] = [];

    if (filters.categoryId) {
      constraints.push(where("categoryId", "==", filters.categoryId));
    }

    if (filters.inStock !== undefined) {
      constraints.push(where("inStock", "==", filters.inStock));
    }

    if (filters.featured !== undefined) {
      constraints.push(where("featured", "==", filters.featured));
    }

    if (filters.minRating) {
      constraints.push(where("rating", ">=", filters.minRating));
    }

    constraints.push(orderBy("createdAt", "desc"));

    const q = query(booksRef, ...constraints);
    const snapshot = await getDocs(q);

    let books = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Book,
    );

    // Filtres supplémentaires côté client
    if (filters.minPrice !== undefined) {
      books = books.filter((b) => b.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      books = books.filter((b) => b.price <= filters.maxPrice!);
    }

    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      books = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.some((a) => a.toLowerCase().includes(searchLower)),
      );
    }

    return books;
  } catch (error) {
    console.error("Erreur récupération livres filtrés:", error);
    throw error;
  }
}
