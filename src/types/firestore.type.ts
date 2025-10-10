import { Timestamp } from "firebase/firestore";

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

// Type pour un livre
export interface Book {
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
  subjects: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

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
