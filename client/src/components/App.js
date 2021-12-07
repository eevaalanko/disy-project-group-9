import React  from 'react'
import getItems from "../hooks/GetItems";


const App = () => {
    const items = getItems()
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

