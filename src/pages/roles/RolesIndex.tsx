import AddEditRole from "@/components/roles/AddEditRole";
import RolesListItem from "@/components/roles/RolesListItem";
import { GET_ROLES } from "@/store/graphql/queries/roles";
import { useQuery } from "@apollo/client";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useState } from "react";
import DeleteRole from "@/components/roles/DeleteRole";

export interface RoleObj {
  id: number | null;
  role_name: string;
}
export default function MembersIndex() {
  const [selectedRole, setSelectedRole] = useState<RoleObj | null>(null);
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleRoleSelection = (role: RoleObj, addEditDialog = true) => {
    setSelectedRole(role);
    if (addEditDialog) setOpenAddEditDialog(true);
    else setOpenDeleteDialog(true);
  };

  const {
    loading,
    error,
    data,
    refetch: refetchRoles,
  } = useQuery(GET_ROLES, {
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className="p-5 grid gap-6">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-50">Roles</h2>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
              onClick={() => {
                setSelectedRole(null);
                setOpenAddEditDialog(true);
              }}
            >
              <AddRoundedIcon className="mr-2 h-4 w-4" />
              Agregar Rol
            </button>
          </div>
          {data.band_roles.map((role: RoleObj) => (
            <RolesListItem
              key={role.id}
              role={role}
              handleRoleSelection={handleRoleSelection}
            />
          ))}
        </div>
      </div>
      <AddEditRole
        open={openAddEditDialog}
        setOpen={setOpenAddEditDialog}
        refetchRoles={refetchRoles}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
      {selectedRole && (
        <DeleteRole
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          refetchRoles={refetchRoles}
          selectedRole={selectedRole}
        />
      )}
    </>
  );
}
