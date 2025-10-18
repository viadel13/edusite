"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addToCart,
  selectCartItems,
  setLoadItemsClick,
} from "@/store/slices/cartSlice";
import toast from "react-hot-toast";
import { Book } from "@/types/firestore.type";

export function useAddToCart() {
  const dispatch = useAppDispatch();
  const Items = useAppSelector(selectCartItems);
  const [loadingAction, setLoadingAction] = useState<{
    id: string | null;
    type: "add" | null;
  }>({ id: null, type: null });

  const [animateId, setAnimateId] = useState<string | null>(null);
  const [showPlusId, setShowPlusId] = useState<string | null>(null);

  const handleAddToCart = (book: Book, onSuccess?: () => void) => {
    dispatch(setLoadItemsClick(true));
    setLoadingAction({ id: book.id, type: "add" });
    setAnimateId(book.id);
    setShowPlusId(book.id);

    setTimeout(() => setAnimateId(null), 400);
    setTimeout(() => setShowPlusId(null), 600);

    const existingItem = Items.find((item) => item.id === book.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;

    if (currentQuantity >= book.quantity) {
      setTimeout(() => {
        toast.error("Quantité maximale atteinte pour cet article !");
        setLoadingAction({ id: null, type: null });
        dispatch(setLoadItemsClick(false));
      }, 1200);
      return;
    }

    dispatch(
      addToCart({
        id: book.id,
        title: book.title,
        price: book.price || 0,
        quantity: 1,
        quantityInStock: book.quantity,
        author: book.author?.join(", "),
        coverUrl: book.coverUrl,
        description: book.description,
        inStock: book.inStock,
      }),
    );

    setTimeout(() => {
      setLoadingAction({ id: null, type: null });
      toast.success("Ajouté au panier !");
      dispatch(setLoadItemsClick(false));
      if (onSuccess) onSuccess();
    }, 2000);
  };

  return {
    handleAddToCart,
    loadingAction,
    animateId,
    showPlusId,
  };
}
