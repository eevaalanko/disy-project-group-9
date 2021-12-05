import { gql } from '@apollo/client'


export const ALL_ITEMS = gql`
  query {
    allItems {
      id
      name
      price
      amount
    }
  }
`



