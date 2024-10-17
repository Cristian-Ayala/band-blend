import { SongObj } from "@/components/songs/AddEditSong";
import { MemberObj } from "@/pages/members/MembersIndex";
import { Draggable } from "@hello-pangea/dnd";
import Delete from "@mui/icons-material/Delete";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import SelectMember from "../members/SelectMember";

interface songListItemProps {
  song: SongObj;
  mutateSongCollection: (song: SongObj) => void;
  setMemberInSong: (song: SongObj, member_id: number) => void;
  index: number;
  membersObj: { band_members: MemberObj[] };
}
export default function SongListItem({
  song,
  mutateSongCollection,
  setMemberInSong,
  index,
  membersObj,
}: songListItemProps) {
  const [songHasId, setSongHasId] = useState(false);
  const [modalSelectMembers, setModalSelectMembers] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberObj | null>();

  const setSelectedMemberProp = (member: MemberObj) => {
    if (!member || member.id == null) return;
    setMemberInSong(song, member.id);
    setSelectedMember(member);
  };

  useEffect(() => {
    setSongHasId(song != null && song.id != null);
  }, [song]);

  return (
    <>
      <Draggable draggableId={String(song?.id)} index={index}>
        {(provided, snapshot) => (
          <Stack spacing={2} className="w-full mt-2 mb-2 draggableContainer">
            <ListItem
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              sx={snapshot?.isDragging ? { background: "#292929" } : {}}
            >
              <Grid container spacing={2}>
                <Grid item xs={songHasId ? 8 : 12}>
                  <Grid item xs={12}>
                    <ListItemText primary={song?.title} />
                  </Grid>
                  {selectedMember && (
                    <Grid item xs={12}>
                      <ListItemText
                        primary={`${selectedMember?.first_name} ${selectedMember?.last_name}`}
                        className="text-gray-400 fs-subtitle"
                      />
                    </Grid>
                  )}
                </Grid>
                {songHasId ? (
                  <Grid item xs={2}>
                    <ListItemButton>
                      <ListItemIcon>
                        <IconButton
                          aria-label="add"
                          size="small"
                          sx={{ marginRight: "1rem" }}
                          onClick={() => setModalSelectMembers(true)}
                          className="focus:outline-none"
                        >
                          <RecordVoiceOverIcon />
                        </IconButton>
                      </ListItemIcon>
                    </ListItemButton>
                  </Grid>
                ) : (
                  ""
                )}
                {songHasId ? (
                  <Grid item xs={2}>
                    <ListItemButton>
                      <ListItemIcon>
                        <IconButton
                          aria-label="add"
                          size="small"
                          sx={{ marginRight: "1rem" }}
                          onClick={() => mutateSongCollection(song)}
                          className="focus:outline-none"
                        >
                          <Delete />
                        </IconButton>
                      </ListItemIcon>
                    </ListItemButton>
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </ListItem>
          </Stack>
        )}
      </Draggable>
      <SelectMember
        open={modalSelectMembers}
        setOpen={setModalSelectMembers}
        setSelectedMemberProp={setSelectedMemberProp}
        membersObj={membersObj}
        selectedMemberID={song?.member_id ?? null}
      />
    </>
  );
}
