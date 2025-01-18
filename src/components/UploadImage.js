import ImageCard from "./ImageCard";
import React, { useState } from "react";
import useModalStore from "../store/useModalStore";
import { apiClient, config } from "../api/config";

// // ТЕСТОВЫЕ ДАННЫЕ БЕЗ СЕРВЕРА
// const hardData = {
//     filename: "container.webp",
//     predicted_tags: ["tag1", "tag2", "tag3"], // Пример данных
// };

const UploadImage = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const { setOpen, setImage } = useModalStore((state) => state);

    const handleUpload = async (event) => {
        const file = Array.from(event.target.files); // Получаем список файлов
        if (file.length > 0) {
            setUploadedImage(file[0]); // Сохраняем первый загруженный файл

            // КОГДА СЕРВЕР
            const response = await apiClient.post(
                `${config.endpoints.tags.types.vit}`,
                {
                    file: file[0], // Отправляем файл на сервер
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Указываем, что это загрузка файла
                    },
                }
            );

        }
    };

    const openModal = (image) => {
        setOpen(true);
        setImage({
            url: URL.createObjectURL(uploadedImage), // URL для отображения изображения
            tags: uploadedImage.predicted_tags.map((tag) => ({ name: tag })), // Преобразуем теги в ожидаемый формат
        });
    };

    return (
        <section className="app__upload">
            <input type="file" accept="image/*" onChange={handleUpload} /> {/* Поле для загрузки файлов */}
            {!!uploadedImage && ( // Если изображение загружено, отображаем его
                <div className="image-grid">
                    <ImageCard
                        imageSrc={URL.createObjectURL(uploadedImage)} // Преобразуем файл в URL
                        altText={`Uploaded`} // Альтернативный текст
                        onClick={openModal} // Открываем модальное окно при клике
                    />
                </div>
            )}
        </section>
    );
};

export default UploadImage;
