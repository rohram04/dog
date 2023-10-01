import { useState, useEffect } from "react";

export default function BreedList({
  hidden,
  selectedBreeds,
  breeds,
  setSelectedBreeds,
}) {
  const [searchText, setSearchText] = useState("");

  return (
    <div
      className={
        "flex grow p-2 sm:max-w-xs flex-col overflow-hidden " +
        (hidden ? " hidden sm:flex" : "")
      }
    >
      <input
        onChange={(event) => {
          setSearchText(event.target.value.toLowerCase());
        }}
        className="bg-slate-200 w-full rounded-md p-2 outline-none"
        placeholder="Search a breed"
        type="text"
        value={searchText}
      ></input>
      <ul className="py-2 space-y-1.5 h-inherit overflow-y-scroll no-scrollbar snap-y">
        {breeds
          .filter((breed) => breed.includes(searchText))
          .map((breed) => {
            return (
              <li className="snap-center">
                <button
                  onClick={() => {
                    if (selectedBreeds.includes(breed))
                      return setSelectedBreeds((previouslySelectedBreeds) =>
                        previouslySelectedBreeds.filter((x) => x !== breed)
                      );
                    setSelectedBreeds((previouslySelectedBreeds) => [
                      ...previouslySelectedBreeds,
                      breed,
                    ]);
                  }}
                  className={
                    "p-2 rounded-md shadow-md w-full text-left hover:cursor- sm:text-xl" +
                    (selectedBreeds.includes(breed)
                      ? " bg-blue-800 hover:opacity-80 text-white"
                      : " hover:bg-slate-200")
                  }
                >
                  {breed}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
