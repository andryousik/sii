import {create} from "zustand";

const useModalStore =  create((set) => ({
    isOpen: false,
    image: null,
    setImage: (image) => set({ image }), // Обновляет состояние image
    setOpen: (open) => set(() => ({ isOpen: open})), // Добавлено для переключения isOpen
}));

export default useModalStore;