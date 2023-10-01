import { useState } from "react";

export default function BreedList({
  hidden,
  selectedBreeds,
  breeds,
  setSelectedBreeds,
  searchText,
  setSearchText,
}) {
  const [timer, setTimer] = useState(null);

  const handleChange = async (event) => {
    clearTimeout(timer);
    const newTimer = setTimeout(async () => {
      setSearchText(event.target.value.toLowerCase());
    }, 300);
    setTimer(newTimer);
  };

  return (
    <div
      className={
        "flex grow p-2 sm:max-w-xs flex-col overflow-hidden " +
        (hidden ? " hidden sm:flex" : "")
      }
    >
      <input
        onChange={handleChange}
        className="bg-slate-200 w-full rounded-md p-2 outline-none"
        placeholder="Search a breed"
        type="text"
      ></input>
      <ul className="py-2 space-y-1.5 h-inherit overflow-y-scroll no-scrollbar snap-y">
        {breeds.map((breed) => {
          if (!breed.includes(searchText)) return;
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
