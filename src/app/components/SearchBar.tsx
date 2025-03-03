"use client";
import { useState } from "react";
import { Search } from "lucide-react";
interface SearchBarProps {
  onSearch: (city: string) => void;
}
const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a city name..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 
                   focus:outline-none focus:border-gray-300 search-input
                   glass shadow-sm"
        />
        <Search className="absolute left-4 top-3.5 text-gray-400 h-5 w-5" />
        <button
          type="submit"
          className="absolute right-3 top-2 px-4 py-1.5 rounded-md
                   bg-gray-900 text-white text-sm font-medium
                   hover:bg-gray-800 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};
export default SearchBar;