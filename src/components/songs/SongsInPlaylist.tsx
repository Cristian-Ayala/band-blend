import { EventSongColection } from "@/components/events/AddEditEvents";
import {
  SongObjExtended,
  SongsCollection,
} from "@/components/songs/SearchSongs";
import { GET_MEMBERS } from "@/store/graphql/queries/members";
import { useQuery } from "@apollo/client";
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
  eventSongsSelected: EventSongColection[];
  mutateSongCollection: (
    song: SongObjExtended,
    songVerID?: number | string | null,
    modifyVer?: boolean,
    songVerName?: string | null,
  ) => void;
  onDragEnd: OnDragEndResponder;
  songsEventArray: SongObjExtended[];
  setMemberInSong: (song: SongObjExtended, member_id: number) => void;
}

const SongsInPlaylist = ({
  open,
  handleClose,
  eventSongsSelected,
  mutateSongCollection,
  onDragEnd,
  songsEventArray,
  setMemberInSong,
}: SongsInPlaylistProps) => {
  const { loading, error, data } = useQuery(GET_MEMBERS, {
    fetchPolicy: "network-only",
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
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
                {songsEventArray && songsEventArray.length > 0 && data != null
                  ? songsEventArray.map((song, index) => (
                      <DraggableListItem
                        key={song.id}
                        song={song}
                        eventSongsSelected={eventSongsSelected}
                        mutateSongCollection={mutateSongCollection}
                        index={index}
                        setMemberInSong={setMemberInSong}
                        membersObj={data}
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
        <Button onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SongsInPlaylist;
