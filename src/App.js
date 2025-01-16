import React, {useEffect, useState} from "react";
import axios from "axios";
import "./App.css";
import useFetching from "./hooks/useFetching";
import {apiClient, config} from "./api/config";


// {
//     "data": [
//     {
//         "id": 0,
//         "resolution_width": 0,
//         "resolution_height": 0,
//         "url_page": "string",
//         "url_image": "string",
//         "path": "string",
//         "tags": [
//             {
//                 "id": 0,
//                 "name": "string"
//             }
//         ]
//     }
// ],
//     "total": 0
// }



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
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");


  const [responseImages, setResponseImages] = useState(null);

  const [fetching,loading,error] = useFetching( async () => {

      const response = await apiClient.get(`${config.endpoints.search}?search_string=${query}%20&page=1&page_size=10`);

      if (response.data) {
          setResponseImages(response.data);
      }
  });


    const [fetchingUpload,uploadLoading] = useFetching( async () => {
        const response = await apiClient.post(`${config.endpoints.tags.types.vit}`,{
            file: uploadedImage,
        });

        if (response.data) {
            console.log(response.data);
        }
    });

  const handleSearch = async () => {
    await fetching();
  };

  const handleUploadFetch = async () => {
      await fetchingUpload();
  }

  const handleUpload = (event) => {
    const file = Array.from(event.target.files);
    if (file.length > 0) {
        setUploadedImage(file[0]);
    }
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
        handleUploadFetch();
    }, [uploadedImage]);


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

        <h2>Last Uploaded Image</h2>
          {!!uploadedImage  && (
              <div className="image-grid">
                  <ImageCard
                      imageSrc={URL.createObjectURL(uploadedImage)}
                      altText={`Uploaded`}
                      onClick={() => {
                      }}
                  />
              </div>

          )}


          <h2>Search Results</h2>
          {loading === true && <>
              <h1>
                  Загрузка...
              </h1>
          </>}
          {
              !loading && !!responseImages && (
                  <div className="image-grid">
                      {responseImages.data.map((image, index) => (
                          <ImageCard key={index} imageSrc={image.url_image} altText={"Картинка"}
                                     onClick={() => openModal(image)}/>
                      ))}
                  </div>
              )
          }

          {/*<div className="image-grid">*/}
          {/*  {searchResults.map((result, index) => (*/}
          {/*    <ImageCard*/}
          {/*      key={index}*/}
          {/*      imageSrc={result}*/}
          {/*      altText={`Search Result ${index + 1}`}*/}
        {/*      onClick={() => openModal(result)}*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*</div>*/}

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
