import { gql } from "@apollo/client";

export const ADD_MEMBER = gql`
  mutation ADD_MEMBER(
    $first_name: String!
    $last_name: String!
    $role_id: Int!
  ) {
    insert_band_members(
      objects: {
        first_name: $first_name
        last_name: $last_name
        role_id: $role_id
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_MEMBER = gql`
  mutation UPDATE_MEMBER(
    $id: Int!
    $first_name: String!
    $last_name: String!
    $role_id: Int!
  ) {
    update_band_members_by_pk(
      pk_columns: { id: $id }
      _set: {
        first_name: $first_name
        last_name: $last_name
        role_id: $role_id
      }
    ) {
      id
    }
  }
`;

export const DELETE_MEMBER = gql`
  mutation DELETE_MEMBER($id: Int!) {
    update_band_members_by_pk(
      pk_columns: { id: $id }
      _set: { active: false }
    ) {
      id
    }
  }
`;
