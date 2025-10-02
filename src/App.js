import React, { useState } from "react";
import { HairstyleSelect } from "./SelectComponent";
import { motion } from "framer-motion";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [style, setStyle] = useState("afro hairstyle");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGenerate = async () => {
    if (!file) return;
    setLoading(true);

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const imageBase64 = await toBase64(file);

    const res = await fetch("https://hair-style-back-end-production.up.railway.app/hairstyle/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: imageBase64,
        styleDescription: style,
        color,
      }),
    });

    const data = await res.json();
    console.log("backend response:", data);

    // ✅ Collect images from backend response
    const images = [];
    if (data.images.replicateUrls && Array.isArray(data.images.replicateUrls)) {
      images.push(...data.images.replicateUrls);
    }
    // if (data.localUrl) {
    //   images.push(data.images.localUrl);
    // }

    console.log("images", images);


    setResults(images);
    setLoading(false);

    console.log("results:", results);

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-700 flex items-center justify-center p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-3xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          💇 AI Hairstyle Preview
        </h1>

        {/* Upload Photo */}
        <div className="flex flex-col items-center">
          <p className="mb-2">Upload Your Photo</p>
          {preview ? (
            <img src={preview} className="rounded-xl max-h-60" alt="user" />
          ) : (
            <label className="border-2 border-dashed rounded-xl p-6 w-full text-center cursor-pointer hover:bg-white/20 transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              📸 Upload Photo
            </label>
          )}
        </div>

        {/* Style Selector */}
        <div className="mt-6">
          <label className="block mb-2">Choose Hairstyle:</label>
          <HairstyleSelect
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          />
        </div>

        {/* Color Picker */}
        <div className="mt-6">
          <label className="block mb-2">Pick Hair Color:</label>
          <input
            type="text"
            placeholder="Enter color like red, black, purple..."
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="p-4 h-10 cursor-pointer rounded"
            style={{ color: "black" }}
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-lg px-6 py-3 rounded-xl shadow-md"
          >
            {loading ? "⏳ Processing..." : "✨ Apply Hairstyle"}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="cmt-6" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            {results.map((url, i) => (
              <img
                key={i}
                src={url}
                className="rounded-xl shadow-lg"
                alt={`result-${i}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
