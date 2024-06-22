import { gql } from "@apollo/client";

export const ADD_SONG = gql`
  mutation ADD_SONG(
    $title: String!
    $release_date: timestamp = ""
    $genre: Int = 10
    $duration: String = ""
    $desc: String = ""
    $album: Int = 10
    $artist: String!
  ) {
    insert_songs_one(
      object: {
        album: $album
        artist: $artist
        desc: $desc
        duration: $duration
        genre: $genre
        release_date: $release_date
        title: $title
      }
    ) {
      id
    }
  }
`;

export const UPDATE_SONG = gql`
  mutation UPDATE_SONG($id: Int!, $songObject: songs_set_input!) {
    update_songs_by_pk(pk_columns: { id: $id }, _set: $songObject) {
      id
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DELETE_SONG($id: Int!) {
    update_songs_by_pk(pk_columns: { id: $id }, _set: { visible: false }) {
      id
    }
  }
`;

export const UPDATE_LAST_TIME_PLAYED_SONG = gql`
  mutation UPDATE_LAST_TIME_PLAYED_SONG(
    $last_time_played: timestamptz!
    $_in: [Int!]!
  ) {
    update_songs(
      where: { id: { _in: $_in } }
      _set: { last_time_played: $last_time_played }
    ) {
      returning {
        id
      }
    }
  }
`;
