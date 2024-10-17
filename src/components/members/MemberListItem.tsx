import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import { MemberObj } from "@/pages/members/MembersIndex";

export default function MemberListItem({
  member,
  handleMemberSelection,
}: {
  member: MemberObj;
  handleMemberSelection: (member: MemberObj, openEditDialog: boolean) => void;
}) {
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
      data-v0-t="card"
      key={member.id}
    >
      <div className="p-3 grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-50">
                {member.first_name} {member.last_name}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">{member.role.role_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                onClick={() => handleMemberSelection(member, true)}
              >
                <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
              </button>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                onClick={() => handleMemberSelection(member, false)}
              >
                <DeleteRoundedIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
