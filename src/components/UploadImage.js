import ImageCard from "./ImageCard";
import React, { useState } from "react";
import useModalStore from "../store/useModalStore";
import { apiClient, config } from "../api/config";

const UploadImage = () => {
    const [uploadedImage, setUploadedImage] = useState(null); // Состояние для загруженного изображения
    const [tags, setTags] = useState([]); // Состояние для сохранения тегов
    const { setOpen, setImage, setFile } = useModalStore((state) => state); // Управление состоянием модального окна

    const handleUpload = async (event) => {
        const file = Array.from(event.target.files); // Получаем список файлов
        if (file.length > 0) {
            setUploadedImage(file[0]); // Сохраняем первый загруженный файл

        }
    };

    const openModal = () => {
        if (!uploadedImage) return; // Проверяем, есть ли загруженное изображение

        setOpen(true); // Открываем модальное окно
        setImage({
            url: URL.createObjectURL(uploadedImage), // Преобразуем загруженный файл в URL
            tags: tags, // Передаем теги, сохраненные в состоянии
        });
        setFile(uploadedImage);
    };

    return (
        <section className="app__upload">
            {/* Поле для загрузки файлов */}
            <input type="file" accept="image/*" onChange={handleUpload} />
            {!!uploadedImage && ( // Если изображение загружено, отображаем его
                <div className="image-grid">
                    <ImageCard
                        imageSrc={URL.createObjectURL(uploadedImage)} // Преобразуем файл в URL для отображения
                        altText={`Uploaded`} // Альтернативный текст
                        onClick={openModal} // Открываем модальное окно при клике
                    />
                </div>
            )}
        </section>
    );
};

export default UploadImage;
