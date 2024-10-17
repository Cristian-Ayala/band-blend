import { MemberObj } from "@/pages/members/MembersIndex";
import { ADD_MEMBER, UPDATE_MEMBER } from "@/store/graphql/mutations/members";
import { GET_ROLES } from "@/store/graphql/queries/roles";
import { useMutation, useQuery } from "@apollo/client";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";

interface ScrollDialogProps {
  open: boolean;
  setOpen: (stateProp: boolean) => void;
  refetchMembers: () => void;
  selectedMember: MemberObj | null;
  setSelectedMember: (member: MemberObj | null) => void;
}

export default function AddEditMember({
  open,
  setOpen,
  refetchMembers,
  selectedMember,
  setSelectedMember,
}: ScrollDialogProps) {
  const [addMember, { loading, error }] = useMutation(ADD_MEMBER);
  const { data: roles } = useQuery(GET_ROLES);

  const [
    updateMemberHasura,
    { loading: updateMemberLoading, error: updateMemberError },
  ] = useMutation(UPDATE_MEMBER);

  const initialMemberObjRef = useRef<MemberObj>({
    id: null,
    first_name: "",
    last_name: "",
    role: {
      id: null,
      role_name: "",
    },
  });

  const [memberObj, setMemberObj] = useState<MemberObj>(
    initialMemberObjRef.current,
  );
  const [tmpRoleID, setTmpRoleID] = useState<string | null>(null);

  useEffect(() => {
    if (selectedMember != null) {
      setTmpRoleID(selectedMember.role.role_name);
      setMemberObj({ ...selectedMember });
    } else {
      setTmpRoleID(null);
      setMemberObj(initialMemberObjRef.current);
    }
  }, [selectedMember, open]);

  const [validateMember, setValidateMember] = useState({
    first_name: true,
    last_name: true,
    role: true,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isFirstNameValid = memberObj.first_name?.trim() !== "";
    const isLastNameValid = memberObj.last_name?.trim() !== "";
    const isRoleValid = memberObj.role.id != null;

    setValidateMember({
      first_name: !isFirstNameValid,
      last_name: !isLastNameValid,
      role: !isRoleValid,
    });

    setIsFormValid(isFirstNameValid && isLastNameValid && isRoleValid);
  }, [memberObj]);

  const [rolesValidArray, setRolesValidArray] = useState([]);

  useEffect(() => {
    if (!tmpRoleID) {
      setMemberObj((prevMemberObj) => ({
        ...prevMemberObj,
        role: initialMemberObjRef.current.role,
      }));
      return;
    }
    const roleSelected = roles.band_roles.find(
      (role: { role_name: string; id: number }) => role.role_name === tmpRoleID,
    );
    if (!roleSelected) return;
    setMemberObj((prevMemberObj) => ({
      ...prevMemberObj,
      role: { id: roleSelected.id, role_name: roleSelected.role_name },
    }));
  }, [tmpRoleID, roles?.band_roles]);

  useEffect(() => {
    if (
      roles == null ||
      roles.band_roles == null ||
      !Array.isArray(roles.band_roles)
    )
      return;
    const validArray = roles.band_roles.map(
      (role: { role_name: string; id: number }) => role.role_name,
    );
    setRolesValidArray(validArray);
  }, [roles]);

  const handleClose = () => {
    setOpen(false);
    setMemberObj(initialMemberObjRef.current);
    setSelectedMember(null);
  };

  const manageMember = () => {
    if (memberObj.id != null) updateMember();
    else createMember();
    handleClose();
  };

  const createMember = async () => {
    const tmpMember = JSON.parse(JSON.stringify(memberObj));
    delete tmpMember.role;
    tmpMember.role_id = memberObj.role.id;
    await addMember({ variables: tmpMember });
    refetchMembers();
  };

  const updateMember = async () => {
    const tmpMember = JSON.parse(JSON.stringify(memberObj));
    await updateMemberHasura({
      variables: {
        id: tmpMember.id,
        first_name: tmpMember.first_name,
        last_name: tmpMember.last_name,
        role_id: tmpMember.role.id,
      },
    });
    refetchMembers();
  };

  const memberComponent = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {rolesValidArray && (
          <Autocomplete
            value={tmpRoleID}
            className={validateMember.role ? "autocompleteError" : ""}
            disablePortal
            isOptionEqualToValue={(option, value) => option === value}
            id="setRole"
            autoHighlight
            getOptionLabel={(option: string) => option || ""}
            options={rolesValidArray}
            onChange={(_, newValue: string | null) => {
              setTmpRoleID(newValue || "");
            }}
            renderInput={(params) => (
              <TextField {...params} label="Rol principal" />
            )}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={validateMember.first_name}
          fullWidth
          id="first_name"
          label="Nombre"
          value={memberObj.first_name ?? ""}
          onChange={(e) =>
            setMemberObj({
              ...memberObj,
              first_name: e.target.value.toLocaleUpperCase(),
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={validateMember.last_name}
          fullWidth
          id="last_name"
          label="Apellido"
          value={memberObj.last_name ?? ""}
          onChange={(e) =>
            setMemberObj({
              ...memberObj,
              last_name: e.target.value.toLocaleUpperCase(),
            })
          }
        />
      </Grid>
    </Grid>
  );
  if (loading || updateMemberLoading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  if (updateMemberError)
    return `Submission error! ${updateMemberError.message}`;
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
          {memberObj.id ? "Editar" : "Agregar"} canción
        </DialogTitle>
        <DialogContent dividers={true}>
          <Box sx={{ width: "100%" }}>{memberComponent}</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={manageMember} disabled={!isFormValid}>
            {memberObj.id ? "Editar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
