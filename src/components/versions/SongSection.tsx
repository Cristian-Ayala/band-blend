import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { SongSection as SongSectionType } from "../../types/song";
import SectionTypeSelect from "./SectionTypeSelect";

interface SongSectionProps {
  section: SongSectionType;
  index: number;
  onUpdate: (section: SongSectionType) => void;
  onDelete: () => void;
}

const colorOptions = [
  { value: "", label: "Por defecto" },
  { value: "bg-gray-800", label: "Gris oscuro" },
  { value: "bg-yellow-900", label: "Amarillo oscuro" },
  { value: "bg-blue-900", label: "Azul oscuro" },
  { value: "bg-green-900", label: "Verde oscuro" },
  { value: "bg-red-900", label: "Rojo oscuro" },
  { value: "bg-purple-900", label: "Morado oscuro" },
  { value: "bg-gray-700", label: "Gris medio" },
];

const SongSection: React.FC<SongSectionProps> = ({
  section,
  index,
  onUpdate,
  onDelete,
}) => {
  const bgColorClass = React.useMemo(() => {
    if (section.color) {
      return section.color;
    }

    switch (section.type) {
      case "estrofa":
        return "bg-gray-800";
      case "coro":
        return "bg-yellow-900";
      case "puente":
        return "bg-blue-900";
      case "instrumental":
        return "bg-gray-700";
      case "otro":
        return "bg-purple-900";
      default:
        return "bg-gray-800";
    }
  }, [section.type, section.color]);

  return (
    <div
      className={`mb-4 p-3 rounded-lg border border-gray-700 transition-colors duration-200 ${bgColorClass}`}
    >
      <div className="flex flex-col sm:flex-row gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-gray-300 text-sm">
            {index + 1}.
          </span>
          <SectionTypeSelect
            value={section.type}
            onChange={(type) =>
              onUpdate({ ...section, type: type as SongSectionType["type"] })
            }
          />

          <input
            type="number"
            value={section.number || ""}
            onChange={(e) =>
              onUpdate({
                ...section,
                number: parseInt(e.target.value) || undefined,
              })
            }
            min="1"
            className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-200 text-sm"
            placeholder="#"
          />

          <select
            value={section.color || ""}
            onChange={(e) => onUpdate({ ...section, color: e.target.value })}
            className="px-2 py-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-200 text-sm"
          >
            {colorOptions.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
          <button
            onClick={onDelete}
            className="sm:ml-auto px-2 py-1 text-red-400 hover:bg-red-900/50 rounded transition-colors duration-150"
            aria-label="Eliminar sección"
          >
            <DeleteIcon />
          </button>
          <button
            onClick={() => onUpdate({ ...section, content: "" })}
            className="sm:ml-auto px-2 py-1 text-amber-400 hover:bg-amber-400/50 rounded transition-colors duration-150"
            aria-label="Eliminar sección"
          >
            <CleaningServicesIcon />
          </button>
        </div>
      </div>
      <textarea
        value={section.content}
        onChange={(e) => onUpdate({ ...section, content: e.target.value })}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md font-mono min-h-[100px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-200 text-sm"
        placeholder="Escribe letra con acordes usando [C] dentro del texto..."
      />
    </div>
  );
};

export default SongSection;
