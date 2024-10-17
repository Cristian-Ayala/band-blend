import { gql } from "@apollo/client";

export const GET_MEMBERS = gql`
  query GET_MEMBERS {
    band_members(
      where: { active: { _eq: true } }
      order_by: { first_name: asc }
    ) {
      id
      first_name
      last_name
      role {
        id
        role_name
      }
    }
  }
`;
