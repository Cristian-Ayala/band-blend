import { SongObj } from "@/components/songs/AddEditSong";
import { SongsCollection } from "@/components/songs/SearchSongs";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { List } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import DraggableListItem from "./DraggableListItem";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SongsInPlaylistProps {
  songsEvent: SongsCollection;
  open: boolean;
  handleClose: () => void;
  mutateSongCollection: (song: SongObj) => void;
  onDragEnd: OnDragEndResponder;
  songsEventArray: SongObj[];
}

const SongsInPlaylist = ({
  open,
  handleClose,
  mutateSongCollection,
  onDragEnd,
  songsEventArray,
}: SongsInPlaylistProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="songs-in-playlist"
      aria-describedby="scroll-dialog-description"
      TransitionComponent={Transition}
      keepMounted
      fullScreen
    >
      <DialogTitle id="songs-in-playlist">Canciones agregadas</DialogTitle>
      <DialogContent
        dividers={true}
        style={{ overflowX: "hidden", overflowY: "hidden" }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-list">
            {(provided) => (
              <List ref={provided.innerRef} {...provided.droppableProps}>
                {songsEventArray && songsEventArray.length > 0
                  ? songsEventArray.map((song, index) => (
                      <DraggableListItem
                        key={song.id}
                        song={song}
                        mutateSongCollection={mutateSongCollection}
                        index={index}
                      />
                    ))
                  : ""}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SongsInPlaylist;
