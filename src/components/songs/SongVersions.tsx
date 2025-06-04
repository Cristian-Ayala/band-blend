import { SongObjExtended } from "@/components/songs/SearchSongs.tsx";
import { GET_SONG_VERSIONS } from "@/store/graphql/queries/songs";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useCallback, useEffect, useRef, useState } from "react";

interface SongVersionsProps {
  open: boolean;
  setOpen: (stateProp: boolean) => void;
  mutateSongCollection: (
    song: SongObjExtended,
    songVerID: number | string,
    modifyVer: boolean,
    songVerName: string | null,
  ) => void;
  song: SongObjExtended;
  usedInDraggableItem?: boolean;
  songVersionObj?: SongsVersions | null;
}

export interface SongsVersions {
  id?: number;
  song_id?: number;
  version_name?: string | null;
  lyrics?: string | null;
  key_note?: string;
  created_at?: string;
  updated_at?: string;
}

export default function SongVersions({
  open,
  setOpen,
  mutateSongCollection,
  song,
  songVersionObj,
  usedInDraggableItem = false,
}: SongVersionsProps) {
  const [songVerID, setSongVerID] = useState<number | string>("");
  const [songVerName, setSongVerName] = useState<string | null>("");
  const [songHasVersions, setSongHasVersions] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleAddSongVersion = useCallback(() => {
    mutateSongCollection(song, songVerID, true, songVerName);
    handleClose();
  }, [mutateSongCollection, songVerID, songVerName, song, handleClose]);

  const { data: songsVerRes } = useQuery(GET_SONG_VERSIONS, {
    skip: !open,
    variables: { song_id: song.id },
  });

  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return; // Avoid running again
    if (!open || !Array.isArray(songsVerRes?.song_versions)) return;

    hasRunRef.current = true;

    let firstVersionId = null;
    if (songVersionObj && songVersionObj.id != null)
      firstVersionId = songVersionObj.id;
    else firstVersionId = songsVerRes.song_versions[0]?.id ?? "";
    setSongVerID(firstVersionId);

    if (songsVerRes.song_versions.length <= 1 && !usedInDraggableItem) {
      handleAddSongVersion();
    }
  }, [
    songsVerRes,
    open,
    usedInDraggableItem,
    handleAddSongVersion,
    songVersionObj,
  ]);

  useEffect(() => {
    if (Array.isArray(songsVerRes?.song_versions))
      setSongHasVersions(songsVerRes.song_versions.length > 0);
    else setSongHasVersions(false);
  }, [songsVerRes]);

  useEffect(() => {
    const songVerName =
      songsVerRes?.song_versions.find((v: SongsVersions) => v.id === songVerID)
        ?.version_name ?? null;
    setSongVerName(songVerName);
  }, [songVerID, songsVerRes]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Selecciona la versión de la canción
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ width: "100%" }}>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <span style={{ alignSelf: "center" }}>{song.title}</span>
              {songHasVersions &&
              Array.isArray(songsVerRes?.song_versions) &&
              songsVerRes.song_versions.length > 0 ? (
                <Select
                  id="song_version"
                  displayEmpty
                  value={
                    songsVerRes.song_versions.some(
                      (v: SongsVersions) => v.id === songVerID,
                    )
                      ? songVerID
                      : ""
                  }
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSongVerID(value === "" ? "" : Number(value));
                  }}
                >
                  <MenuItem value="" disabled>
                    Selecciona una versión
                  </MenuItem>
                  {songsVerRes.song_versions.map(
                    (songVersion: SongsVersions) => (
                      <MenuItem key={songVersion.id} value={songVersion.id}>
                        {songVersion.version_name ?? "Sin intérprete"}
                      </MenuItem>
                    ),
                  )}
                </Select>
              ) : (
                <span style={{ alignSelf: "center" }}>
                  No hay versiones disponibles
                </span>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {songHasVersions && (
            <Button onClick={handleAddSongVersion}>Agregar Versión</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
