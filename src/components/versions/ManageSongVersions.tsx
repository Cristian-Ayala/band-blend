import Empty from "@/components/common/Empty";
import { SongVersionObj } from "@/components/events/AddEditEvents";
import { SongObj } from "@/components/songs/AddEditSong";
import SongVerionList from "@/components/versions/SongVersionList";
import { DELETE_SONG_VERSION } from "@/store/graphql/mutations/songs";
import { GET_SONG_VERSIONS } from "@/store/graphql/queries/songs";
import { useMutation, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useState } from "react";
import SongEditor from "./SongEditor";

interface ScrollDialogProps {
  open: boolean;
  setOpen: (stateProp: boolean) => void;
  refetchSongs: () => void;
  selectedSong: SongObj;
}

function ConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
  songVersion,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  songVersion: SongVersionObj | null;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>¿Eliminar versión?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar la versión{" "}
          <b>{songVersion?.version_name || "Sin nombre"}</b>? Esta acción no se
          puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="error" onClick={onConfirm} variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ManageSongVersions({
  open,
  setOpen,
  selectedSong,
}: ScrollDialogProps) {
  const [deleteSongVerMutation] = useMutation(DELETE_SONG_VERSION);

  const [openSongVerEditor, setOpenSongVerEditor] = useState(false);
  const [selectedVer, setSelectedVer] = useState({} as SongVersionObj);

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [verToDelete, setVerToDelete] = useState<SongVersionObj | null>(null);

  const { data: songsVerRes, refetch: refetchSongVersions } = useQuery(
    GET_SONG_VERSIONS,
    {
      skip: !open,
      variables: { song_id: selectedSong.id },
    },
  );

  const handleClose = () => {
    setOpen(false);
  };

  const createSongVersion = () => {
    setSelectedVer({} as SongVersionObj);
    setOpenSongVerEditor(true);
  };

  const deleteSongVersion = useCallback(async () => {
    if (verToDelete) {
      await deleteSongVerMutation({
        variables: {
          id: verToDelete.id,
        },
      });
      refetchSongVersions();
      setVerToDelete(null);
      setOpenConfirmDelete(false);
    }
  }, [verToDelete, deleteSongVerMutation, refetchSongVersions]);

  const handleSongVerSelection = (
    songVersion: SongVersionObj,
    openEditDialog: boolean,
  ): void => {
    if (openEditDialog) {
      setSelectedVer(songVersion);
      setOpenSongVerEditor(true);
    } else {
      setVerToDelete(songVersion);
      setOpenConfirmDelete(true);
    }
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          VERSIONES DE "{selectedSong.title}"
        </DialogTitle>
        <DialogContent dividers={true}>
          <Box sx={{ width: "100%" }}>
            {songsVerRes?.song_versions &&
            songsVerRes.song_versions.length > 0 ? (
              songsVerRes.song_versions.map((songVersion: SongVersionObj) => (
                <SongVerionList
                  key={songVersion.id}
                  songVersion={songVersion}
                  handleSongVerSelection={handleSongVerSelection}
                />
              ))
            ) : (
              <Empty message="No hay versiones para mostrar." />
            )}
          </Box>
        </DialogContent>
        <DialogActions className="dialog-actions" sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
            <Button variant="contained" onClick={handleClose} sx={{ flex: 1 }}>
              Cerrar
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={createSongVersion}
              sx={{ flex: 1 }}
            >
              Crear Versión
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <SongEditor
        open={openSongVerEditor}
        onClose={() => setOpenSongVerEditor(false)}
        selectedSong={selectedSong}
        refetchSongVersions={refetchSongVersions}
        selectedVer={selectedVer}
      />
      <ConfirmDeleteDialog
        open={openConfirmDelete}
        onClose={() => {
          setOpenConfirmDelete(false);
          setVerToDelete(null);
        }}
        onConfirm={deleteSongVersion}
        songVersion={verToDelete}
      />
    </>
  );
}
