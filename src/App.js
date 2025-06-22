// Optimized App.js for Country Explorer
import React, { useState, useEffect, useMemo } from "react";
import { Sun, Moon, ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "./components/SearchBar";
import Load from "./components/Load";
import CountryCard from "./components/CountryCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(20);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,currencies,languages,borders");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredCountries = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return countries.filter(({ name, capital = [], currencies = {} }) => {
      const matchesName = name?.common?.toLowerCase().includes(term);
      const matchesCapital = capital.some(c => c.toLowerCase().includes(term));
      const matchesCurrency = Object.values(currencies).some(c => c.name?.toLowerCase().includes(term));
      return matchesName || matchesCapital || matchesCurrency;
    });
  }, [countries, searchTerm]);

  const indexOfLast = currentPage * countriesPerPage;
  const indexOfFirst = indexOfLast - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const paginate = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const max = 5;
    const mid = Math.floor(max / 2);

    const first = Math.max(2, currentPage - mid);
    const last = Math.min(totalPages - 1, currentPage + mid);

    pages.push(1);
    if (first > 2) pages.push("...");

    for (let i = first; i <= last; i++) pages.push(i);
    if (last < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages.map((num, idx) => (
      <button
        key={num === "..." ? `ellipsis-${idx}` : num}
        onClick={() => typeof num === "number" && paginate(num)}
        disabled={num === "..."}
        className={`mx-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
          num === currentPage
            ? "bg-blue-600 text-white shadow-md"
            : num === "..."
            ? "bg-transparent text-gray-500 dark:text-gray-400 cursor-default"
            : "bg-gray-200 text-gray-700 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        }`}
      >
        {num}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 p-4 sm:p-8">
      <header className="flex justify-between items-center mb-8 px-4 sm:px-0">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">Country Explorer</h1>
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle dark/light mode"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>

      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {loading ? (
        <Load />
      ) : filteredCountries.length === 0 && searchTerm ? (
        <p className="text-center text-xl text-gray-700 dark:text-gray-300 mt-10">
          ไม่พบประเทศที่ชื่อ "{searchTerm}"
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center pb-10">
            {currentCountries.map((c) => (
              <CountryCard key={c.name.common} country={c} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="flex justify-center items-center my-8" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mx-1"
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>
              {renderPageNumbers()}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mx-1"
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