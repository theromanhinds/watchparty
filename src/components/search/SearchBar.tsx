import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'md' | 'lg';
}

export function SearchBar({ value, onChange, placeholder = 'Search venues, cities, or events…', className, size = 'md' }: SearchBarProps) {
  return (
    <div className={cn('relative', className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={size === 'lg' ? 20 : 16}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-xl border border-gray-300 bg-white pr-4 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20',
          size === 'lg' ? 'pl-12 py-4 text-base' : 'pl-9 py-2.5 text-sm'
        )}
        aria-label="Search watch party venues"
      />
    </div>
  );
}
