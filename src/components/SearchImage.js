import ImageCard from "./ImageCard";
import React, { useEffect, useState } from "react";
import useFetching from "../hooks/useFetching";
import { apiClient, config } from "../api/config";
import useModalStore from "../store/useModalStore";
import axios from "axios";

const SearchImage = () => {
  const [query, setQuery] = useState(""); // Текущий поисковый запрос
  const [responseImages, setResponseImages] = useState(null); // Данные изображений
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [totalPages, setTotalPages] = useState(1); // Общее количество страниц
  const { setOpen, setImage } = useModalStore((state) => state);

  const [fetching, loading, error] = useFetching(async () => {
    // Получаем изображения с учетом текущей страницы и устанавливаем page_size=12
    const response = await apiClient.get(
      `${config.endpoints.search}?search_string=${query}&page=${currentPage}&page_size=12`
    );

    if (response.data) {
      setResponseImages(response.data.data);
      setTotalPages(Math.ceil(response.data.total / 12)); // Рассчитываем общее количество страниц (по 12 изображений на страницу)
    }
  });

  const handleSearch = async () => {
    setCurrentPage(1); // Сбрасываем текущую страницу при новом поиске
    await fetching();
  };

  const openModal = (image) => {
    setOpen(true);
    setImage({
      url: image.url_image,
      tags: image.tags || [],
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Изменяем текущую страницу
  };

  useEffect(() => {
    fetching(); // Вызываем поиск при изменении страницы или инициализации
  }, [currentPage]);

  return (
    <section className="app__search">
      <div>
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <h2>Search Results</h2>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="image-grid">
            {responseImages?.map((image, index) => (
              <ImageCard
                key={index}
                imageSrc={image.url_image}
                onClick={() => openModal(image)}
              />
            ))}
          </div>
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default SearchImage;
