import { Search } from 'lucide-react'; 
/**
 * Component สำหรับแถบค้นหา
 * @param {object} props - คุณสมบัติที่รับเข้ามา
 * @param {string} props.searchTerm - ข้อความที่ใช้ค้นหาปัจจุบัน
 * @param {function} props.onSearchChange - ฟังก์ชันที่จะถูกเรียกเมื่อข้อความค้นหาเปลี่ยน
 */
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative mb-8 w-full max-w-lg mx-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" size={20} />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="
          w-full
          py-3
          pl-10
          pr-4
          rounded-xl
          shadow-md
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          bg-white
          text-gray-900
          dark:bg-gray-700
          dark:text-white
          placeholder-gray-500
          dark:placeholder-gray-300
          transition-colors
        "
        aria-label="Search" 
      />
    </div>
  );
};

export default SearchBar;

