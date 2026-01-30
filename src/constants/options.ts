import type { City, DropdownOption, Fruit } from "../types/types";

export const cityOptions: DropdownOption<City>[] = [
  { label: "Київ", value: "Київ" },
  { label: "Львів", value: "Львів" },
  { label: "Харків", value: "Харків" },
  { label: "Одеса", value: "Одеса" },
  { label: "Дніпро", value: "Дніпро" },
];

export const fruitOptions: DropdownOption<Fruit>[] = [
  { label: "Яблоко", value: "Яблоко" },
  { label: "Апельсин", value: "Апельсин" },
  { label: "Мандарин", value: "Мандарин" },
  { label: "Виноград", value: "Виноград" },
];
