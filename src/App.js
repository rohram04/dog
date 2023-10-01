import { useEffect, useState } from "react";
import BreedList from "./components/BreedList";
import Gallery from "./components/Gallery.jsx";
import "./App.css";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [images, setImages] = useState({});
  const [hiddenBreeds, setHiddenBreeds] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [galleryHidden, setGalleryHidden] = useState(true);

  useEffect(() => {
    const getBreeds = async () => {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      const { message } = await response.json();
      let breeds = [];
      for (const [breed, specificBreeds] of Object.entries(message)) {
        breeds = [
          ...breeds,
          breed,
          // ...specificBreeds.map((specificBreed) => breed + "-" + specificBreed),
        ];
      }
      setBreeds(breeds);
    };

    getBreeds();
  }, []);

  useEffect(() => {
    const getSelectedBreeds = async () => {
      let images = [];
      for (let breed of selectedBreeds) {
        const response = await fetch(
          `https://dog.ceo/api/breed/${breed}/images`
        );
        const { message } = await response.json();
        images[breed] = message;
      }
      console.log(images);
      setImages(images);
    };

    getSelectedBreeds();
  }, [selectedBreeds]);

  return (
    <div className="flex flex-col sm:flex-row h-[100dvh] sm:p-2">
      <BreedList
        hidden={!galleryHidden}
        breeds={breeds}
        selectedBreeds={selectedBreeds}
        setSelectedBreeds={setSelectedBreeds}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Gallery
        hidden={galleryHidden}
        images={images}
        searchText={searchText}
        hiddenBreeds={hiddenBreeds}
        setHiddenBreeds={setHiddenBreeds}
      />
      <button
        onClick={() => setGalleryHidden((previous) => !previous)}
        className="bg-blue-800 text-white p-2 rounded-md mx-2 mb-2 sm:hidden"
      >
        {galleryHidden ? "Show Gallery" : "Search Breeds"}
      </button>
    </div>
  );
}

export default App;
