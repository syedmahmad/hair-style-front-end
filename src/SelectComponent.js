import React, { useState } from "react";

const hairstyleOptions = [
  // Unisex
  { title: "afro hairstyle (unisex)", value: "afro hairstyle", gender: "unisex" },
  { title: "bowl cut hairstyle (unisex)", value: "bowl cut hairstyle", gender: "unisex" },
  { title: "cornrows hairstyle (unisex)", value: "cornrows hairstyle", gender: "unisex" },
  { title: "dreadlocks hairstyle (unisex)", value: "dreadlocks hairstyle", gender: "unisex" },

  // Men
  { title: "caesar cut hairstyle (men)", value: "caesar cut hairstyle", gender: "men" },
  { title: "crew cut hairstyle (men)", value: "crew cut hairstyle", gender: "men" },
  { title: "curtained hair hairstyle (men)", value: "curtained hair hairstyle", gender: "men" },
  { title: "fade hairstyle (men)", value: "fade hairstyle", gender: "men" },
  { title: "fauxhawk hairstyle (men)", value: "fauxhawk hairstyle", gender: "men" },
  { title: "frosted tips hairstyle (men)", value: "frosted tips hairstyle", gender: "men" },
  { title: "harvard clip hairstyle (men)", value: "harvard clip hairstyle", gender: "men" },
  { title: "hi-top fade hairstyle (men)", value: "hi-top fade hairstyle", gender: "men" },
  { title: "high and tight hairstyle (men)", value: "high and tight hairstyle", gender: "men" },
  { title: "jewfro hairstyle (men)", value: "jewfro hairstyle", gender: "men" },
  { title: "jheri curl hairstyle (men)", value: "jheri curl hairstyle", gender: "men" },
  { title: "liberty spikes hairstyle (men)", value: "liberty spikes hairstyle", gender: "men" },
  { title: "mohawk hairstyle (men)", value: "mohawk hairstyle", gender: "men" },
  { title: "psychobilly wedge hairstyle (men)", value: "psychobilly wedge hairstyle", gender: "men" },
  { title: "quiff hairstyle (men)", value: "quiff hairstyle", gender: "men" },
  { title: "regular taper cut hairstyle (men)", value: "regular taper cut hairstyle", gender: "men" },
  { title: "slicked-back hairstyle (men)", value: "slicked-back hairstyle", gender: "men" },
  { title: "spiky hair hairstyle (men)", value: "spiky hair hairstyle", gender: "men" },
  { title: "surfer hair hairstyle (men)", value: "surfer hair hairstyle", gender: "men" },
  { title: "taper cut hairstyle (men)", value: "taper cut hairstyle", gender: "men" },
  { title: "undercut hairstyle (men)", value: "undercut hairstyle", gender: "men" },

  // Women
  { title: "bob cut hairstyle (women)", value: "bob cut hairstyle", gender: "women" },
  { title: "braid hairstyle (women)", value: "braid hairstyle", gender: "women" },
  { title: "chignon hairstyle (women)", value: "chignon hairstyle", gender: "women" },
  { title: "crown braid hairstyle (women)", value: "crown braid hairstyle", gender: "women" },
  { title: "dido flip hairstyle (women)", value: "dido flip hairstyle", gender: "women" },
  { title: "extensions hairstyle (women)", value: "extensions hairstyle", gender: "women" },
  { title: "finger waves hairstyle (women)", value: "finger waves hairstyle", gender: "women" },
  { title: "french braid hairstyle (women)", value: "french braid hairstyle", gender: "women" },
  { title: "full crown hairstyle (women)", value: "full crown hairstyle", gender: "women" },
  { title: "hime cut hairstyle (women)", value: "hime cut hairstyle", gender: "women" },
  { title: "marcel waves hairstyle (women)", value: "marcel waves hairstyle", gender: "women" },
  { title: "pageboy hairstyle (women)", value: "pageboy hairstyle", gender: "women" },
  { title: "perm hairstyle (women)", value: "perm hairstyle", gender: "women" },
  { title: "pixie cut hairstyle (women)", value: "pixie cut hairstyle", gender: "women" },
  { title: "ringlets hairstyle (women)", value: "ringlets hairstyle", gender: "women" },
  { title: "shingle bob hairstyle (women)", value: "shingle bob hairstyle", gender: "women" },
  { title: "short hair hairstyle (women)", value: "short hair hairstyle", gender: "women" },
  { title: "the rachel hairstyle (women)", value: "the rachel hairstyle", gender: "women" },
  { title: "updo hairstyle (women)", value: "updo hairstyle", gender: "women" },
];

export const HairstyleSelect = ({ value, onChange }) => {
  const [gender, setGender] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = hairstyleOptions.filter(
    (o) => o.gender === gender || (gender === "unisex" && o.gender === "unisex")
  );

  const selected = hairstyleOptions.find((o) => o.value === value);

  const handleSelect = (val) => {
    onChange({ target: { value: val } });
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
            onChange({ target: { value: "" } }); // reset hairstyle when gender changes
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
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
                  className={`flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                    value === option.value ? "bg-gray-50" : ""
                  }`}
                >
                  <span className="text-sm text-gray-800">{option.title}</span>
                  <img
                    src={`/${option.value.replace(/\s+/g, "-")}.jpg`}
                    alt={option.value}
                    width={32}
                    height={32}
                    className="ml-3 rounded-sm object-cover border"
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
