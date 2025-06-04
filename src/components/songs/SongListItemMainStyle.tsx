import { SongVersionObj } from "@/components/events/AddEditEvents";
import { SongObjExtended } from "@/components/songs/SearchSongs.tsx";
import { MemberObj } from "@/pages/members/MembersIndex";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import SpatialAudioOffRoundedIcon from "@mui/icons-material/SpatialAudioOffRounded";
import { useState } from "react";
import SongPreviewModal from "../versions/SongPreviewModal";

// Opciones para el formateo
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function SongListItemMainStyle({
  song,
  hideOptions,
  handleSongSelection,
  memberSel,
  songVersion,
}: {
  song: SongObjExtended;
  hideOptions?: boolean;
  handleSongSelection: (song: SongObjExtended, openEditDialog: number) => void;
  memberSel?: MemberObj;
  songVersion?: SongVersionObj;
}) {
  const [openPreview, setOpenPreview] = useState(false);

  return (
    <>
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm"
        data-v0-t="card"
        key={song.id}
        onClick={() => {
          if (hideOptions) setOpenPreview(true);
        }}
        style={{ cursor: hideOptions ? "pointer" : undefined }}
      >
        <div className="p-3 grid gap-4">
          <div className="flex items-center justify-between">
            <div className="grid gap-1">
              <h3 className="text-lg font-semibold text-gray-50">
                {song.title}
              </h3>
              {memberSel != null && memberSel?.id && (
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <SpatialAudioOffRoundedIcon></SpatialAudioOffRoundedIcon>{" "}
                  {memberSel.first_name} {memberSel.last_name}
                </p>
              )}
              <p className="text-sm text-gray-400">
                {songVersion?.version_name || song.artist}
              </p>
              {!hideOptions && (
                <p className="text-sm text-gray-400">
                  Última vez tocada:{" "}
                  {song.last_time_played
                    ? new Date(song.last_time_played).toLocaleDateString(
                        "es-ES",
                        options,
                      )
                    : "Nunca tocada"}
                </p>
              )}

              {hideOptions ? null : (
                <p className="text-sm text-gray-400">
                  Veces que se ha tocado: {song.play_count}
                </p>
              )}
            </div>
            {hideOptions ? null : (
              <div className="flex flex-col items-center gap-2">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                  onClick={() => handleSongSelection(song, 0)}
                >
                  <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
                </button>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                  onClick={() => handleSongSelection(song, 1)}
                >
                  <ArticleIcon className="h-4 w-4" />
                </button>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                  onClick={() => handleSongSelection(song, 2)}
                >
                  <DeleteRoundedIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <SongPreviewModal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        selectedSong={song}
        songVersionId={songVersion?.id ?? 0}
      />
    </>
  );
}
