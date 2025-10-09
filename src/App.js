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

  // --- Helper: convert RGBA image to 3-channel RGB (JPG)
  const convertTo3ChannelRGB = async (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Draw image on canvas without alpha
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        // Fill white background (so transparent pixels become white)
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // Export as JPEG (3-channel)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const rgbFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + "_rgb.jpg", {
                type: "image/jpeg",
              });
              resolve(rgbFile);
            } else reject(new Error("Failed to convert image."));
          },
          "image/jpeg",
          0.95
        );
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      let selectedFile = e.target.files[0];
      setPreview(URL.createObjectURL(selectedFile));

      // ✅ Convert 4-channel (RGBA) to 3-channel (RGB)
      try {
        selectedFile = await convertTo3ChannelRGB(selectedFile);
      } catch (err) {
        console.error("RGB conversion failed, using original file:", err);
      }

      // ✅ Cloudinary upload
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "hairstyle_unsigned");
      formData.append("folder", "samples/ecommerce");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dblluor62/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      console.log("Cloudinary upload response:", data);

      // ✅ store Cloudinary secure_url
      setFile(data.secure_url);
    }
  };

  const handleGenerate = async () => {
    if (!file) return;
    setLoading(true);

    const res = await fetch("https://hair-style-back-end-production.up.railway.app/hairstyle/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: file,
        styleDescription: style,
        color,
      }),
    });

    const data = await res.json();
    console.log("backend response:", data);

    const images = [];
    if (data.images?.replicateUrls && Array.isArray(data.images.replicateUrls)) {
      images.push(...data.images.replicateUrls);
    }

    setResults(images);
    setLoading(false);
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
          <div
            className="mt-6 flex flex-col items-center justify-center w-full"
          >
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
