export default function Gallery({ images, hiddenBreeds, setHiddenBreeds }) {
  return (
    <div className="grow h-screen overflow-y-scroll no-scrollbar pr-4">
      {Object.entries(images).map(([breed, images]) => {
        return (
          <>
            <div className="flex p-2">
              <div className="text-2xl grow">{breed}</div>
              <button
                className="text-blue-500"
                onClick={() => {
                  if (hiddenBreeds.includes(breed))
                    return setHiddenBreeds((previouslyHiddenBreeds) =>
                      previouslyHiddenBreeds.filter((x) => x !== breed)
                    );
                  setHiddenBreeds((previouslyHiddenBreeds) => [
                    ...previouslyHiddenBreeds,
                    breed,
                  ]);
                }}
              >
                {hiddenBreeds.includes(breed) ? "show" : "hide"}
              </button>
            </div>
            {!hiddenBreeds.includes(breed) && (
              <div className="grid grid-cols-fluid-mobile sm:grid-cols-fluid gap-2 p-2">
                {images.map((image) => (
                  <div className="bg-slate-200 rounded-md p-2">
                    <img
                      className="object-contain h-48 w-full rounded-md"
                      src={image}
                      alt={breed}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
