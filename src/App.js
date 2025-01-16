import React, {useEffect, useState} from "react";
import axios from "axios";
import {useFetching} from "./hooks/useFetching";
import "./App.css";
import useFetching from "./hooks/useFetching";
import {apiClient, config} from "./api/config";

// Компонент для вывода изображения с подписью
const ImageCard = ({ imageSrc, altText, onClick }) => (
  <div className="image-card" onClick={onClick}>
    <img src={imageSrc} alt={altText} />
    <p>{altText}</p>
  </div>
);

// Компонент для модального окна
const ImageModal = ({ imageSrc, altText, onClose }) => (
  <div className="modal" onClick={onClose}>
    <div className="modal-content">
      <img src={imageSrc} alt={altText} />
    </div>
  </div>
);

function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [fetching, isLoading, error, setError] = useFetching( async () => {
      const response = await apiClient.get(`${config.endpoints.search}?search_string=blue%20&page=1&page_size=10`);

      console.log(response);
  })

  const funSearch = async (tags) => {
    const { data } = await axios(`/search/${tags}`);
    return data;
  };


  const handleSearch = async () => {
    try {
      const results = await funSearch(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to fetch search results. Please try again.");
    }
  };

  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prev) => {
      const updatedImages = [...newImages, ...prev];
      return updatedImages.slice(0, 15);
    });
  };

  const openModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage("");
  };

    useEffect(() => {
        fetching();
    }, []);

  return (
    <div className="App">
      <header>
        <h1>Image Search & Upload</h1>
        <div>
          <input
            type="text"
            placeholder="Search for images..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
          />
        </div>

        <h2>Last 15 Uploaded Images</h2>
        <div className="image-grid">
          {uploadedImages.map((image, index) => (
            <ImageCard
              key={index}
              imageSrc={image}
              altText={`Uploaded ${index + 1}`}
              onClick={() => openModal(image)}
            />
          ))}
        </div>

        <h2>Search Results</h2>
        <div className="image-grid">
          {searchResults.map((result, index) => (
            <ImageCard
              key={index}
              imageSrc={result}
              altText={`Search Result ${index + 1}`}
              onClick={() => openModal(result)}
            />
          ))}
        </div>

        {isModalOpen && (
          <ImageModal
            imageSrc={modalImage}
            altText="Enlarged image"
            onClose={closeModal}
          />
        )}
      </header>
    </div>
  );
}

export default App;
