import React from 'react'
import getItems from "../hooks/GetItems";
import getUsers from "../hooks/GetUsers";
import {io} from "socket.io-client";



const App = () => {
    const items = getItems()
    const users = getUsers()
    const socket1 = io("http://127.0.0.1:4000/", {
        transports: ['websocket']
    }).connect();
    const socket2 = io("http://192.168.192.1:4001/").connect();
    console.log("socket1:", socket1)
    console.log("socket2:", socket2)
    console.log("items: ", items)
    console.log("users: ", users)
    return (
        <>
            <h2>Items for sale:</h2>
            {items &&
            items.length > 0 &&
            items.map(item => (
                <p key={item.id}>{item.name}</p>
            ))}
            <h2>Users</h2>
            {users &&
            users.length > 0 &&
            users.map(user => (
                <p>{user.username}</p>
            ))}
        </>
    )
}

export default App

