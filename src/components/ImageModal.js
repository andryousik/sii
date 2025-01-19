import React, { useState } from "react";
import { apiClient, config } from "../api/config";

const ImageModal = ({ imageSrc, altText, tags = [], onClose, file }) => {
    const [extraTags, setExtraTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState(null); // Для отслеживания выбранной модели

    const handleLoadTags = async (endpoint, modelName) => {
        setLoading(true);
        setSelectedModel(modelName); // Устанавливаем выбранную модель
        try {
            const response = await apiClient.post(
                endpoint,
                { file: file },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data && Array.isArray(response.data.predicted_tags)) {
                setExtraTags(response.data.predicted_tags.map((tag) => ({ name: tag })));
            }
        } catch (error) {
            console.error("Error loading tags:", error);
        } finally {
            setLoading(false);
        }
    };

    const allTags = [...tags, ...extraTags];

return (
    <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="image-container">
                <img src={imageSrc} alt={altText} />
            </div>
            {!!file && (
                <div className="tags-actions">
                    {[
                        { label: "vit", endpoint: config.endpoints.tags.types.vit },
                        { label: "clip", endpoint: config.endpoints.tags.types.clip },
                        { label: "vit U clip", endpoint: config.endpoints.tags.types.union },
                        { label: "vit ∩ clip", endpoint: config.endpoints.tags.types.intersection },
                    ].map(({ label, endpoint }) => (
                        <button
                            key={label}
                            onClick={() => handleLoadTags(endpoint, label)}
                            disabled={selectedModel === label || loading}
                            className={selectedModel === label ? "selected" : ""}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )}
            {allTags.length > 0 && (
                <div className="extra-tags-scroll">
                    <h3>Loaded Tags:</h3>
                    <div className="extra-tags-container">
                        {allTags.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

};

export default ImageModal;
