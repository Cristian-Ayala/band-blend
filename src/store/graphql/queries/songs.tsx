import { gql } from "@apollo/client";

export const SONG_FRAGMENT = `
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
`;

export const GET_SONGS = gql`
  query GET_SONGS(
    $searchKeyword: String = "%%"
    $offset: Int = 0
    $limit: Int = 5
    $last_time_played: order_by = null
    $play_count: order_by = null
    $title: order_by = asc_nulls_first
    $artistFilter: String = null
    $genreFilter: Int = null
  ) {
    songs(
      where: {
        visible: { _eq: true }
        title: { _ilike: $searchKeyword }
        artist: { _eq: $artistFilter }
        genre: { _eq: $genreFilter }
      }
      offset: $offset
      limit: $limit
      order_by: {
        last_time_played: $last_time_played
        play_count: $play_count
        title: $title
      }
    ) {
      ${SONG_FRAGMENT}
    }
    totalSongs: songs_aggregate(
      where: {
        visible: { _eq: true }
        title: { _ilike: $searchKeyword }
        artist: { _eq: $artistFilter }
        genre: { _eq: $genreFilter }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_ARTISTS = gql`
  query GET_ARTISTS {
    songs(distinct_on: artist, order_by: { artist: asc }) {
      artist
      id
    }
  }
`;
