import useModalStore from "../store/useModalStore";
import ImageModal from "./ImageModal";
import React from "react";

const Modal = () => {
    const { isOpen, image, setOpen, setImage } = useModalStore((state) => state);

    if (isOpen && image) {
        return (
            <ImageModal
                imageSrc={image.url} // Передаем URL изображения
                altText="Enlarged image"
                tags={image.tags || []} // Если tags нет, передаем пустой массив
                onClose={() => {
                    setOpen(false);
                    setImage(null);
                }}
            />
        );
    }

    return null;
};

export default Modal;
