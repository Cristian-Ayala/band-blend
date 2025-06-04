import React from "react";
import { SongSection } from "../../types/song";
import ChordLine from "./ChordLine";

interface SongPreviewProps {
  songData: SongSection[];
  showChords: boolean;
}

const SongPreview: React.FC<SongPreviewProps> = ({ songData, showChords }) => {
  const processLinesWithChords = (text: string) => {
    return text.split("\n").map((line) => {
      const hasChords = /\[([^\]]+)\]/.test(line);
      return { line, hasChords };
    });
  };

  const getSectionBgColor = (section: SongSection) => {
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
  };

  const getSectionLabel = (type: SongSection["type"]) => {
    switch (type) {
      case "estrofa":
        return "Estrofa";
      case "coro":
        return "Coro";
      case "puente":
        return "Puente";
      case "instrumental":
        return "Instrumental";
      case "otro":
        return "Otro";
      default:
        return "Sección";
    }
  };

  const getSectionNumber = (section: SongSection, index: number) => {
    if (section.number) {
      return section.number;
    }
    return songData.slice(0, index + 1).filter((s) => s.type === section.type)
      .length;
  };

  return (
    <div className="song-preview mt-4 border border-gray-700 rounded-lg p-3 bg-gray-800">
      {songData.map((section, index) => (
        <div
          key={section.id}
          className={`p-3 mb-3 rounded-lg transition-colors duration-200 ${getSectionBgColor(
            section,
          )}`}
        >
          <div className="text-sm font-medium text-gray-400 mb-2">
            {getSectionLabel(section.type)} {getSectionNumber(section, index)}
          </div>

          {section.content.trim() && (
            <div className="text-gray-200 text-sm">
              {processLinesWithChords(section.content).map((lineInfo, idx) => {
                if (lineInfo.hasChords && showChords) {
                  return <ChordLine key={idx} line={lineInfo.line} />;
                } else if (lineInfo.hasChords && !showChords) {
                  return (
                    <div key={idx} className="chord-font whitespace-pre">
                      {lineInfo.line.replace(/\[([^\]]+)\]/g, "")}
                    </div>
                  );
                } else {
                  return (
                    <div key={idx} className="chord-font whitespace-pre">
                      {lineInfo.line}
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      ))}

      {songData.length === 0 && (
        <div className="text-center p-4 text-gray-400 text-sm">
          No hay secciones para mostrar. Agrega una sección para comenzar.
        </div>
      )}
    </div>
  );
};

export default SongPreview;
