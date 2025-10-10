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
   const [gender, setGender] = useState("");

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
        imageUrl: file,
        haircut: style,
        hairColor: color,
        gender: gender
      }),
    });

    const data = await res.json();
    console.log("backend response:", data);

    const images = [];
    if (data.images?.outputUrl) {
      images.push(data.images?.outputUrl);
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
            onChange={(e) => {
              if (e.target.name === "haircut") setStyle(e.target.value);
              if (e.target.name === "gender") setGender(e.target.value);
            }}
          />
        </div>

        {/* Color Picker */}
          <div className="mt-6">
            <label className="block mb-2">Pick Hair Color:</label>
            <select
              id="hair_color"
              name="hair_color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full border focus:outline-none focus:ring rounded p-2 bg-white text-black dark:bg-r8-gray-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="No change">No change</option>
              <option value="Random">Random</option>
              <option value="Blonde">Blonde</option>
              <option value="Brunette">Brunette</option>
              <option value="Black">Black</option>
              <option value="Dark Brown">Dark Brown</option>
              <option value="Medium Brown">Medium Brown</option>
              <option value="Light Brown">Light Brown</option>
              <option value="Auburn">Auburn</option>
              <option value="Copper">Copper</option>
              <option value="Red">Red</option>
              <option value="Strawberry Blonde">Strawberry Blonde</option>
              <option value="Platinum Blonde">Platinum Blonde</option>
              <option value="Silver">Silver</option>
              <option value="White">White</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
              <option value="Pink">Pink</option>
              <option value="Green">Green</option>
              <option value="Blue-Black">Blue-Black</option>
              <option value="Golden Blonde">Golden Blonde</option>
              <option value="Honey Blonde">Honey Blonde</option>
              <option value="Caramel">Caramel</option>
              <option value="Chestnut">Chestnut</option>
              <option value="Mahogany">Mahogany</option>
              <option value="Burgundy">Burgundy</option>
              <option value="Jet Black">Jet Black</option>
              <option value="Ash Brown">Ash Brown</option>
              <option value="Ash Blonde">Ash Blonde</option>
              <option value="Titanium">Titanium</option>
              <option value="Rose Gold">Rose Gold</option>
            </select>
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
