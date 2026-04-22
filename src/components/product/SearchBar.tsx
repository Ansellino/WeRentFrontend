import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search..." }: any) {
  return (
    <div className="relative flex w-full items-center text-neutral-400 focus-within:text-neutral-900 transition-colors">
      <Search className="absolute left-0 h-4 w-4" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-neutral-200 py-2 pl-8 pr-4 text-sm text-neutral-900 transition-all focus:border-neutral-900 focus:outline-none placeholder:text-neutral-300 placeholder:tracking-wider placeholder:font-light"
      />
    </div>
  );
}