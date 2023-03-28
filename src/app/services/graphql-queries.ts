import { gql } from 'apollo-angular';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        email
        password
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      email
      password
      username
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query getEmployees {
    getEmployees {
      id
      first_name
      email
      gender
      last_name
      salary
    }
  }
`;
