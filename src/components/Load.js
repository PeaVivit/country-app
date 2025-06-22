const Load = () => {
  const numberOfSkeletons = 8;
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-8
        justify-items-center
        pb-10
      "
    >
      {Array.from({ length: numberOfSkeletons }).map((_, index) => (
        <div
          key={index}
          className="
            bg-white
            dark:bg-gray-800
            rounded-xl
            shadow-lg
            overflow-hidden
            flex
            flex-col
            h-full
            animate-pulse
          "
          style={{ width: "18rem" }}
        >
          <div className="w-full h-40 bg-gray-300 dark:bg-gray-600 rounded-t-xl"></div>
          <div className="p-5 flex flex-col flex-grow">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>

            <div className="h-10 bg-blue-400 dark:bg-blue-600 rounded-lg w-full mb-4 mt-auto"></div>

            <div className="mt-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Load;
