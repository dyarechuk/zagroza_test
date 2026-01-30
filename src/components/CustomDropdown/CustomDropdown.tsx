import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import type { DropdownOption } from "../../types/types";

type DropdownProps<T> = {
  value?: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  renderOption?: (option: DropdownOption<T>) => ReactNode;
  renderSelected?: (option: DropdownOption<T>) => ReactNode;
  searchFunction?: (
    query: string,
  ) => Promise<DropdownOption<T>[]> | DropdownOption<T>[];
  enableDebounce?: boolean;
};

export function CustomDropdown<T>({
  value,
  options,
  onChange,
  placeholder = "Оберіть елемент",
  renderOption,
  renderSelected,
  searchFunction,
  enableDebounce = false,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const [filteredOptions, setFilteredOptions] =
    useState<DropdownOption<T>[]>(options);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const closeDropdown = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) closeDropdown();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [closeDropdown]);

  useEffect(() => {
    const effectiveQuery = enableDebounce ? debouncedQuery : query;

    const runSearch = async () => {
      if (searchFunction) {
        const result = await searchFunction(effectiveQuery);
        setFilteredOptions(result);
      } else {
        setFilteredOptions(
          options.filter((o) =>
            o.label.toLowerCase().includes(effectiveQuery.toLowerCase()),
          ),
        );
      }
    };

    runSearch();
  }, [debouncedQuery, query, options, searchFunction, enableDebounce]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  return (
    <div
      className="relative inline-block w-64"
      ref={containerRef}
      tabIndex={0}
      onFocus={() => setIsOpen(true)}
      onBlur={() => {
        setTimeout(() => {
          if (
            containerRef.current &&
            !containerRef.current.contains(document.activeElement)
          ) {
            setIsOpen(false);
          }
        }, 0);
      }}
    >
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
        className="w-full text-left px-4 py-2 bg-gray-100 rounded border border-gray-300 hover:bg-gray-200"
      >
        {selected ? renderSelected?.(selected) || selected.label : placeholder}
      </button>

      {isOpen && (
        <div className="absolute w-full mt-1 rounded border border-gray-300 bg-white shadow-md z-10">
          <input
            type="text"
            placeholder="Пошук..."
            className="w-full px-3 py-2 border-b border-gray-200 outline-none text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div>
            {filteredOptions.map((opt) => (
              <div
                key={String(opt.value)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                  setQuery("");
                }}
              >
                {renderOption?.(opt) || opt.label}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-2 text-gray-400 text-sm">
                Нічого не знайдено
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
