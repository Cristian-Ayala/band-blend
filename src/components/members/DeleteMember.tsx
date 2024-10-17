import { MemberObj } from "@/pages/members/MembersIndex";
import { DELETE_MEMBER } from "@/store/graphql/mutations/members";
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
  refetchMembers: () => void;
  selectedMember: MemberObj;
}

export default function DeleteMember({
  open,
  setOpen,
  refetchMembers,
  selectedMember,
}: ScrollDialogProps) {
  const [deleteMemberHasura, { loading, error }] = useMutation(DELETE_MEMBER);
  const handleClose = () => {
    setOpen(false);
  };

  const deleteMember = () => {
    deleteMemberHasura({
      variables: {
        id: selectedMember.id,
      },
    });
    handleClose();
    refetchMembers();
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
        <DialogTitle id="scroll-dialog-title">Eliminar Rol</DialogTitle>
        <DialogContent dividers={true}>
          <Box sx={{ width: "100%" }}>
            ¿Está seguro que desea eliminar el miembro
            {selectedMember.first_name} {selectedMember.last_name}?
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => deleteMember()}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
