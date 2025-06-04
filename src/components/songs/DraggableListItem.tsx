import { EventSongColection } from "@/components/events/AddEditEvents";
import { SongObjExtended } from "@/components/songs/SearchSongs.tsx";
import { MemberObj } from "@/pages/members/MembersIndex";
import { Draggable } from "@hello-pangea/dnd";
import ArticleIcon from "@mui/icons-material/Article";
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
import SongVersions, { SongsVersions } from "./SongVersions";
interface songListItemProps {
  song: SongObjExtended;
  eventSongsSelected: EventSongColection[];
  mutateSongCollection: (
    song: SongObjExtended,
    songVerID: number | string | null,
    modifyVer: boolean,
    songVerName: string | null,
  ) => void;
  setMemberInSong: (song: SongObjExtended, member_id: number) => void;
  index: number;
  membersObj: { band_members: MemberObj[] };
}
export default function SongListItem({
  song,
  eventSongsSelected,
  mutateSongCollection,
  setMemberInSong,
  index,
  membersObj,
}: songListItemProps) {
  const [songHasId, setSongHasId] = useState(false);
  const [songVersionObj, setSongVersionObj] = useState<SongsVersions | null>(
    null,
  );
  const [modalSelectMembers, setModalSelectMembers] = useState(false);
  const [modalSelectVer, setModalSelectVer] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberObj | null>();
  const setSelectedMemberProp = (member: MemberObj) => {
    if (!member || member.id == null) return;
    setMemberInSong(song, member.id);
    setSelectedMember(member);
  };

  useEffect(() => {
    const songVersionRaw =
      eventSongsSelected?.find((s) => s.song_id === song.id)?.song_version ||
      null;
    if (songVersionRaw) {
      const { id, ...rest } = songVersionRaw;
      setSongVersionObj({
        ...rest,
        id: id === null ? undefined : id,
      });
    } else {
      setSongVersionObj(null);
    }
  }, [eventSongsSelected, song.id]);

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
                <Grid item xs={songHasId ? 7.5 : 12}>
                  <Grid item xs={12}>
                    <ListItemText primary={song?.title} />
                  </Grid>
                  {song.song_version_name && (
                    <Grid item xs={12}>
                      <ListItemText
                        primary={`${song.song_version_name}`}
                        className="text-gray-400 fs-subtitle"
                      />
                    </Grid>
                  )}
                  {selectedMember && (
                    <Grid item xs={12}>
                      <ListItemText
                        primary={`${selectedMember?.first_name} ${selectedMember?.last_name}`}
                        className="text-gray-400 fs-subtitle"
                      />
                    </Grid>
                  )}
                </Grid>
                {songHasId && (
                  <Grid item xs={1.5}>
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
                )}
                {songHasId && (
                  <Grid item xs={1.5}>
                    <ListItemButton>
                      <ListItemIcon>
                        <IconButton
                          aria-label="add"
                          size="small"
                          sx={{ marginRight: "1rem" }}
                          onClick={() => setModalSelectVer(true)}
                          className="focus:outline-none"
                        >
                          <ArticleIcon />
                        </IconButton>
                      </ListItemIcon>
                    </ListItemButton>
                  </Grid>
                )}{" "}
                {songHasId && (
                  <Grid item xs={1.5}>
                    <ListItemButton>
                      <ListItemIcon>
                        <IconButton
                          aria-label="add"
                          size="small"
                          sx={{ marginRight: "1rem" }}
                          onClick={() =>
                            mutateSongCollection(song, null, false, null)
                          }
                          className="focus:outline-none"
                        >
                          <Delete />
                        </IconButton>
                      </ListItemIcon>
                    </ListItemButton>
                  </Grid>
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
        bandMembers={membersObj?.band_members}
        selectedMemberID={song?.member_id ?? null}
      />
      <SongVersions
        open={modalSelectVer}
        setOpen={setModalSelectVer}
        songVersionObj={songVersionObj}
        mutateSongCollection={mutateSongCollection}
        song={song}
        usedInDraggableItem={true}
      />
    </>
  );
}
