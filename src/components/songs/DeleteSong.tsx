import { SongObj } from "@/components/songs/AddEditSong";
import { DELETE_SONG } from "@/store/graphql/mutations/songs";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface ScrollDialogProps {
  open: boolean;
  setOpen: (stateProp: boolean) => void;
  refetchSongs: () => void;
  selectedSong: SongObj;
}

export default function DeleteSong({
  open,
  setOpen,
  refetchSongs,
  selectedSong,
}: ScrollDialogProps) {
  const [deleteSongHasura, { loading, error }] = useMutation(DELETE_SONG);
  const handleClose = () => {
    setOpen(false);
  };

  const deleteSong = () => {
    deleteSongHasura({
      variables: {
        id: selectedSong.id,
      },
    });
    handleClose();
    refetchSongs();
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Eliminar canción</DialogTitle>
        <DialogContent dividers={true}>
          <Box sx={{ width: "100%" }}>
            ¿Está seguro que desea eliminar la canción {selectedSong.title}?
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => deleteSong()}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
