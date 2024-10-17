import { gql } from "@apollo/client";

export const ADD_ROLE = gql`
  mutation ADD_ROLE($role_name: String!) {
    insert_band_roles_one(object: { role_name: $role_name }) {
      id
      role_name
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UPDATE_ROLE($id: Int!, $role_name: String!) {
    update_band_roles_by_pk(
      pk_columns: { id: $id }
      _set: { role_name: $role_name }
    ) {
      role_name
      id
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation DELETE_ROLE($id: Int!) {
    update_band_roles_by_pk(pk_columns: { id: $id }, _set: { active: false }) {
      id
      role_name
    }
  }
`;
