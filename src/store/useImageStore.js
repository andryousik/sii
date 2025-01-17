// src/store/useImageStore.js
import { create } from "zustand";

const useImageStore = create((set) => ({
  images: [],
  addImage: (newImage) => set((state) => ({ images: [...state.images, newImage] })),
  setImages: (images) => set({ images }),
}));

export default useImageStore;
