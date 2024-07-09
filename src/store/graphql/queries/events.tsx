import { gql } from "@apollo/client";
import { SONG_FRAGMENT } from "@/store/graphql/queries/songs";

export const EVENT_FRAGMENT = `
id
hour
desc
date
name
`;

export const GET_EVENTS = gql`
  query GET_EVENTS($offset: Int = 0, $limit: Int = 10) {
    events(offset: $offset, limit: $limit, order_by: { date: asc }) {
      ${EVENT_FRAGMENT}
    }
    totalEvents: events_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_EVENT_SONGS = gql`
  query GET_EVENT_SONGS($event_id: Int!) {
    event_songs(where: { event_id: { _eq: $event_id } }) {
      order
      event_id
      song_id
      song {
        ${SONG_FRAGMENT}
      }
    }
  }
`;