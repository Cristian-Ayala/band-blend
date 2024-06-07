import { gql } from "@apollo/client";

export const GET_SONGS = gql`
  query GET_SONGS($searchKeyword: String = "%%") {
    songs(where: { visible: { _eq: true }, title: { _ilike: $searchKeyword } }) {
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
