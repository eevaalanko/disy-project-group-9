import { useQuery } from '@apollo/client'
import {ALL_USERS} from "../graphql/queries";

const GetUsers = () => {
  const { data } = useQuery(ALL_USERS, {
    fetchPolicy: 'cache-and-network',
  })
  return data ? data.allUsers : undefined
}

export default GetUsers
