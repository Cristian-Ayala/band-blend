import { gql } from "@apollo/client";

export const GET_SONGS = gql`
  query GET_SONGS {
    songs {
      id
      play_count
      release_date
      title
      genre
      duration
      desc
      artist
      album
    }
  }
`;
