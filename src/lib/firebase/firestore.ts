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
  Author,
} from "@/types/firestore.type";

// Fonction pour récupérer tous les auteurs
export function getAllAuthors(
  callback: (authors: Author[]) => void,
): () => void {
  try {
    const authorsRef = collection(db, "authors");

    const unsubscribe = onSnapshot(
      authorsRef,
      (snapshot) => {
        // Récupérer les auteurs depuis la snapshot
        const authors: Author[] = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Author,
        );

        // Appeler le callback avec les auteurs récupérés
        callback(authors);
      },
      (error) => {
        console.error(
          "❌ Erreur récupération des auteurs en temps réel:",
          error,
        );
      },
    );

    return unsubscribe; // Retourner la fonction de désabonnement
  } catch (error) {
    console.error("❌ Erreur dans la récupération des auteurs:", error);
    throw error;
  }
}

// Fonction pour récupérer un auteur en fonction de son ID
export async function getAuthorById(authorId: string): Promise<Author | null> {
  try {
    const authorsRef = collection(db, "authors");

    const q = query(authorsRef, where("authorId", "==", authorId));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const authorDoc = querySnapshot.docs[0];
      const authorData = authorDoc.data();
      return {
        id: authorDoc.id,
        ...authorData,
      } as Author;
    } else {
      console.log("❌ L'auteur avec l'ID spécifié n'existe pas.");
      return null;
    }
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l'auteur:", error);
    throw error;
  }
}

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
    console.log(categoryId);
    const booksRef = collection(db, "books");
    const q = query(booksRef, where("categoryId", "==", categoryId));

    const snapshot = await getDocs(q);
    const books = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Book,
    );

    return books;
  } catch (error) {
    console.error("Erreur récupération livres par catégorie:", error);
    throw error;
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
      await getBookById(bookId);
    } else {
      await getBookById(bookId);
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
    await getBookById(bookId);
    const docRef = doc(db, "books", bookId);

    await deleteDoc(docRef);
  } catch (error) {
    console.error("Erreur suppression livre:", error);
    throw error;
  }
}

/**
 * Rechercher des livres
 */
export async function searchBooks(searchQuery: string): Promise<Book[]> {
  try {
    const booksRef = collection(db, "books");

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
