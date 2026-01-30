import { type ReactNode } from "react";
import type { DropdownOption } from "../../types/types";
import { useDropdownLogic } from "../../hooks/useDropdownLogic";

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
  const {
    containerRef,
    selected,
    isOpen,
    setIsOpen,
    query,
    setQuery,
    filteredOptions,
  } = useDropdownLogic({
    value,
    options,
    searchFunction,
    enableDebounce,
  });

  const handleBlur = () => {
    setTimeout(() => {
      if (
        containerRef.current &&
        !containerRef.current.contains(document.activeElement)
      ) {
        setIsOpen(false);
      }
    }, 0);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="relative inline-block w-64"
      ref={containerRef}
      tabIndex={0}
      onFocus={() => setIsOpen(true)}
      onBlur={handleBlur}
    >
      <button
        onMouseDown={handleMouseDown}
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
