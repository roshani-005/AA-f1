import React, { useState } from "react";
import axios from "axios";

const ScanForm = ({ setResults, setLoading }) => {
  const [url, setUrl] = useState("");

  const handleScan = async () => {
    if (!url) return alert("Enter a URL");
    setLoading(true);
    setResults(null);

    try {
      const res = await axios.get(`http://localhost:5000/scan?url=${url}`);
      setResults(res.data);
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
