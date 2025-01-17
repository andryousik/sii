// Компонент для вывода изображения с подписью
const ImageCard = ({ imageSrc, altText, onClick }) => (
    <div className="image-card" onClick={onClick}>
        <img src={imageSrc} alt={altText} />
        <p>{altText}</p>
    </div>
);

export default ImageCard;