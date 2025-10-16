import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import type { Book, CartItem } from "@/types/firestore.type"; // adapte selon ton projet

// 1️⃣ Structure d’un élément du panier

// 2️⃣ State du slice
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// 3️⃣ Fonction utilitaire : sauvegarder dans localStorage
const saveToLocalStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Erreur localStorage:", error);
  }
};

// 4️⃣ Fonction utilitaire : charger depuis localStorage
const loadFromLocalStorage = (): CartItem[] => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// 5️⃣ Slice Redux
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCartFromLocalStorage(state) {
      state.items = loadFromLocalStorage();
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveToLocalStorage(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveToLocalStorage([]);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
      saveToLocalStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  loadCartFromLocalStorage,
} = cartSlice.actions;

// 6️⃣ Sélecteurs
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

export default cartSlice.reducer;
