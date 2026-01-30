import { useState } from "react";
import { CustomDropdown } from "./components/CustomDropdown/CustomDropdown";
import type { City, Fruit } from "./types/types";
import { cityOptions, fruitOptions } from "./constants/options";

function App() {
  const [city, setCity] = useState<City | undefined>(undefined);
  const [fruit, setFruit] = useState<Fruit | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<number | undefined>(1);

  const asyncSearch = async (query: string) => {
    await new Promise((res) => setTimeout(res, 300));
    return fruitOptions.filter((fruit) =>
      fruit.label.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <div className="min-h-screen flex gap-4 items-center justify-center bg-gray-50 p-4">
      <CustomDropdown
        options={cityOptions}
        value={city}
        onChange={setCity}
        placeholder="Оберіть ваше місто"
      />

      <CustomDropdown
        options={fruitOptions}
        value={fruit}
        onChange={setFruit}
        placeholder="Оберіть фрукт"
        searchFunction={asyncSearch}
        enableDebounce={true}
      />

      <CustomDropdown
        options={[
          { label: "Item 1", value: 1 },
          { label: "Item 2", value: 2 },
          { label: "Item 3", value: 3 },
        ]}
        value={selectedId}
        onChange={setSelectedId}
        renderOption={(o) => <span className="font-medium">{o.label}</span>}
        renderSelected={(o) => (
          <strong className="text-blue-500">{o.label}</strong>
        )}
      />
    </div>
  );
}

export default App;
