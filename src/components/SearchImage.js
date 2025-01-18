import ImageCard from "./ImageCard";
import React, { useEffect, useState } from "react";
import useFetching from "../hooks/useFetching";
import { apiClient, config } from "../api/config";
import useModalStore from "../store/useModalStore";

// const hardData = {
//     data: [
//         {
//             id: 0,
//             resolution_width: 0,
//             resolution_height: 0,
//             url_page: "string",
//             url_image:
//                 "https://avatars.mds.yandex.net/i?id=02a0d438915e4409b6779abb9faf64f6cfcca7e5-5380211-images-thumbs&n=13",
//             path: "string",
//             tags: [
//                 {
//                     id: 0,
//                     name: "tag1",
//                 },
//                 {
//                     id: 1,
//                     name: "tag2",
//                 },
//             ],
//         },
//         {
//             id: 1,
//             resolution_width: 0,
//             resolution_height: 0,
//             url_page: "string",
//             url_image:
//                 "https://get.wallhere.com/photo/face-cat-nose-whiskers-skin-kitten-kid-fluffy-mammal-playful-vertebrate-close-up-cat-like-mammal-small-to-medium-sized-cats-carnivoran-domestic-short-haired-cat-700214.jpg",
//             path: "string",
//             tags: [
//                 {
//                     id: 0,
//                     name: "tag1_lev",
//                 },
//                 {
//                     id: 1,
//                     name: "tag2_lev",
//                 },
//             ],
//         },
//     ],
//     total: 0,
// };

const SearchImage = () => {
    const [query, setQuery] = useState("");
    const [responseImages, setResponseImages] = useState(null);
    const { setOpen, setImage } = useModalStore((state) => state);

    const [fetching, loading, error] = useFetching(async () => {
        // КОГДА СЕРВЕР
        const response = await apiClient.get(
            `${config.endpoints.search}?search_string=${query}%20&page=1&page_size=10`
        );
        
        if (response.data) {
            setResponseImages(response.data);
        }

        // ЭТО УДАЛИТЬ КОГДА БУДЕТ СЕРВЕР!!!!! 
        // setResponseImages(hardData);
    });

    const openModal = (image) => {
        setOpen(true);
        setImage({
            url: image.url_image,
            tags: image.tags || [],
        });
    };

    const handleSearch = async () => {
        await fetching();
    };

    useEffect(() => {
        handleSearch();
    }, []);

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
            {loading === true && <h1>Загрузка...</h1>}
            {!loading && !!responseImages && (
                <div className="image-grid">
                    {responseImages.data.map((image, index) => (
                        <ImageCard
                            key={index}
                            imageSrc={image.url_image}
                            altText={"Картинка"}
                            onClick={() => openModal(image)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default SearchImage;
