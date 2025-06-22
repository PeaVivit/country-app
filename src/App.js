import React, { useState, useEffect, useMemo } from "react";
import {
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SearchBar from "./components/SearchBar";
import Load from "./components/Load";
import CountryCard from "./components/CountryCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load Dark Mode preference from localStorage or set based on system preference
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      return JSON.parse(savedMode);
    }
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(20); // Number of countries to display per page

  // useEffect to manage 'dark' class on <html> tag for Dark Mode
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    // Save Dark Mode status to localStorage
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Function to toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // useEffect for fetching country data when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        // Fetch country data from API, specifying desired fields
        // Fetch additional fields for the Collapse section: population, region, capital, currencies, languages, borders
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,currencies,languages,borders"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data); // Store fetched country data
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally display an error message on the UI
      } finally {
        setLoading(false); // Set loading to false after fetching (whether successful or failed)
      }
    };

    fetchCountries(); // Call the fetch function
  }, []); // [] means this Effect runs only once when the Component mounts

  // Function to handle search term changes
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Use useMemo to filter country data for performance (recalculates only when countries or searchTerm change)
  const filteredCountries = useMemo(() => {
    if (!searchTerm) {
      return countries; // If no search term, display all countries
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return countries.filter((country) => {
      // Search by common name
      const matchesName = country.name.common
        .toLowerCase()
        .includes(lowerCaseSearchTerm);

      // Search by capital (if exists)
      const matchesCapital =
        country.capital &&
        country.capital.some((cap) =>
          cap.toLowerCase().includes(lowerCaseSearchTerm)
        );

      // Search by currency name (if exists)
      const matchesCurrency =
        country.currencies &&
        Object.values(country.currencies).some((currency) =>
          currency.name?.toLowerCase().includes(lowerCaseSearchTerm)
        );
       
      // Search by currency Languages (if exists)
      // const matchLanguages = country.languages && Object.values(country.languages).some((languages) =>
      // languages.name?.toLowerCase().includes(lowerCaseSearchTerm)
      // );

      return matchesName || matchesCapital || matchesCurrency ;
    });
  }, [countries, searchTerm]);

  // Pagination Logic
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  // Function to change page
  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Prevent going out of bounds
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top when page changes
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Max number of page buttons to show around current page

    if (totalPages <= maxPagesToShow + 2) {
      // +2 for first and last page if always shown
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Show ellipsis if current page is far from beginning
      if (currentPage > maxPagesToShow - 1) {
        // -1 to account for '1' being shown
        pageNumbers.push("...");
      }

      // Show pages around current page
      let startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(
        totalPages - 1,
        currentPage + Math.floor(maxPagesToShow / 2)
      );

      // Adjust if near beginning or end
      if (currentPage <= Math.floor(maxPagesToShow / 2) + 1) {
        endPage = maxPagesToShow;
      } else if (currentPage >= totalPages - Math.floor(maxPagesToShow / 2)) {
        startPage = totalPages - maxPagesToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          // Don't duplicate first/last page
          pageNumbers.push(i);
        }
      }

      // Show ellipsis if current page is far from end
      if (
        currentPage <
        totalPages - (maxPagesToShow - Math.floor(maxPagesToShow / 2))
      ) {
        if (pageNumbers[pageNumbers.length - 1] !== "...") {
          // Avoid double ellipsis
          pageNumbers.push("...");
        }
      }

      // Always show last page (if not already the first page)
      if (
        totalPages > 1 &&
        pageNumbers[pageNumbers.length - 1] !== totalPages
      ) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((num, index) => (
      <button
        key={num === "..." ? `ellipsis-${index}` : num}
        onClick={() => num !== "..." && paginate(num)}
        disabled={num === "..."}
        className={`
          mx-1
          px-3
          py-2
          rounded-lg
          transition-colors
          duration-200
          ${
            num === currentPage
              ? "bg-blue-600 text-white shadow-md"
              : num === "..."
              ? "bg-transparent text-gray-500 dark:text-gray-400 cursor-default"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }
        `}
      >
        {num}
      </button>
    ));
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        text-gray-900
        dark:bg-gray-900
        dark:text-white
        transition-colors
        duration-300
        p-4
        sm:p-8
      "
    >
      <header className="flex justify-between items-center mb-8 px-4 sm:px-0">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
          Country Explorer
        </h1>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="
            p-3
            rounded-full
            bg-gray-200
            dark:bg-gray-700
            text-gray-800
            dark:text-gray-200
            shadow-md
            hover:shadow-lg
            transition-all
            duration-300
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          aria-label="Toggle dark/light mode"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>

      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Display SkeletonLoader while loading data */}
      {loading ? (
        <Load />
      ) : filteredCountries.length === 0 && searchTerm !== "" ? (
        <p className="text-center text-xl text-gray-700 dark:text-gray-300 mt-10">
          ไม่พบประเทศที่ชื่อ "{searchTerm}"
        </p>
      ) : (
        <>
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
            {currentCountries.map((country) => (
              <CountryCard key={country.name.common} country={country} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav
              className="flex justify-center items-center my-8 "
              aria-label="Pagination"
            >
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="
                    p-2
                    rounded-lg
                    bg-gray-200
                    text-gray-700
                    hover:bg-blue-100
                    dark:bg-gray-700
                    dark:text-gray-200
                    dark:hover:bg-gray-600
                    transition-colors
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    mx-1
                  "
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>

              {renderPageNumbers()}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="
                    p-2
                    rounded-lg
                    bg-gray-200
                    text-gray-700
                    hover:bg-blue-100
                    dark:bg-gray-700
                    dark:text-gray-200
                    dark:hover:bg-gray-600
                    transition-colors
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    mx-1
                  "
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

export default App;
