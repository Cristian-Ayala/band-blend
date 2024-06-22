import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query GET_EVENTS($offset: Int = 0, $limit: Int = 10) {
    events(offset: $offset, limit: $limit, order_by: { date: asc }) {
      id
      hour
      desc
      date
      name
    }
    totalEvents: events_aggregate {
      aggregate {
        count
      }
    }
  }
`;
