import { RoleObj } from "@/pages/roles/RolesIndex";
import { DELETE_ROLE } from "@/store/graphql/mutations/roles";
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
  refetchRoles: () => void;
  selectedRole: RoleObj;
}

export default function DeleteRole({
  open,
  setOpen,
  refetchRoles,
  selectedRole,
}: ScrollDialogProps) {
  const [deleteRoleHasura, { loading, error }] = useMutation(DELETE_ROLE);
  const handleClose = () => {
    setOpen(false);
  };

  const deleteRole = () => {
    deleteRoleHasura({
      variables: {
        id: selectedRole.id,
      },
    });
    handleClose();
    refetchRoles();
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
            ¿Está seguro que desea eliminar el rol {selectedRole.role_name}?
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => deleteRole()}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
