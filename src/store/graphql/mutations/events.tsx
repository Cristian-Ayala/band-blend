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

export const CLOSE_EVENT = gql`
  mutation CLOSE_EVENT($id: Int!) {
    update_events_by_pk(pk_columns: { id: $id }, _set: { active: false }) {
      id
    }
  }
`;

export const UPDATE_ORDER_EVENT_SONG = gql`
  mutation UPDATE_ORDER_EVENT_SONG(
    $event_id: Int!
    $song_id: Int!
    $order: Int!
    $member_id: Int
    $song_version_id: Int
  ) {
    update_event_songs_by_pk(
      pk_columns: { event_id: $event_id, song_id: $song_id }
      _set: {
        order: $order
        member_id: $member_id
        song_version_id: $song_version_id
      }
    ) {
      event_id
      song_id
      order
      member_id
      song_version_id
    }
  }
`;

export const DELETE_EVENT_SONG = gql`
  mutation DELETE_EVENT_SONG($event_id: Int!, $song_id: Int!) {
    delete_event_songs_by_pk(event_id: $event_id, song_id: $song_id) {
      song_id
      event_id
      order
    }
  }
`;
