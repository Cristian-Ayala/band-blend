import React from "react";

interface SectionTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const sectionTypes = [
  { value: "estrofa", label: "Estrofa" },
  { value: "coro", label: "Coro" },
  { value: "puente", label: "Puente" },
  { value: "instrumental", label: "Instrumental" },
  { value: "otro", label: "Otro" },
];

const SectionTypeSelect: React.FC<SectionTypeSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <select
      className="px-2 py-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-200 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {sectionTypes.map((type) => (
        <option key={type.value} value={type.value}>
          {type.label}
        </option>
      ))}
    </select>
  );
};

export default SectionTypeSelect;
