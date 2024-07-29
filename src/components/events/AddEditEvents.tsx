import { SongObj } from "@/components/songs/AddEditSong";
import SearchSongs from "@/components/songs/SearchSongs.tsx";
import { getTimeFromDate } from "@/plugins/helpers";
import {
  ADD_EVENT_SONG,
  CLOSE_EVENT,
  MUTATE_EVENT,
  UPDATE_ORDER_EVENT_SONG,
} from "@/store/graphql/mutations/events";
import {
  INCREMENT_PLAY_COUNT,
  UPDATE_LAST_TIME_PLAYED_SONG,
} from "@/store/graphql/mutations/songs";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { esES } from "@mui/x-date-pickers/locales";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { useEffect, useMemo, useRef, useState } from "react";
import { localEventObj } from "./EventListItem.tsx";

dayjs.locale("es");

interface EventSong {
  event_id: number | null;
  song_id: number | null;
  order: number;
}
export interface EventSongColection extends EventSong {
  song: SongObj;
}

interface ScrollDialogProps {
  open: boolean;
  setOpen: (stateProp: boolean) => void;
  refetchEvents: () => void;
  selectedEvent: localEventObj | null;
  setSelectedEvent: (event: localEventObj | null) => void;
  eventSongsSelected: EventSongColection[];
  setEventSongsSelected: (songs: EventSongColection[]) => void;
}

interface EventObj {
  id: number | null;
  name: string;
  date: Dayjs | null;
  hour: Dayjs | null;
  desc: string;
}

const steps = ["Información del evento", "Agrega las canciones"];
export default function ScrollDialog({
  open,
  setOpen,
  refetchEvents,
  selectedEvent,
  setSelectedEvent,
  eventSongsSelected,
  setEventSongsSelected,
}: ScrollDialogProps) {
  const descriptionElementRef = useRef<HTMLElement>(null);
  const initialEventObjRef = useRef<EventObj>({
    id: null,
    name: "",
    date: dayjs(new Date()),
    hour: null,
    desc: "",
  });
  const [eventObj, setEventObj] = useState<EventObj>(
    initialEventObjRef.current,
  );
  const [songsEventArray, setSongsEventArray] = useState<SongObj[]>([]);

  const [validateEvent, setValidateEvent] = useState({
    name: true,
    date: true,
    hour: true,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (selectedEvent != null) {
      const updatedEvent: EventObj = {
        ...selectedEvent,
        date:
          typeof selectedEvent.date === "string"
            ? dayjs(selectedEvent.date)
            : selectedEvent.date,
        hour:
          typeof selectedEvent.hour === "string"
            ? dayjs(new Date(`2024-01-01T${selectedEvent.hour.split("+")[0]}`))
            : selectedEvent.hour,
        desc: selectedEvent.desc ?? "",
      };
      setEventObj(updatedEvent);
      if (
        !eventSongsSelected ||
        !Array.isArray(eventSongsSelected) ||
        eventSongsSelected.length === 0
      )
        return;
      const mappedSongs = eventSongsSelected.map(({ song }) => ({
        ...song,
      }));
      setSongsEventArray(mappedSongs);
    } else {
      setEventObj(initialEventObjRef.current);
    }
  }, [selectedEvent, eventSongsSelected]);

  useEffect(() => {
    const isNameValid = eventObj.name?.trim() !== "";
    const isDateValid =
      eventObj.date != null && eventObj.date.toISOString() !== "";
    const isHourValid =
      eventObj.hour != null && eventObj.hour.toISOString() !== "";

    setValidateEvent({
      name: !isNameValid,
      date: !isDateValid,
      hour: !isHourValid,
    });

    setIsFormValid(isNameValid && isDateValid && isHourValid);
  }, [eventObj]);

  useEffect(() => {
    if (open == null) return;
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }, [open]);

  useEffect(() => {
    if (eventObj.date == null || !dayjs(eventObj.date).isValid()) return;
    const day = eventObj.date.format("dddd").toUpperCase();
    setEventObj((prevEventObj) => ({ ...prevEventObj, name: day }));

    if (day === "MIÉRCOLES") {
      setEventObj((prevEventObj) => {
        const hourDay =
          prevEventObj.hour != null && dayjs(prevEventObj.hour).isValid()
            ? prevEventObj.hour
            : dayjs();
        return {
          ...prevEventObj,
          hour: hourDay.hour(18).minute(30).second(0).millisecond(0),
        };
      });
    } else if (day === "DOMINGO") {
      setEventObj((prevEventObj) => {
        const hourDay =
          prevEventObj.hour != null && dayjs(prevEventObj.hour).isValid()
            ? prevEventObj.hour
            : dayjs();
        return {
          ...prevEventObj,
          hour: hourDay.hour(10).minute(0).second(0).millisecond(0),
        };
      });
    }
  }, [eventObj.date]);

  const showCloseEventBtn = useMemo(() => {
    if (
      eventObj == null ||
      eventObj.id == null ||
      eventObj.date == null ||
      eventObj.hour == null
    )
      return false;
    // Join date and hour to compare with current date and hour
    const eventDate = eventObj.date.toISOString().split("T")[0];
    const eventHour = eventObj.hour.toISOString().split("T")[1];
    return dayjs().isAfter(dayjs(`${eventDate}T${eventHour}`));
  }, [eventObj]);
  const handleClose = () => {
    setOpen(false);
    setEventObj(initialEventObjRef.current);
    setActiveStep(0);
    setSelectedEvent(null);
    setEventSongsSelected([]);
    setSongsEventArray([]);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [mutateEvent, { loading, error }] = useMutation(MUTATE_EVENT);
  const [mutateCloseEvent, { loading: loadingClose, error: errorClose }] =
    useMutation(CLOSE_EVENT);

  const [addEventSong, { loading: loadingEventSong, error: errorEventSong }] =
    useMutation(ADD_EVENT_SONG);

  const [editOrderEventSong] = useMutation(UPDATE_ORDER_EVENT_SONG);
  const [incrementPlayedSong] = useMutation(INCREMENT_PLAY_COUNT);
  INCREMENT_PLAY_COUNT;

  const [
    updateLastTimePlayedSong,
    { loading: loadingLastTime, error: errorUpdateLastTime },
  ] = useMutation(UPDATE_LAST_TIME_PLAYED_SONG);

  const mergeDateAndHour = () => {
    try {
      if (eventObj.date == null || eventObj.hour == null) throw new Error();
      const eventDate = eventObj.date.clone();
      return eventDate
        .hour(eventObj.hour.get("hour"))
        .minute(eventObj.hour.get("minute"))
        .second(eventObj.hour.get("second"))
        .millisecond(0)
        .toISOString();
    } catch (error) {
      window.console.error(error);
      return eventObj.date?.toISOString() || dayjs(new Date()).toISOString();
    }
  };

  const handleMutateEvent = async () => {
    try {
      const eventObjTmp = JSON.parse(JSON.stringify(eventObj));
      delete eventObjTmp.__typename;
      if (eventObj.id == null) delete eventObjTmp.id;
      eventObjTmp.hour = getTimeFromDate(eventObjTmp.hour);
      eventObjTmp.date = mergeDateAndHour();
      const resEvent = await mutateEvent({
        variables: {
          object: eventObjTmp,
        },
      });
      if (
        resEvent == null ||
        resEvent.data == null ||
        resEvent.data.insert_events_one == null ||
        resEvent.data.insert_events_one.id == null
      )
        throw new Error("Mutation of event response is null");
      const eventId = resEvent.data.insert_events_one.id;
      if (songsEventArray == null || !songsEventArray.length) return;
      const [newSongs, existingSongs]: [EventSong[], EventSong[]] =
        songsEventArray.reduce(
          (acc: [EventSong[], EventSong[]], song: SongObj, index: number) => {
            const evntSng = {
              event_id: eventId,
              song_id: song.id,
              order: index + 1,
            };
            if (Object.prototype.hasOwnProperty.call(song, "__new_song")) {
              // New song
              acc[0].push(evntSng);
            } else {
              // Existing song
              acc[1].push(evntSng);
            }
            return acc;
          },
          [[], []],
        );
      if (newSongs.length > 0) {
        await addEventSong({
          variables: {
            objects: newSongs,
          },
        });
      }
      const promiseEventSongOrderUpdate = existingSongs.map((eventSong) =>
        editOrderEventSong({
          variables: {
            ...eventSong,
          },
        }),
      );
      await Promise.all(promiseEventSongOrderUpdate);
    } catch (error) {
      window.console.error(error);
    } finally {
      setSongsEventArray([]);
      refetchEvents();
      handleClose();
    }
  };

  const handleCloseEvent = async () => {
    try {
      const eventObjTmp = JSON.parse(JSON.stringify(eventObj));
      const resEvent = await mutateCloseEvent({
        variables: {
          id: eventObjTmp.id,
        },
      });
      if (resEvent == null || resEvent.data == null) return;
      const songsID = songsEventArray.reduce<number[]>((acc, song) => {
        if (
          song.id != null &&
          (dayjs(eventObjTmp.date).isAfter(dayjs(song.last_time_played)) ||
            song.last_time_played == null)
        )
          acc.push(song.id);
        return acc;
      }, []);
      await updateLastTimePlayedSong({
        variables: {
          _in: songsID,
          last_time_played: eventObjTmp.date,
        },
      });
      const allIds = songsEventArray.map((song) => song.id);
      await incrementPlayedSong({ variables: { _in: allIds } });
    } catch (error) {
      window.console.error(error);
    } finally {
      handleClose();
      refetchEvents();
    }
  };

  const step1 = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          error={validateEvent.name}
          fullWidth
          id="event_name"
          label="Nombre del evento"
          value={eventObj.name}
          onChange={(e) => setEventObj({ ...eventObj, name: e.target.value })}
          margin="normal"
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
            label="Día del evento"
            value={eventObj.date}
            format="DD/MM/YYYY"
            onChange={(newValue) =>
              setEventObj({ ...eventObj, date: newValue })
            }
            className="w-full"
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker
            label="Hora del evento"
            value={eventObj.hour}
            onChange={(newValue) =>
              setEventObj({ ...eventObj, hour: newValue })
            }
            slotProps={{
              textField: {
                error: validateEvent.hour,
              },
            }}
            className="w-full"
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="event_name"
          label="Notas/Descripción (Opcional)"
          value={eventObj.desc}
          onChange={(e) => setEventObj({ ...eventObj, desc: e.target.value })}
          margin="normal"
        />
      </Grid>
    </Grid>
  );

  const step2 = (
    <SearchSongs
      songsEventArray={songsEventArray}
      setSongsEventArray={setSongsEventArray}
      idEvent={eventObj.id}
    />
  );

  if (loading || loadingEventSong || loadingLastTime || loadingClose)
    return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  if (errorClose) return `Error closing event! ${errorClose.message}`;
  if (errorEventSong) return `Submission error! ${errorEventSong.message}`;
  if (errorUpdateLastTime)
    return `Submission error! ${errorUpdateLastTime.message}`;

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
          {eventObj.id ? "Editar" : "Agregar"} evento
        </DialogTitle>
        <DialogContent dividers={true}>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === 0 && step1}
            {activeStep === 1 && step2}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1, ...(activeStep < 1 && { display: "none" }) }}
          >
            Atras
          </Button>
          {activeStep !== steps.length - 1 ? (
            <Button onClick={handleNext}>Siguiente</Button>
          ) : (
            <Button onClick={handleMutateEvent} disabled={!isFormValid}>
              {eventObj.id ? "Editar" : "Crear"}
            </Button>
          )}
          {showCloseEventBtn && (
            <Button onClick={handleCloseEvent}>Finalizar Evento</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
