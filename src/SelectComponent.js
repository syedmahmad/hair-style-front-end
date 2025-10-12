import React, { useState } from "react";

const hairstyleOptions = [
  // Global options
  { title: "No change", value: "No change", gender: "unisex" },
  { title: "Random", value: "Random", gender: "unisex" },

  // ✅ Unisex hairstyles (model-supported)
  { title: "Straight", value: "Straight", gender: "unisex" },
  { title: "Wavy", value: "Wavy", gender: "unisex" },
  { title: "Curly", value: "Curly", gender: "unisex" },
  { title: "Cornrows", value: "Cornrows", gender: "unisex" },
  { title: "Dreadlocks", value: "Dreadlocks", gender: "unisex" },
  { title: "Mohawk Fade", value: "Mohawk Fade", gender: "unisex" },
  { title: "Zig-Zag Part", value: "Zig-Zag Part", gender: "unisex" },
  { title: "Tousled", value: "Tousled", gender: "unisex" },
  { title: "Feathered", value: "Feathered", gender: "unisex" },
  { title: "Razor Cut", value: "Razor Cut", gender: "unisex" },
  { title: "Layered Shag", value: "Layered Shag", gender: "unisex" },
  { title: "Choppy Layers", value: "Choppy Layers", gender: "unisex" },
  { title: "Soft Waves", value: "Soft Waves", gender: "unisex" },
  { title: "Glamorous Waves", value: "Glamorous Waves", gender: "unisex" },
  { title: "Hollywood Waves", value: "Hollywood Waves", gender: "unisex" },
  { title: "Finger Waves", value: "Finger Waves", gender: "unisex" },

  // ✅ Men hairstyles (valid only)
  { title: "Undercut", value: "Undercut", gender: "men" },
  { title: "Mohawk", value: "Mohawk", gender: "men" },
  { title: "Crew Cut", value: "Crew Cut", gender: "men" },
  { title: "Faux Hawk", value: "Faux Hawk", gender: "men" },
  { title: "Slicked Back", value: "Slicked Back", gender: "men" },
  { title: "Side-Parted", value: "Side-Parted", gender: "men" },
  { title: "Center-Parted", value: "Center-Parted", gender: "men" },

  // ✅ Women hairstyles (all from model’s valid list)
  { title: "Bob", value: "Bob", gender: "women" },
  { title: "Lob", value: "Lob", gender: "women" },
  { title: "Angled Bob", value: "Angled Bob", gender: "women" },
  { title: "A-Line Bob", value: "A-Line Bob", gender: "women" },
  { title: "Asymmetrical Bob", value: "Asymmetrical Bob", gender: "women" },
  { title: "Graduated Bob", value: "Graduated Bob", gender: "women" },
  { title: "Pixie Cut", value: "Pixie Cut", gender: "women" },
  { title: "Sideswept Pixie", value: "Sideswept Pixie", gender: "women" },
  { title: "Blunt Bangs", value: "Blunt Bangs", gender: "women" },
  { title: "Side-Swept Bangs", value: "Side-Swept Bangs", gender: "women" },
  { title: "Layered", value: "Layered", gender: "women" },
  { title: "Shag", value: "Shag", gender: "women" },
  { title: "Perm", value: "Perm", gender: "women" },
  { title: "Ombré", value: "Ombré", gender: "women" },
  { title: "Straightened", value: "Straightened", gender: "women" },
  { title: "Pigtails", value: "Pigtails", gender: "women" },
  { title: "Pageboy", value: "Pageboy", gender: "women" },
  { title: "Rollerset", value: "Rollerset", gender: "women" },
  { title: "Pin Curls", value: "Pin Curls", gender: "women" },
  { title: "Victory Rolls", value: "Victory Rolls", gender: "women" },
  { title: "Beehive", value: "Beehive", gender: "women" },
  { title: "Bouffant", value: "Bouffant", gender: "women" },
  { title: "Hair Bow", value: "Hair Bow", gender: "women" },
  { title: "Half-Up Top Knot", value: "Half-Up Top Knot", gender: "women" },
  { title: "Half-Up, Half-Down", value: "Half-Up, Half-Down", gender: "women" },
  { title: "High Ponytail", value: "High Ponytail", gender: "women" },
  { title: "Low Ponytail", value: "Low Ponytail", gender: "women" },
  { title: "Braided Ponytail", value: "Braided Ponytail", gender: "women" },
  { title: "Space Buns", value: "Space Buns", gender: "women" },
  { title: "Top Knot", value: "Top Knot", gender: "women" },
  { title: "Bantu Knots", value: "Bantu Knots", gender: "women" },
  { title: "French Braid", value: "French Braid", gender: "women" },
  { title: "Dutch Braid", value: "Dutch Braid", gender: "women" },
  { title: "Fishtail Braid", value: "Fishtail Braid", gender: "women" },
  { title: "French Fishtail Braid", value: "French Fishtail Braid", gender: "women" },
  { title: "Double Dutch Braids", value: "Double Dutch Braids", gender: "women" },
  { title: "Box Braids", value: "Box Braids", gender: "women" },
  { title: "Crochet Braids", value: "Crochet Braids", gender: "women" },
  { title: "Waterfall Braid", value: "Waterfall Braid", gender: "women" },
  { title: "Rope Braid", value: "Rope Braid", gender: "women" },
  { title: "Heart Braid", value: "Heart Braid", gender: "women" },
  { title: "Halo Braid", value: "Halo Braid", gender: "women" },
  { title: "Crown Braid", value: "Crown Braid", gender: "women" },
  { title: "Braided Crown", value: "Braided Crown", gender: "women" },
  { title: "Bubble Braid", value: "Bubble Braid", gender: "women" },
  { title: "Bubble Ponytail", value: "Bubble Ponytail", gender: "women" },
  { title: "Bohemian Braids", value: "Bohemian Braids", gender: "women" },
  { title: "Ballerina Braids", value: "Ballerina Braids", gender: "women" },
  { title: "Milkmaid Braids", value: "Milkmaid Braids", gender: "women" },
  { title: "Flat Twist", value: "Flat Twist", gender: "women" },
  { title: "Crown Twist", value: "Crown Twist", gender: "women" },
  { title: "Twist Out", value: "Twist Out", gender: "women" },
  { title: "Twisted Bun", value: "Twisted Bun", gender: "women" },
  { title: "Twisted Half-Updo", value: "Twisted Half-Updo", gender: "women" },
  { title: "Twist and Pin Updo", value: "Twist and Pin Updo", gender: "women" },
  { title: "Chignon", value: "Chignon", gender: "women" },
  { title: "Simple Chignon", value: "Simple Chignon", gender: "women" },
  { title: "Messy Chignon", value: "Messy Chignon", gender: "women" },
  { title: "French Twist", value: "French Twist", gender: "women" },
  { title: "French Twist Updo", value: "French Twist Updo", gender: "women" },
  { title: "French Roll", value: "French Roll", gender: "women" },
  { title: "Updo", value: "Updo", gender: "women" },
  { title: "Messy Updo", value: "Messy Updo", gender: "women" },
  { title: "Knotted Updo", value: "Knotted Updo", gender: "women" },
  { title: "Ballerina Bun", value: "Ballerina Bun", gender: "women" },
  { title: "Banana Clip Updo", value: "Banana Clip Updo", gender: "women" },
  { title: "Messy Bun", value: "Messy Bun", gender: "women" },
  { title: "Messy Bun with a Headband", value: "Messy Bun with a Headband", gender: "women" },
  { title: "Messy Bun with a Scarf", value: "Messy Bun with a Scarf", gender: "women" },
];


// Helper function to get the correct image path
const getImagePath = (optionValue) => {
  // Special mappings for files that don't follow the standard pattern
  const specialMappings = {
    // Files with exact name matches (spaces preserved)
    "A-Line Bob": "A-Line Bob.jpg",
    "Angled Bob": "Angled Bob.jpg", 
    "Asymmetrical Bob": "Asymmetrical Bob.jpg",
    "Ballerina Braids": "Ballerina Braids.jpg",
    "Ballerina Bun": "Ballerina Bun.jpg",
    "Banana Clip Updo": "Banana Clip Updo.jpg",
    "Bantu Knots": "Bantu Knots.jpg",
    "Beehive": "Beehive.jpg",
    "Blunt Bangs": "Blunt Bangs.jpg",
    "Bob": "Bob.jpg",
    "Bohemian Braids": "Bohemian Braids.jpg",
    "Bouffant": "Bouffant.jpg",
    "Box Braids": "Box Braids.jpg",
    "Braided Ponytail": "Braided Ponytail.jpg",
    "Bubble Braid": "Bubble Braid.jpg",
    "Bubble Ponytail": "Bubble Ponytail.jpg",
    "Center-Parted": "Center-Parted.jpg",
    "Chignon": "Chignon.jpg",
    "Choppy Layers": "Choppy Layers.jpg",
    "Cornrows": "Cornrows.jpg",
    "Crochet Braids": "Crochet Braids.jpg",
    "Crown Braid": "Crown Braid.jpg",
    "Crown Twist": "Crown Twist.jpg",
    "Curly": "Curly.jpg",
    "Double Dutch Braids": "Double Dutch Braids.jpg",
    "Dreadlocks": "Dreadlocks.jpg",
    "Dutch Braid": "Dutch Braid.jpg",
    "Faux Hawk": "FauxHawk.jpg",
    "Feathered": "Feathered.jpg",
    "Finger Waves": "Finger Waves.jpg",
    "Fishtail Braid": "Fishtail Braid.jpg",
    "Flat Twist": "Flat Twist.jpg",
    "French Braid": "French Braid.jpg",
    "French Fishtail Braid": "French Fishtail Braid.jpg",
    "French Roll": "French Roll.jpg",
    "French Twist Updo": "French Twist Updo.jpg",
    "French Twist": "French Twist.jpg",
    "Glamorous Waves": "Glamorous Waves.jpg",
    "Graduated Bob": "Graduated Bob.jpg",
    "Hair Bow": "Hair Bow.jpg",
    "Half-Up Top Knot": "Half-Up Top Knot.jpg",
    "Half-Up, Half-Down": "Half-Up, Half-Down.jpg",
    "Halo Braid": "Halo Braid.jpg",
    "Heart Braid": "Heart Braid.jpg",
    "High Ponytail": "High Ponytail.jpg",
    "Hollywood Waves": "Hollywood Waves.jpg",
    "Knotted Updo": "Knotted Updo.jpg",
    "Layered Shag": "Layered Shag.jpg",
    "Layered": "Layered.jpg",
    "Lob": "Lob.jpg",
    "Low Ponytail": "Low Ponytail.jpg",
    "Messy Bun with a Headband": "Messy Bun with a Headband.jpg",
    "Messy Bun with a Scarf": "Messy Bun with a Scarf.jpg",
    "Messy Bun": "Messy Bun.jpg",
    "Messy Chignon": "Messy Chignon.jpg",
    "Messy Updo": "Messy Updo.jpg",
    "Milkmaid Braids": "Milkmaid Braids.jpg",
    "Mohawk Fade": "Mohawk Fade.jpg",
    "Mohawk": "Mohawk.jpg",
    "Ombré": "Ombré.png", // This one is PNG, not JPG
    "Pageboy": "Pageboy.jpg",
    "Perm": "Perm.jpg",
    "Pigtails": "Pigtails.jpg",
    "Pin Curls": "Pin Curls.jpg",
    "Pixie Cut": "Pixie Cut.jpg",
    "Razor Cut": "Razor Cut.jpg",
    "Rollerset": "Rollerset.jpg",
    "Rope Braid": "Rope Braid.jpg",
    "Shag": "Shag.jpg",
    "Side-Parted": "Side-Parted.jpg",
    "Side-Swept Bangs": "Side-Swept Bangs.jpg",
    "Sideswept Pixie": "Sideswept Pixie.jpg",
    "Simple Chignon": "Simple Chignon.jpg",
    "Slicked Back": "Slicked Back.jpg",
    "Soft Waves": "Soft Waves.jpg",
    "Space Buns": "Space Buns.jpg",
    "Straight": "Straight.jpg",
    "Straightened": "Straightened.jpg",
    "Top Knot": "Top Knot.jpg",
    "Tousled": "Tousled.jpg",
    "Twist Out": "Twist Out.jpg",
    "Twisted Bun": "Twisted Bun.jpg",
    "Twisted Half-Updo": "Twisted Half-Updo.jpg",
    "Undercut": "undercut.jpg", // lowercase
    "Updo": "Updo.jpg",
    "Victory Rolls": "Victory Rolls.jpg",
    "Waterfall Braid": "Waterfall Braid.jpg",
    "Wavy": "Wavy.jpg",
    "Zig-Zag Part": "zig-zag-part.jpg" // lowercase with hyphens
  };
  
  if (specialMappings[optionValue]) {
    return `/${specialMappings[optionValue]}`;
  }
  
  // Default pattern: replace spaces with hyphens and convert to lowercase
  return `/${optionValue.replace(/\s+/g, "-").toLowerCase()}.jpg`;
};

export const HairstyleSelect = ({ value, onChange }) => {
  const [gender, setGender] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = hairstyleOptions.filter(
    (o) =>
      o.gender === gender ||
      (o.gender === "unisex" && (gender === "unisex" || gender))
  );

  const selected = hairstyleOptions.find((o) => o.value === value);

  const handleSelect = (val) => {
    onChange({ target: { name: "haircut", value: val, gender } });
    setIsOpen(false);
  };

  return (
    <div className="space-y-3">
      {/* Gender Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Gender
        </label>
        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            onChange({ target: { name: "gender", value: e.target.value } });
          }}
          className="w-full border border-gray-300 rounded-md p-2 bg-white text-black shadow-sm focus:outline-none"
        >
          <option value="">-- Select Gender --</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      {/* Hairstyle Dropdown */}
      {gender && (
        <div className="relative w-full">
          <button
            type="button"
            className="w-full flex justify-between items-center border border-gray-300 rounded-md p-2 bg-white text-black shadow-sm hover:border-gray-400 focus:outline-none"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span>{selected ? selected.title : "Select a hairstyle"}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-full max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${value === option.value ? "bg-gray-50" : ""
                    }`}
                >
                  <span className="text-sm text-gray-800">{option.title}</span>

                  <img
                    src={getImagePath(option.value)}
                    alt={option.value}
                    width={32}
                    height={32}
                    className="ml-3 rounded-sm object-cover border"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />

                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

