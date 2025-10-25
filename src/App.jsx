import React, { useState, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(() => {
    // Load saved count from localStorage if available
    const savedCount = localStorage.getItem("count");
    return savedCount ? JSON.parse(savedCount) : 0;
  });

  const [inputValue, setInputValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Save count in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  // Increment and decrement with validation
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  const addCustomNumber = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num) && num > 0) setCount((prev) => prev + num);
    setInputValue("");
  };

  const reset = () => setCount(0);
  const clearSaved = () => {
    localStorage.removeItem("count");
    setCount(0);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-black" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-bold mb-6 text-red-800">COUNTER APP</h1>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center w-80 transition">
        <h2 className="text-6xl font-semibold mb-6">{count}</h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={decrement}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            −
          </button>
          <button
            onClick={increment}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            +
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter number"
            className="border p-2 rounded-lg w-full text-center"
          />
          <button
            onClick={addCustomNumber}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Add Number
          </button>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={reset}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition text-sm"
          >
            Reset
          </button>
          <button
            onClick={clearSaved}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition text-sm"
          >
            Delete Saved
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition"
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
