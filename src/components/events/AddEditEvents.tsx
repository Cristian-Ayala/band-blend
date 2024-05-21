import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { esES } from "@mui/x-date-pickers/locales";
import "dayjs/locale/es";
import Grid from "@mui/material/Grid";
import { UUID } from "crypto";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import SearchSongs from "@/components/songs/SearchSongs.tsx";

interface ScrollDialogProps {
  open: boolean;
  setOpen: (stateProp: boolean) => void;
}

interface EventObj {
  id: UUID | null;
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

  const step2 = <SearchSongs />;
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
            <Button onClick={handleClose} disabled={!isFormValid}>
              {eventObj.id ? "Editar" : "Crear"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
