import React, { useState } from "react";
import { apiClient, config } from "../api/config";

const ImageModal = ({ imageSrc, altText, tags = [], onClose, file }) => {
    const [extraTags, setExtraTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleLoadTags = async (endpoint) => {
        setLoading(true);
        try {
            const response = await apiClient.post(endpoint, {
                file: file,
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.data && Array.isArray(response.data.predicted_tags)) {
                setExtraTags(response.data.predicted_tags.map((tag) => ({ name: tag })));
            }
        } catch (error) {
            console.error("Error loading tags:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="image-container">
                    <img src={imageSrc} alt={altText} />
                </div>
                {!!file && (
                    <div className="tags-actions">
                        <button
                            onClick={() => handleLoadTags(config.endpoints.tags.types.vit)}
                            disabled={loading}
                        >
                            vit
                        </button>
                        <button
                            onClick={() => handleLoadTags(config.endpoints.tags.types.clip)}
                            disabled={loading}
                        >
                            clip
                        </button>
                        <button
                            onClick={() => handleLoadTags(config.endpoints.tags.types.union)}
                            disabled={loading}
                        >
                            vit U clip
                        </button>
                        <button
                            onClick={() => handleLoadTags(config.endpoints.tags.types.intersection)}
                            disabled={loading}
                        >
                            vit ∩ clip
                        </button>
                    </div>
                )}
                {extraTags.length > 0 && (
                    <div className="extra-tags-scroll">
                        <h3>Loaded Tags:</h3>
                        <div className="extra-tags-container">
                            {extraTags.map((tag, index) => (
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
