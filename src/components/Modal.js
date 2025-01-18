import useModalStore from "../store/useModalStore";
import ImageModal from "./ImageModal";
import React from "react";

const Modal = () => {
    const { isOpen, image,file, setOpen,setFile, setImage } = useModalStore((state) => state);

    if (isOpen && image) {
        return (
            <ImageModal
                imageSrc={image.url} // Передаем URL изображения
                file={file}
                altText="Enlarged image"
                tags={image.tags || []} // Если tags нет, передаем пустой массив
                onClose={() => {
                    setOpen(false);
                    setImage(null);
                    setFile(null);
                }}
            />
        );
    }

    return null;
};

export default Modal;
