# Custom Dropdown Component

[LIVE DEMO](https://zagroza-test-two.vercel.app/)

**Custom Dropdown Component** is a custom Dropdown component implementation according to the test task.
Built with React, TypeScript, and TailwindCSS, without using any third-party select libraries.
This component supports the render props pattern via renderOption and renderSelected for flexible UI customization.

---

## Key dropdown component props
- **renderOption** – lets you customize how each dropdown option is displayed in the list.
- **renderSelected** – defines how the selected value is shown inside the closed dropdown.
- **searchFunction** – allows you to implement custom or async search logic instead of default filtering.
- **enableDebounce** – enables debounce time before calling searchFunction (useful for API calls).

---

## Features

- Dropdown opens on click or focus (Tab key)
- Closes on:
  - repeated click;
  - losing focus;
  - clicking outside the dropdown;
  - pressing the Escape key.
- Built-in search with support for:
  - custom search logic;
  - asynchronous data fetching;
  - optional debounce behavior.
- Search input is cleared on dropdown close

---

## Tech Stack

- **Vite** – Lightning-fast development server and build tool.
- **React** – Component-based UI framework.
- **TailwindCSS** – A utility-first CSS framework that provides low-level utility classes to build custom designs without having to write custom CSS.
- **TypeScript** – Strong typing across the app.

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/dyarechuk/zagroza_test.git
cd zagroza_test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 👨‍💻 Author

This project was created by [Dmytro Yarechuk](https://github.com/Dyarechuk).
