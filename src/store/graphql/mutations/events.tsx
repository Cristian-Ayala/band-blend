import { gql } from "@apollo/client";

export const MUTATE_EVENT = gql`
  mutation MUTATE_EVENT(
    $update_columns: [events_update_column!] = [name, hour, desc, date]
    $object: events_insert_input!
  ) {
    insert_events_one(
      object: $object
      on_conflict: { constraint: events_pkey, update_columns: $update_columns }
    ) {
      id
    }
  }
`;

export const ADD_EVENT_SONG = gql`
  mutation ADD_EVENT_SONG($objects: [event_songs_insert_input!]!) {
    insert_event_songs(objects: $objects) {
      returning {
        song_id
        event_id
      }
    }
  }
`;
