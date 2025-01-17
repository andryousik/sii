// Компонент для модального окна
const ImageModal = ({ imageSrc, altText, onClose }) => (
    <div className="modal" onClick={onClose}>
        <div className="modal-content">
            <img src={imageSrc} alt={altText} />
        </div>
    </div>
);

export default ImageModal;