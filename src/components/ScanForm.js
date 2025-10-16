import React, { useState } from "react";
import axios from "axios";

const ScanForm = ({ setResults, setLoading }) => {
  const [url, setUrl] = useState("");

  const handleScan = async () => {
    if (!url) return alert("Enter a URL");
    setLoading(true);
    setResults(null);

    try {
      // 👇 send URL to backend
      const res = await axios.get(`https://aa-backend-1.onrender.com/scan?url=${url}`);

      // 👇 make sure violations is always an array
      setResults({
        ...res.data,
        violations: res.data.violations || [],
      });
    } catch (err) {
      alert("Error scanning the website");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleScan}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Scan
      </button>
    </div>
  );
};

export default ScanForm;

