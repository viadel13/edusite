import { Timestamp } from "firebase/firestore";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  quantityInStock: number;
  author?: string;
  coverUrl?: string;
  description?: string;
  inStock: boolean;
}

// Type pour une catégorie
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  color: string;
  booksCount?: number;
  super: boolean;
  createdAt: Timestamp | Date;
}

// Type pour l'auteur
export type Author = {
  id: string;
  name: string;
  profileImage: string;
  bio: string;
  categories: string[];
  createdAt: Timestamp | Date;
};

// Type pour un livre
export type Book = {
  id: string;
  title: string;
  description: string;
  author: string[];
  coverUrl: string;
  thumbnailUrl?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  publishYear: number;
  isbn?: string;
  pages?: number;
  language: string;
  categoryId: string;
  quantity: number;
  subjects: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  tag?: "special";
  salesCount?: number; // Nombre de ventes ou commandes pour le best-selling
  isNew?: boolean; // Indiquer si le produit est nouveau
} & (
  | { tag: "special"; discount: number }
  | { tag?: "special"; discount?: number }
);

// Type pour la vue dénormalisée (cache)
export interface BooksByCategory {
  categoryId: string;
  books: Book[];
  lastUpdated: Timestamp | Date;
}

// Type pour les filtres
export interface BooksFilter {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  featured?: boolean;
  searchQuery?: string;
}

// Type pour les options de pagination
export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: "title" | "price" | "rating" | "createdAt";
  sortOrder?: "asc" | "desc";
}

// Type pour la réponse paginée
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}
