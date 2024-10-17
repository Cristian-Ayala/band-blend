import { ADD_ROLE, UPDATE_ROLE } from "@/store/graphql/mutations/roles";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import { RoleObj } from "@/pages/roles/RolesIndex";

interface ScrollDialogProps {
  open: boolean;
  setOpen: (stateProp: boolean) => void;
  refetchRoles: () => void;
  selectedRole: RoleObj | null;
  setSelectedRole: (role: RoleObj | null) => void;
}

export default function AddEditRole({
  open,
  setOpen,
  refetchRoles,
  selectedRole,
  setSelectedRole,
}: ScrollDialogProps) {
  const [addRole, { loading, error }] = useMutation(ADD_ROLE);
  const [
    updateRoleHasura,
    { loading: updateRoleLoading, error: updateRoleError },
  ] = useMutation(UPDATE_ROLE);

  const initialRoleObjRef = useRef<RoleObj>({
    id: null,
    role_name: "",
  });

  const [roleObj, setRoleObj] = useState<RoleObj>(initialRoleObjRef.current);

  useEffect(() => {
    if (selectedRole != null) {
      setRoleObj({ ...selectedRole });
    } else {
      setRoleObj(initialRoleObjRef.current);
    }
  }, [selectedRole]);

  const [validateRole, setValidateRole] = useState({
    role_name: true,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isTitleValid = roleObj.role_name?.trim() !== "";

    setValidateRole({
      role_name: !isTitleValid,
    });

    setIsFormValid(isTitleValid);
  }, [roleObj]);

  const handleClose = () => {
    setOpen(false);
    setRoleObj(initialRoleObjRef.current);
    setSelectedRole(null);
  };

  const manageRole = () => {
    if (roleObj.id != null) updateRole();
    else createRole();
    handleClose();
  };

  const createRole = async () => {
    const { role_name: rolName } = roleObj;
    await addRole({ variables: { role_name: rolName } });
    refetchRoles();
  };

  const updateRole = async () => {
    const tmpRole = JSON.parse(JSON.stringify(roleObj));
    await updateRoleHasura({
      variables: {
        id: tmpRole.id,
        role_name: tmpRole.role_name,
      },
    });
    refetchRoles();
  };

  const roleComponent = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          error={validateRole.role_name}
          fullWidth
          id="role_name"
          label="Nombre del rol"
          value={roleObj.role_name ?? ""}
          onChange={(e) =>
            setRoleObj({
              ...roleObj,
              role_name: e.target.value.toLocaleUpperCase(),
            })
          }
        />
      </Grid>
    </Grid>
  );
  if (loading || updateRoleLoading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  if (updateRoleError) return `Submission error! ${updateRoleError.message}`;
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
          {roleObj.id ? "Editar" : "Agregar"} canción
        </DialogTitle>
        <DialogContent dividers={true}>
          <Box sx={{ width: "100%" }}>{roleComponent}</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={manageRole} disabled={!isFormValid}>
            {roleObj.id ? "Editar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
