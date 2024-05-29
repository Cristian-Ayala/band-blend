import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { esES } from "@mui/x-date-pickers/locales";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { useEffect, useRef, useState } from "react";

interface ScrollDialogProps {
  open: boolean;
  setOpen: (stateProp: boolean) => void;
}

interface SongObj {
  id: number | null;
  title: string;
  artist: string;
  album: string;
  release_date: Dayjs | null;
  genre: string;
  duration: string | null;
  desc: string;
  lyrics: string;
  play_count: number;
}

export default function AddEditSong({ open, setOpen }: ScrollDialogProps) {
  const descriptionElementRef = useRef<HTMLElement>(null);
  const initialSongObj: SongObj = {
    id: null,
    title: "",
    artist: "",
    album: "",
    release_date: dayjs(new Date()),
    genre: "",
    duration: "",
    desc: "",
    lyrics: "",
    play_count: 0,
  };
  const [songObj, setSongObj] = useState<SongObj>(initialSongObj);

  const [validateEvent, setValidateEvent] = useState({
    title: true,
    artist: true,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isTitleValid = songObj.title?.trim() !== "";
    const isArtistValid = songObj.artist?.trim() !== "";

    setValidateEvent({
      title: !isTitleValid,
      artist: !isArtistValid,
    });

    setIsFormValid(isTitleValid && isArtistValid);
  }, [songObj]);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setSongObj(initialSongObj);
  };

  const songComponent = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          error={validateEvent.title}
          fullWidth
          id="song_name"
          label="Nombre de la canción"
          value={songObj.title}
          onChange={(e) => setSongObj({ ...songObj, title: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={validateEvent.artist}
          fullWidth
          id="song_name"
          label="Nombre del artista"
          value={songObj.artist}
          onChange={(e) => setSongObj({ ...songObj, artist: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="song_album"
          label="Album"
          value={songObj.album}
          onChange={(e) => setSongObj({ ...songObj, album: e.target.value })}
        />
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="es"
          localeText={
            esES.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <MobileDatePicker
            label="Fecha de lanzamiento"
            value={songObj.release_date}
            format="DD/MM/YYYY"
            onChange={(newValue) =>
              setSongObj({ ...songObj, release_date: newValue })
            }
            className="w-full"
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="song_duration"
          label="Duración"
          value={songObj.duration}
          onChange={(e) => setSongObj({ ...songObj, duration: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="song_genre"
          label="Género"
          value={songObj.genre}
          onChange={(e) => setSongObj({ ...songObj, genre: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="description_song"
          label="Descripción"
          value={songObj.desc}
          onChange={(e) => setSongObj({ ...songObj, desc: e.target.value })}
        />
      </Grid>
    </Grid>
  );

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
          {songObj.id ? "Editar" : "Agregar"} evento
        </DialogTitle>
        <DialogContent dividers={true}>
          <Box sx={{ width: "100%" }}>{songComponent}</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose} disabled={!isFormValid}>
            {songObj.id ? "Editar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
