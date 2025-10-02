import React from "react";

const hairstyleOptions = [
  "afro hairstyle",
  "bob cut hairstyle",
  "bowl cut hairstyle",
  "braid hairstyle",
  "caesar cut hairstyle",
  "chignon hairstyle",
  "cornrows hairstyle",
  "crew cut hairstyle",
  "crown braid hairstyle",
  "curtained hair hairstyle",
  "dido flip hairstyle",
  "dreadlocks hairstyle",
  "extensions hairstyle",
  "fade hairstyle",
  "fauxhawk hairstyle",
  "finger waves hairstyle",
  "french braid hairstyle",
  "frosted tips hairstyle",
  "full crown hairstyle",
  "harvard clip hairstyle",
  "hi-top fade hairstyle",
  "high and tight hairstyle",
  "hime cut hairstyle",
  "jewfro hairstyle",
  "jheri curl hairstyle",
  "liberty spikes hairstyle",
  "marcel waves hairstyle",
  "mohawk hairstyle",
  "pageboy hairstyle",
  "perm hairstyle",
  "pixie cut hairstyle",
  "psychobilly wedge hairstyle",
  "quiff hairstyle",
  "regular taper cut hairstyle",
  "ringlets hairstyle",
  "shingle bob hairstyle",
  "short hair hairstyle",
  "slicked-back hairstyle",
  "spiky hair hairstyle",
  "surfer hair hairstyle",
  "taper cut hairstyle",
  "the rachel hairstyle",
  "undercut hairstyle",
  "updo hairstyle",
];

export const HairstyleSelect = ({
  value,
  onChange,
}) => {
  return (
    <select
      id="hairstyle_description"
      name="hairstyle_description"
      className="w-full border focus:outline-none focus:ring rounded-none p-2 border-r8-gray-12 bg-white dark:bg-r8-gray-1 disabled:cursor-not-allowed disabled:opacity-50"
      value={value}
      onChange={onChange}
      style={{ color: "black"}}
    >
      {hairstyleOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
