import { gql } from "@apollo/client";

export const GET_ROLES = gql`
  query GET_ROLES {
    band_roles(where: { active: { _eq: true } }, order_by: { role_name: asc }) {
      id
      role_name
    }
  }
`;
