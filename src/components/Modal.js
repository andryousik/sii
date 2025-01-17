import useModalStore from "../store/useModalStore";
import ImageModal from "./ImageModal";
import React from "react";

const Modal = () => {
    const { isOpen, image, setOpen, setImage } = useModalStore(
        (state) => state
    );

    if (isOpen) {
        return (
            <ImageModal
                imageSrc={image}
                altText="Enlarged image"
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
