import React from "react";

const impactColors = {
  critical: "bg-red-200 border-red-500",
  serious: "bg-orange-200 border-orange-500",
  moderate: "bg-yellow-200 border-yellow-500",
  minor: "bg-green-200 border-green-500",
};

const Results = ({ results }) => {
  if (!results) return null;

  const downloadReport = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "accessibility_report.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Scan Results for {results.url}</h2>
      <p className="mb-4">
        Total Issues Found: <strong>{results.issues}</strong>
      </p>

      {/* ✅ Button */}
      <button
        onClick={downloadReport}
        className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 mt-4"
      >
        📥 Download Report
      </button>

      {/* ✅ Safe check added here */}
      {Array.isArray(results.violations) &&
        results.violations.map((v, idx) => (
          <div
            key={idx}
            className={`border-l-4 p-4 rounded shadow ${
              impactColors[v.impact] || "bg-gray-100 border-gray-300"
            }`}
          >
            <h3 className="font-semibold text-lg">{v.description}</h3>
            <p className="font-medium">
              Impact: <span className="capitalize">{v.impact}</span>
            </p>
            <p>
              Help:{" "}
              <a
                href={v.helpUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Click here
              </a>
            </p>
            <p className="mt-2 text-sm">
              <strong>HTML affected:</strong> {v.nodes[0]?.html}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Results;
