import { MemberObj } from "@/pages/members/MembersIndex";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

interface ScrollDialogProps {
  open: boolean;
  setOpen: (stateProp: boolean) => void;
  setSelectedMemberProp: (member: MemberObj) => void;
  bandMembers: MemberObj[];
  selectedMemberID: number | null;
}

export default function SelectMember({
  open,
  setOpen,
  setSelectedMemberProp,
  bandMembers,
  selectedMemberID,
}: ScrollDialogProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedMember, setSelectedMember] = useState<MemberObj | null>(null);

  const confirmMemberSelection = () => {
    if (!selectedMember) return;
    setSelectedMemberProp(selectedMember);
    setOpen(false);
  };

  useEffect(() => {
    if (selectedMemberID == null || !Array.isArray(bandMembers)) {
      if (selectedMember !== null) setSelectedMember(null);
      return;
    }

    const selMem =
      bandMembers.find((member) => member.id === selectedMemberID) ?? null;

    if ((selectedMember?.id ?? null) !== (selMem?.id ?? null)) {
      setSelectedMember(selMem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMemberID, bandMembers]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">Seleccionar Director</DialogTitle>
        <DialogContent dividers={true}>
          <Box sx={{ width: "100%", height: "50vh" }}>
            {bandMembers && (
              <Autocomplete
                value={selectedMember || null}
                disablePortal
                isOptionEqualToValue={(option, value) => option === value}
                id="setRole"
                autoHighlight
                getOptionLabel={(option: MemberObj) =>
                  `${option.first_name} ${option.last_name}` || ""
                }
                options={bandMembers}
                onChange={(_, newValue: MemberObj | null) => {
                  setSelectedMember(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Director" />
                )}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {selectedMember && (
            <Button onClick={confirmMemberSelection}>Confirmar</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
