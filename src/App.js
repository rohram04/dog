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
    <div className="flex">
      <BreedList
        breeds={breeds}
        selectedBreeds={selectedBreeds}
        setSelectedBreeds={setSelectedBreeds}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Gallery
        images={images}
        searchText={searchText}
        hiddenBreeds={hiddenBreeds}
        setHiddenBreeds={setHiddenBreeds}
      />
    </div>
  );
}

export default App;
