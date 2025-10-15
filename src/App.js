import React, { useState } from "react";
import ScanForm from "./components/ScanForm";
import Results from "./components/Results";

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-6 bg-gray-700 text-white px-3 py-1 rounded"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="max-w-3xl mx-auto p-4 font-sans">
        <h1 className="text-3xl font-bold text-center mb-6">Accessibility Analyzer</h1>
        <ScanForm setResults={setResults} setLoading={setLoading} />
        
        {loading && <p className="text-center text-blue-500 mt-4">Scanning... Please wait ⏳</p>}

        {loading && (
          <div className="flex justify-center mt-6">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <Results results={results} />
      </div>
    </div>
  );
}

export default App;
