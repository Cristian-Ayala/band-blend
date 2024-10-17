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
  membersObj: { band_members: MemberObj[] };
  selectedMemberID: number | null;
}

export default function SelectMember({
  open,
  setOpen,
  setSelectedMemberProp,
  membersObj,
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
    try {
      if (selectedMember != null) return;
      if (
        selectedMemberID == null ||
        membersObj == null ||
        membersObj.band_members == null
      )
        throw new Error("No member selected");
      const selMem: MemberObj | undefined = membersObj.band_members.find(
        (member) => member.id === selectedMemberID,
      );
      if (selMem == null) throw new Error("No member found");
      setSelectedMember(selMem);
      setSelectedMemberProp(selMem);
    } catch (error) {
      setSelectedMember(null);
    }
  }, [selectedMemberID, membersObj, setSelectedMemberProp, selectedMember]);

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
            {membersObj.band_members && (
              <Autocomplete
                value={selectedMember || null}
                disablePortal
                isOptionEqualToValue={(option, value) => option === value}
                id="setRole"
                autoHighlight
                getOptionLabel={(option: MemberObj) =>
                  `${option.first_name} ${option.last_name}` || ""
                }
                options={membersObj.band_members}
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
