import ImageCard from "./ImageCard";
import React, { useState } from "react";
import { apiClient, config } from "../api/config";
import useModalStore from "../store/useModalStore";

const UploadImage = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const { setOpen, setImage } = useModalStore((state) => state);

    const handleUpload = async (event) => {
        const file = Array.from(event.target.files);
        if (file.length > 0) {
            setUploadedImage(file[0]);

            // КОГДА СЕРВЕР
            // const response = await apiClient.post(
            //     `${config.endpoints.tags.types.vit}`,
            //     {
            //         file: file[0],
            //     },
            //     {
            //         headers: {
            //             "Content-Type": "multipart/form-data", // Указываем, что это загрузка файла
            //         },
            //     }
            // );
        }
    };

    const openModal = (image) => {
        setOpen(true);
        setImage({
            url: URL.createObjectURL(uploadedImage),
            tags: [], // Здесь можно добавить теги, если они получены с сервера
        });
    };

    return (
        <section className="app__upload">
            <input type="file" accept="image/*" onChange={handleUpload} />
            {!!uploadedImage && (
                <div className="image-grid">
                    <ImageCard
                        imageSrc={URL.createObjectURL(uploadedImage)}
                        altText={`Uploaded`}
                        onClick={() =>
                            openModal({
                                url_image: URL.createObjectURL(uploadedImage),
                                tags: [],
                            })
                        }
                    />
                </div>
            )}
        </section>
    );
};

export default UploadImage;
