import { SongObj } from "@/components/songs/AddEditSong";
import SearchSongs from "@/components/songs/SearchSongs.tsx";
import { getTimeFromDate } from "@/plugins/helpers";
import { ADD_EVENT_SONG, MUTATE_EVENT } from "@/store/graphql/mutations/events";
import { UPDATE_LAST_TIME_PLAYED_SONG } from "@/store/graphql/mutations/songs";
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

interface ScrollDialogProps {
  open: boolean;
  setOpen: (stateProp: boolean) => void;
}

interface EventObj {
  id: number | null;
  name: string;
  date: Dayjs | null;
  hour: Dayjs | null;
  desc: string;
}

const steps = ["Información del evento", "Agrega las canciones"];
export default function ScrollDialog({ open, setOpen }: ScrollDialogProps) {
  const descriptionElementRef = useRef<HTMLElement>(null);
  const initialEventObj: EventObj = {
    id: null,
    name: "",
    date: dayjs(new Date()),
    hour: null,
    desc: "",
  };
  const [eventObj, setEventObj] = useState<EventObj>(initialEventObj);
  const [songsEventArray, setSongsEventArray] = useState<SongObj[]>([]);

  const [validateEvent, setValidateEvent] = useState({
    name: true,
    date: true,
    hour: true,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const showCloseEventBtn = useMemo(() => {
    if (
      eventObj == null ||
      eventObj.id == null ||
      eventObj.date == null ||
      eventObj.hour == null
    )
      return false;
    // Join date and hour to compare with current date and hour
    return true;
  }, [eventObj]);
  const handleClose = () => {
    setOpen(false);
    setEventObj(initialEventObj);
    setActiveStep(0);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [mutateEvent, { loading, error }] = useMutation(MUTATE_EVENT);
  const [addEventSong, { loading: loadingEventSong, error: errorEventSong }] =
    useMutation(ADD_EVENT_SONG);

  const [
    updateLastTimePlayedSong,
    { loading: loadingLastTime, error: errorUpdateLastTime },
  ] = useMutation(UPDATE_LAST_TIME_PLAYED_SONG);

  interface EventSong {
    event_id: number | null;
    song_id: number | null;
    order: number;
  }
  const handleMutateEvent = async () => {
    try {
      const eventObjTmp = JSON.parse(JSON.stringify(eventObj));
      if (eventObj.id == null) delete eventObjTmp.id;
      eventObjTmp.hour = getTimeFromDate(eventObjTmp.hour);
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
      const songsEvent: EventSong[] = songsEventArray.reduce(
        (acc: EventSong[], song: SongObj, index: number) => {
          acc.push({
            event_id: eventId,
            song_id: song.id,
            order: index + 1,
          });
          return acc;
        },
        [],
      );

      const resEventSong = await addEventSong({
        variables: {
          objects: songsEvent,
        },
      });
      if (resEventSong == null || resEventSong.data == null)
        throw new Error("Mutation of event songs response is null");
    } catch (error) {
      window.console.error(error);
    } finally {
      setSongsEventArray([]);
      handleClose();
    }
  };

  const handleCloseEvent = async () => {
    const eventObjTmp = JSON.parse(JSON.stringify(eventObj));
    // MUTATE EVENT: status --> closed
    const songsID = songsEventArray.map((song) => song.id);
    await updateLastTimePlayedSong({
      variables: {
        _in: songsID,
        last_time_played: eventObjTmp.date,
      },
    });
    handleClose();
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
    />
  );

  if (loading || loadingEventSong || loadingLastTime) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
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
            sx={{ mr: 1 }}
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
