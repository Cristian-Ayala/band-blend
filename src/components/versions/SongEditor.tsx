import { SongVersionObj } from "@/components/events/AddEditEvents";
import { SongObj } from "@/components/songs/AddEditSong";
import { ADD_SONG_VERSION } from "@/store/graphql/mutations/songs";
import { useMutation } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { SongData, SongSection as SongSectionType } from "../../types/song";
import ImportFromTxt from "./ImportFromTxt";
import SongPreview from "./SongPreview";
import SongSection from "./SongSection";
interface SongEditorProps {
  open: boolean;
  onClose: () => void;
  selectedSong: SongObj;
  refetchSongVersions: () => void;
  selectedVer: SongVersionObj;
}

const SongEditor: React.FC<SongEditorProps> = ({
  open,
  onClose,
  selectedSong,
  refetchSongVersions,
  selectedVer,
}) => {
  const [AddSongVer] = useMutation(ADD_SONG_VERSION);

  async function addSongVersion() {
    const object: {
      song_id: number | null;
      version_name: string;
      bpm: number;
      key_note: string;
      url: string;
      lyrics: string;
      id?: number;
    } = {
      song_id: selectedSong.id,
      version_name: artist,
      bpm,
      key_note: keyNote,
      url: songUrl,
      lyrics: JSON.stringify(songData),
    };
    if (selectedVer && selectedVer.id) object.id = selectedVer.id;
    await AddSongVer({
      variables: { object },
    });
    refetchSongVersions();
    // Reset state after adding version
    setSongData([
      {
        id: "1",
        type: "estrofa",
        content: "",
      },
    ]);
    setArtist("");
    setBpm(120);
    setSongUrl("");
    onClose();
  }

  const [songData, setSongData] = React.useState<SongData>([
    {
      id: "1",
      type: "estrofa",
      content: "",
    },
  ]);

  const [showChords, setShowChords] = React.useState(true);
  const [openImportCordsFromText, setOpenImportCordsFromText] =
    React.useState(false);
  const [bpm, setBpm] = React.useState(120);
  const [keyNote, setKeyNote] = React.useState("");
  const [songUrl, setSongUrl] = React.useState("");
  const [artist, setArtist] = React.useState("");

  const addSection = () => {
    setSongData((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "estrofa",
        content: "",
      },
    ]);
  };

  const updateSection = (index: number, updatedSection: SongSectionType) => {
    setSongData((prev) => {
      const newData = [...prev];
      newData[index] = updatedSection;
      return newData;
    });
  };

  const deleteSection = (index: number) => {
    setSongData((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleChords = () => {
    setShowChords((prev) => !prev);
  };

  // watch changes selectedVer
  React.useEffect(() => {
    if (selectedVer) {
      setArtist(selectedVer.version_name ?? "");
      setBpm(selectedVer.bpm ?? 120);
      setKeyNote(selectedVer.key_note ?? "");
      setSongUrl(selectedVer.url ?? "");
      try {
        const parsedData = JSON.parse(selectedVer.lyrics ?? "[]");
        if (Array.isArray(parsedData)) {
          setSongData(parsedData);
        } else {
          setSongData([]);
        }
      } catch {
        setSongData([]);
      }
    }
  }, [selectedVer]);

  // Utilidad para transformar secciones importadas
  const normalizeSectionType = (type: string): SongSectionType["type"] => {
    const normalized = type.trim().toLowerCase();
    switch (normalized) {
      case "estrofa":
      case "verse":
        return "estrofa";
      case "coro":
      case "estribillo":
      case "chorus":
        return "coro";
      case "puente":
      case "bridge":
        return "puente";
      case "instrumental":
        return "instrumental";
      default:
        return "otro";
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullScreen>
        <div
          className="
        song-editor
        w-full
        mx-auto p-4 relative
        bg-gray-900
        flex flex-col
        sm:rounded-lg
        sm:my-8
      "
        >
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
              Editor de Canciones con Acordes
            </h1>
            <IconButton aria-label="close" onClick={onClose} size="large">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label
                className="block text-gray-300 mb-1"
                htmlFor="artist-input"
              >
                Artista o Banda
              </label>
              <input
                id="artist-input"
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value.toUpperCase())}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del artista o banda"
              />
            </div>
            <div className="flex flex-1 gap-2">
              <div className="flex-1">
                <label className="block text-gray-300 mb-1" htmlFor="bpm-input">
                  BPM
                </label>
                <input
                  id="bpm-input"
                  type="number"
                  min={0}
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ej: 120"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-300 mb-1" htmlFor="key-input">
                  Escala
                </label>
                <input
                  id="key-input"
                  type="text"
                  value={keyNote}
                  onChange={(e) => setKeyNote(e.target.value.toUpperCase())}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ej: A, Am, C, Dm, etc."
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-gray-300 mb-1" htmlFor="url-input">
                URL de YouTube o Spotify
              </label>
              <input
                id="url-input"
                type="url"
                value={songUrl}
                onChange={(e) => setSongUrl(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Pega aquí el enlace de YouTube o Spotify"
              />
            </div>
          </div>
          <div className="mb-4 sm:mb-6 flex-1">
            {songData.length === 0 && (
              <div className="text-center p-8 border rounded-lg bg-gray-800 text-gray-300">
                No hay secciones. Haz clic en "Agregar Sección" para comenzar.
              </div>
            )}

            {songData.map((section, index) => (
              <SongSection
                key={section.id}
                section={section}
                index={index}
                onUpdate={(updatedSection) =>
                  updateSection(index, updatedSection)
                }
                onDelete={() => deleteSection(index)}
              />
            ))}
          </div>
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex flex-col w-full gap-2">
              <button
                onClick={addSection}
                className="p-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
              >
                <AddIcon />
                Agregar Sección
              </button>

              <button
                onClick={toggleChords}
                className="p-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
              >
                {showChords ? (
                  <>
                    <VisibilityIcon /> Ocultar Acordes
                  </>
                ) : (
                  <>
                    <VisibilityOffIcon /> Mostrar Acordes
                  </>
                )}
              </button>

              <button
                onClick={() => setOpenImportCordsFromText(true)}
                className="p-1 bg-orange-400 text-slate-700 rounded hover:bg-orange-500 transition-colors duration-200"
              >
                <AudioFileIcon />
                Importar desde texto
              </button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <h2 className="text-lg font-bold mb-3 text-white">Vista Previa</h2>
            <SongPreview songData={songData} showChords={showChords} />
          </div>
        </div>
        <style>
          {`
        @media (max-width: 400px) {
          .song-editor {
            padding: 8px !important;
          }
          .song-editor h1 {
            font-size: 1.1rem !important;
          }
        }
      `}
        </style>
        <div className="flex flex-col sm:flex-row w-full gap-2 p-4 bg-gray-800">
          {selectedVer && selectedVer.id != null ? (
            <button
              onClick={addSongVersion}
              className="flex-1 w-full px-4 py-2 bg-orange-400 text-slate-700 rounded hover:bg-orange-500 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <EditIcon />
              Editar Versión
            </button>
          ) : (
            <button
              onClick={addSongVersion}
              className="flex-1 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <AddIcon />
              Agregar Versión
            </button>
          )}
        </div>
      </Dialog>
      <ImportFromTxt
        open={openImportCordsFromText}
        onClose={() => setOpenImportCordsFromText(false)}
        onImportChrodsFromText={(sections) =>
          setSongData(
            sections
              .filter(
                (section) => section.content && section.content.trim() !== "",
              )
              .map((section) => ({
                id: section.id,
                type: normalizeSectionType(section.type),
                content: section.content,
                number: section.number || 1,
              })),
          )
        }
      />
    </>
  );
};

export default SongEditor;
