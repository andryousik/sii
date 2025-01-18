import React, { useState } from "react";
import { apiClient, config } from "../api/config";

const ImageModal = ({ imageSrc, altText, tags = [], onClose }) => {
    const [extraTags, setExtraTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleLoadTags = async (endpoint) => {
        setLoading(true);
        try {
            const response = await apiClient.post(endpoint, {
                file: imageSrc,
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
                <div className="tags-container">
                    <h3>Tags:</h3>
                    {tags.length > 0 ? (
                        <>
                            {tags.slice(0, 30).map((tag, index) => (
                                <span key={index} className="tag">
                                    {tag.name}
                                </span>
                            ))}
                            {tags.length > 30 && (
                                <p>
                                    ...and {tags.length - 30} more tags. Use the buttons below to load specific tags.
                                </p>
                            )}
                        </>
                    ) : (
                        <span>No tags available</span>
                    )}
                </div>
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
                {extraTags.length > 0 && (
                    <div className="extra-tags">
                        <h3>Loaded Tags:</h3>
                        {extraTags.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageModal;
