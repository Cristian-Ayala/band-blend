import { ADD_SONG, UPDATE_SONG } from "@/store/graphql/mutations/songs";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { esES } from "@mui/x-date-pickers/locales";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { useEffect, useRef, useState } from "react";

dayjs.locale("es");

interface ScrollDialogProps {
  open: boolean;
  setOpen: (stateProp: boolean) => void;
  refetchSongs: () => void;
  selectedSong: SongObj | null;
  setSelectedSong: (song: SongObj | null) => void;
}

export interface SongObj {
  id: number | null;
  title: string;
  artist: string;
  album: number;
  release_date: Dayjs | null;
  genre: number;
  duration: string;
  desc: string;
  lyrics: string;
  play_count: number;
  last_time_played: string | null;
}

export default function AddEditSong({
  open,
  setOpen,
  refetchSongs,
  selectedSong,
  setSelectedSong,
}: ScrollDialogProps) {
  const [addSong, { loading, error }] = useMutation(ADD_SONG);
  const [
    updateSongHasura,
    { loading: updateSongLoading, error: updateSongError },
  ] = useMutation(UPDATE_SONG);

  const descriptionElementRef = useRef<HTMLElement>(null);
  const initialSongObjRef = useRef<SongObj>({
    id: null,
    title: "",
    artist: "",
    album: 0,
    release_date: dayjs(new Date()),
    genre: 0,
    duration: "",
    desc: "",
    lyrics: "",
    play_count: 0,
    last_time_played: "",
  });

  const [songObj, setSongObj] = useState<SongObj>(initialSongObjRef.current);

  useEffect(() => {
    if (selectedSong != null) {
      const updatedSong = { ...selectedSong };
      if (updatedSong.release_date != null)
        updatedSong.release_date = dayjs(selectedSong.release_date);
      setSongObj(updatedSong);
    } else {
      setSongObj(initialSongObjRef.current);
    }
  }, [selectedSong]);

  const [validateSong, setValidateSong] = useState({
    title: true,
    artist: true,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isTitleValid = songObj.title?.trim() !== "";
    const isArtistValid = songObj.artist?.trim() !== "";

    setValidateSong({
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
    setSongObj(initialSongObjRef.current);
    setSelectedSong(null);
  };

  const manageSong = () => {
    if (songObj.id != null) updateSong();
    else createSong();
    handleClose();
  };

  const createSong = async () => {
    const variables = JSON.parse(JSON.stringify(songObj));
    delete variables.id;
    variables.release_date = songObj.release_date?.toISOString();
    await addSong({ variables });
    refetchSongs();
  };

  const updateSong = async () => {
    const tmpSong = JSON.parse(JSON.stringify(songObj));
    tmpSong.release_date = songObj.release_date?.toISOString();
    delete tmpSong.__typename;
    const { id, ...songObject } = tmpSong;
    await updateSongHasura({
      variables: {
        id,
        songObject,
      },
    });
    refetchSongs();
  };

  const songComponent = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          error={validateSong.title}
          fullWidth
          id="song_name"
          label="Nombre de la canción"
          value={songObj.title ?? ""}
          onChange={(e) =>
            setSongObj({
              ...songObj,
              title: e.target.value.toLocaleUpperCase(),
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={validateSong.artist}
          fullWidth
          id="song_name"
          label="Nombre del artista"
          value={songObj.artist ?? ""}
          onChange={(e) =>
            setSongObj({
              ...songObj,
              artist: e.target.value.toLocaleUpperCase(),
            })
          }
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
          value={songObj.duration ?? ""}
          onChange={(e) => setSongObj({ ...songObj, duration: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Género</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="song_genre"
            value={songObj.genre}
            label="Género"
            onChange={(e) =>
              setSongObj({
                ...songObj,
                genre: parseInt(e.target.value as string, 10),
              })
            }
          >
            <MenuItem value={0}>Júbilo</MenuItem>
            <MenuItem value={1}>Ministración</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="description_song"
          label="Descripción"
          value={songObj.desc ?? ""}
          onChange={(e) => setSongObj({ ...songObj, desc: e.target.value })}
        />
      </Grid>
    </Grid>
  );
  if (loading || updateSongLoading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  if (updateSongError) return `Submission error! ${updateSongError.message}`;
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        aria-modal="true"
      >
        <DialogTitle id="scroll-dialog-title">
          {songObj.id ? "Editar" : "Agregar"} canción
        </DialogTitle>
        <DialogContent dividers={true}>
          <Box sx={{ width: "100%" }}>{songComponent}</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={manageSong} disabled={!isFormValid}>
            {songObj.id ? "Editar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
