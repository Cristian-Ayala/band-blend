import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

interface songListItemProps {
  isAdded?: boolean;
}
export default function SongListItem({ isAdded = false }: songListItemProps) {
  return (
    <Stack spacing={2}>
      <Item>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <h3 className="text-lg font-semibold">Song Title</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <p className="text-gray-400 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  Artist Name
                </p>
              </Grid>
              <Grid item xs={6}>
                <p className="text-gray-400">12/03/2024</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "right", alignContent: "center" }}>
            <IconButton aria-label="add" size="small" sx={{ marginRight: "1rem" }}>
              {isAdded ? <Delete /> : <Add />}
            </IconButton>
          </Grid>
        </Grid>
      </Item>
    </Stack>
  );
}
