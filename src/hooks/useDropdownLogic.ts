import { useCallback, useEffect, useRef, useState } from "react";
import type { DropdownOption } from "../types/types";
import { useDebouncedValue } from "./useDebouncedValue";

export function useDropdownLogic<T>({
  value,
  options,
  searchFunction,
  enableDebounce = false,
}: {
  value?: T;
  options: DropdownOption<T>[];
  searchFunction?: (
    query: string,
  ) => Promise<DropdownOption<T>[]> | DropdownOption<T>[];
  enableDebounce?: boolean;
}) {
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
    if (!isOpen) setQuery("");
  }, [isOpen]);

  return {
    containerRef,
    selected,
    isOpen,
    setIsOpen,
    query,
    setQuery,
    filteredOptions,
  };
}
