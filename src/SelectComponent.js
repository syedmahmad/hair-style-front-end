import React, { useState } from "react";

const hairstyleOptions = [
  // Unisex
  { title: "afro hairstyle (unisex)", value: "afro hairstyle" },
  { title: "bowl cut hairstyle (unisex)", value: "bowl cut hairstyle" },
  { title: "cornrows hairstyle (unisex)", value: "cornrows hairstyle" },
  { title: "dreadlocks hairstyle (unisex)", value: "dreadlocks hairstyle" },

  // Men
  { title: "caesar cut hairstyle (men)", value: "caesar cut hairstyle" },
  { title: "crew cut hairstyle (men)", value: "crew cut hairstyle" },
  { title: "curtained hair hairstyle (men)", value: "curtained hair hairstyle" },
  { title: "fade hairstyle (men)", value: "fade hairstyle" },
  { title: "fauxhawk hairstyle (men)", value: "fauxhawk hairstyle" },
  { title: "frosted tips hairstyle (men)", value: "frosted tips hairstyle" },
  { title: "harvard clip hairstyle (men)", value: "harvard clip hairstyle" },
  { title: "hi-top fade hairstyle (men)", value: "hi-top fade hairstyle" },
  { title: "high and tight hairstyle (men)", value: "high and tight hairstyle" },
  { title: "jewfro hairstyle (men)", value: "jewfro hairstyle" },
  { title: "jheri curl hairstyle (men)", value: "jheri curl hairstyle" },
  { title: "liberty spikes hairstyle (men)", value: "liberty spikes hairstyle" },
  { title: "mohawk hairstyle (men)", value: "mohawk hairstyle" },
  { title: "psychobilly wedge hairstyle (men)", value: "psychobilly wedge hairstyle" },
  { title: "quiff hairstyle (men)", value: "quiff hairstyle" },
  { title: "regular taper cut hairstyle (men)", value: "regular taper cut hairstyle" },
  { title: "slicked-back hairstyle (men)", value: "slicked-back hairstyle" },
  { title: "spiky hair hairstyle (men)", value: "spiky hair hairstyle" },
  { title: "surfer hair hairstyle (men)", value: "surfer hair hairstyle" },
  { title: "taper cut hairstyle (men)", value: "taper cut hairstyle" },
  { title: "undercut hairstyle (men)", value: "undercut hairstyle" },

  // Women
  { title: "bob cut hairstyle (women)", value: "bob cut hairstyle" },
  { title: "braid hairstyle (women)", value: "braid hairstyle" },
  { title: "chignon hairstyle (women)", value: "chignon hairstyle" },
  { title: "crown braid hairstyle (women)", value: "crown braid hairstyle" },
  { title: "dido flip hairstyle (women)", value: "dido flip hairstyle" },
  { title: "extensions hairstyle (women)", value: "extensions hairstyle" },
  { title: "finger waves hairstyle (women)", value: "finger waves hairstyle" },
  { title: "french braid hairstyle (women)", value: "french braid hairstyle" },
  { title: "full crown hairstyle (women)", value: "full crown hairstyle" },
  { title: "hime cut hairstyle (women)", value: "hime cut hairstyle" },
  { title: "marcel waves hairstyle (women)", value: "marcel waves hairstyle" },
  { title: "pageboy hairstyle (women)", value: "pageboy hairstyle" },
  { title: "perm hairstyle (women)", value: "perm hairstyle" },
  { title: "pixie cut hairstyle (women)", value: "pixie cut hairstyle" },
  { title: "ringlets hairstyle (women)", value: "ringlets hairstyle" },
  { title: "shingle bob hairstyle (women)", value: "shingle bob hairstyle" },
  { title: "short hair hairstyle (women)", value: "short hair hairstyle" },
  { title: "the rachel hairstyle (women)", value: "the rachel hairstyle" },
  { title: "updo hairstyle (women)", value: "updo hairstyle" },
];


export const HairstyleSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = hairstyleOptions.find((o) => o.value === value);

  const handleSelect = (val) => {
    onChange({ target: { value: val } });
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Trigger */}
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
          {hairstyleOptions.map((option) => (
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
  );
};
