import React from 'react'
import getItems from "../hooks/GetItems";
import {io} from "socket.io-client";



const App = () => {
    const items = getItems()
    const socket1 = io("http://192.168.99.101:4000/", {
        transports: ['websocket']
    }).connect();
    const socket2 = io("http://localhost:4001/").connect();
    console.log("socket1:", socket1)
    console.log("socket2:", socket2)
    console.log("items: ", items)
    return (
        <>
            <h2>Items for sale:</h2>
            {items &&
            items.length > 0 &&
            items.map(item => (
                <p key={item.id}>{item.name}</p>
            ))}
        </>
    )
}

export default App

