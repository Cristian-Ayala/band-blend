import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import { RoleObj } from "@/pages/roles/RolesIndex";

export default function RolesListItem({
  role,
  handleRoleSelection,
}: {
  role: RoleObj;
  handleRoleSelection: (role: RoleObj, openEditDialog: boolean) => void;
}) {
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
      data-v0-t="card"
      key={role.id}
    >
      <div className="p-3 grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full justify-between">
            <h3 className="text-lg font-semibold text-gray-50">
              {role.role_name}
            </h3>
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                onClick={() => handleRoleSelection(role, true)}
              >
                <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
              </button>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                onClick={() => handleRoleSelection(role, false)}
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
