import { gql } from "apollo-boost"

export const WHO_AM_I = gql`
  query WhoAmI {
    me {
      id
      email
    }
  }
`
