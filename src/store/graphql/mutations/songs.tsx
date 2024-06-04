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
