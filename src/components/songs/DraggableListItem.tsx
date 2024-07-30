import { SongObj } from "@/components/songs/AddEditSong";
import { Draggable } from "@hello-pangea/dnd";
import Delete from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";

interface songListItemProps {
  song: SongObj;
  mutateSongCollection: (song: SongObj) => void;
  index: number;
}
export default function SongListItem({
  song,
  mutateSongCollection,
  index,
}: songListItemProps) {
  return (
    <Draggable draggableId={String(song?.id)} index={index}>
      {(provided, snapshot) => (
        <Stack spacing={2} className="w-full mt-2 mb-2">
          <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={snapshot?.isDragging ? { background: "#292929" } : {}}
          >
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <ListItemText primary={song?.title} />
              </Grid>
              <Grid item xs={2}>
                <ListItemButton>
                  <ListItemIcon>
                    {song != null && song.id != null ? (
                      <IconButton
                        aria-label="add"
                        size="small"
                        sx={{ marginRight: "1rem" }}
                        onClick={() => mutateSongCollection(song)}
                        className="focus:outline-none"
                      >
                        <Delete />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </ListItemIcon>
                </ListItemButton>
              </Grid>
            </Grid>
          </ListItem>
        </Stack>
      )}
    </Draggable>
  );
}
