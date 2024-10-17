import AddEditMember from "@/components/members/AddEditMember";
import MemberListItem from "@/components/members/MemberListItem";
import { GET_MEMBERS } from "@/store/graphql/queries/members";
import { useQuery } from "@apollo/client";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useState } from "react";
import DeleteMember from "@/components/members/DeleteMember";
import { RoleObj } from "@/pages/roles/RolesIndex";

export interface MemberObj {
  id: number | null;
  first_name: string;
  last_name: string;
  role: RoleObj;
}
export default function MembersIndex() {
  const [selectedMember, setSelectedMember] = useState<MemberObj | null>(null);
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleMemberSelection = (member: MemberObj, addEditDialog = true) => {
    setSelectedMember(member);
    if (addEditDialog) setOpenAddEditDialog(true);
    else setOpenDeleteDialog(true);
  };

  const {
    loading,
    error,
    data,
    refetch: refetchMembers,
  } = useQuery(GET_MEMBERS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className="p-5 grid gap-6">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-50">Miembros</h2>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
              onClick={() => {
                setSelectedMember(null);
                setOpenAddEditDialog(true);
              }}
            >
              <AddRoundedIcon className="mr-2 h-4 w-4" />
              Agregar Miembro
            </button>
          </div>
          {data.band_members.map((member: MemberObj) => (
            <MemberListItem
              key={member.id}
              member={member}
              handleMemberSelection={handleMemberSelection}
            />
          ))}
        </div>
      </div>
      <AddEditMember
        open={openAddEditDialog}
        setOpen={setOpenAddEditDialog}
        refetchMembers={refetchMembers}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
      {selectedMember && (
        <DeleteMember
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          refetchMembers={refetchMembers}
          selectedMember={selectedMember}
        />
      )}
    </>
  );
}
