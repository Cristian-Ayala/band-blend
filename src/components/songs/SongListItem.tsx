import { SongObj } from "@/components/songs/AddEditSong";
import { SongsCollection } from "@/components/songs/SearchSongs";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

interface songListItemProps {
  songsEvent: SongsCollection;
  song: SongObj;
  mutateSongCollection: (song: SongObj) => void;
}
export default function SongListItem({
  song,
  songsEvent = {},
  mutateSongCollection,
}: songListItemProps) {
  return (
    <Stack spacing={2} className="w-full mt-2 mb-2">
      <Item>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <h3 className="text-lg font-semibold">{song?.title}</h3>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <p className="text-gray-400 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {song?.artist}
                </p>
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "0rem" }}>
                <p className="text-gray-400">
                  {song?.release_date
                    ? dayjs(song.release_date).format("DD/MM/YYYY")
                    : ""}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "right", alignContent: "center" }}>
            {song != null &&
            song.id != null &&
            Object.prototype.hasOwnProperty.call(songsEvent, song.id) ? (
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
              <IconButton
                aria-label="add"
                size="small"
                sx={{ marginRight: "1rem" }}
                onClick={() => mutateSongCollection(song)}
                className="focus:outline-none"
              >
                <Add />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Item>
    </Stack>
  );
}
