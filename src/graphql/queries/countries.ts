import { gql } from '@apollo/client'

export const GET_ALL_COUNTRIES = gql`
  query countries {
    countries {
      code
      name
      emoji
      capital
      native
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`
