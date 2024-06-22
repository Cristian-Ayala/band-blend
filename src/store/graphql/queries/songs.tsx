import { gql } from "@apollo/client";

export const GET_SONGS = gql`
  query GET_SONGS(
    $searchKeyword: String = "%%"
    $offset: Int = 0
    $limit: Int = 5
  ) {
    songs(
      where: { visible: { _eq: true }, title: { _ilike: $searchKeyword } }
      offset: $offset
      limit: $limit
    ) {
      id
      play_count
      release_date
      title
      genre
      duration
      desc
      artist
      album
      last_time_played
    }
    totalSongs: songs_aggregate(
      where: { visible: { _eq: true }, title: { _ilike: $searchKeyword } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
