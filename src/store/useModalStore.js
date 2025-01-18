import {create} from "zustand";

const useModalStore =  create((set) => ({
    isOpen: false,
    image: null,
    file: null,
    setImage: (image) => set({ image }), // Обновляет состояние image
    setFile: (file) => set({ file }),
    setOpen: (open) => set(() => ({ isOpen: open})), // Добавлено для переключения isOpen
}));

export default useModalStore;