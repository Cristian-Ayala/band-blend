import { SongObjExtended } from "@/components/songs/SearchSongs.tsx";
import { GET_SONG_VERSIONS } from "@/store/graphql/queries/songs";
import { useQuery } from "@apollo/client";
import CloseIcon from "@mui/icons-material/Close";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { SongData } from "../../types/song";
import SongPreview from "./SongPreview";

interface SongPreviewModalProps {
  open: boolean;
  onClose: () => void;
  selectedSong: SongObjExtended;
  songVersionId: number;
}

const SongPreviewModal: React.FC<SongPreviewModalProps> = ({
  open,
  onClose,
  selectedSong,
  songVersionId,
}) => {
  const { data: songsVerRes } = useQuery(GET_SONG_VERSIONS, {
    skip: songVersionId === 0 || !open,
    variables: { song_id: selectedSong.id, version_id: songVersionId },
  });

  // Estado para la versión y los datos de la canción
  const [versionName, setVersionName] = useState("");
  const [songData, setSongData] = useState<SongData | null>(null);
  const [showChords, setShowChords] = useState(true);

  useEffect(() => {
    if (
      !songsVerRes ||
      !songsVerRes.song_versions ||
      !Array.isArray(songsVerRes.song_versions) ||
      songsVerRes.song_versions.length === 0
    )
      return;
    const firstVersion = songsVerRes.song_versions[0];
    setVersionName(firstVersion.version_name || "");
    try {
      const sections = JSON.parse(firstVersion.lyrics ?? "[]");
      setSongData(sections);
    } catch {
      setSongData([]);
    }
  }, [songsVerRes]);

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <div className="bg-gray-900 p-4 relative rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            {selectedSong.title} - {versionName}
          </h2>
          <div className="flex items-center gap-2">
            <IconButton
              aria-label="toggle-chords"
              onClick={() => setShowChords((prev) => !prev)}
              size="large"
            >
              {showChords ? (
                <MusicNoteIcon className="text-white" />
              ) : (
                <MusicOffIcon className="text-white" />
              )}
            </IconButton>
            <IconButton aria-label="close" onClick={onClose} size="large">
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        {songData && (
          <SongPreview songData={songData} showChords={showChords} />
        )}
      </div>
    </Dialog>
  );
};

export default SongPreviewModal;
