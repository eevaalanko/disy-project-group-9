import { useQuery } from '@apollo/client'
import {ALL_ITEMS} from "../graphql/queries";

const GetItems = () => {
  const { data } = useQuery(ALL_ITEMS, {
    fetchPolicy: 'cache-and-network',
  })
  return data ? data.allItems : undefined
}

export default GetItems
