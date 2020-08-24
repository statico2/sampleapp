import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation LogIn($email: String!, $password: String!) {
    result: login(email: $email, password: $password) {
      success
      error
      token
    }
  }
`
