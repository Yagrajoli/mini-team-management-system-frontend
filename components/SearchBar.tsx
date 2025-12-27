import { memo } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = memo<SearchBarProps>(({ value, onChange }) => (
  <div className="relative w-full max-w-md group">
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
    <input
      type="text"
      placeholder="Search team members..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-12 pr-10 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-gray-400"
    />
    {value && (
      <button
        aria-label="Clear search"
        onClick={() => onChange('')}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-4 cursor-pointer h-4 text-gray-400 hover:text-gray-600" />
      </button>
    )}
  </div>
));
