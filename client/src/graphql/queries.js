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

export const ALL_USERS = gql`
  query {
    allUsers {
      username
      password
    }
  }
`

export const POST_ITEM = gql`
mutation PostItem($name: String!, $amount: Int!, $price: Int!) {
  itemInput(name: $name, amount: $amount, price: $price) {
    name
    amount
    price
  }
}
`