import React from 'react'
//import {useState} from 'react'
//import getItems from "../hooks/GetItems";
//import getUsers from "../hooks/GetUsers";
import {POST_ITEM} from "../graphql/queries";
import { gql, useMutation } from '@apollo/client'
//import {io} from "socket.io-client";


function ItemForm() {
    let name;
    let amount;
    let price;
    const [postItem, { data, loading, error }] = useMutation(POST_ITEM);
  
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
  
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            postItem({ itemInput: { name: name.value, amount: parseInt(amount.value) , price: parseInt(price.value) } });
            name.value = '';
            amount.value = '';
            price.value = '';
          }}
        >
            <label>Name</label>
          <input
            ref={node => {
                name = node;
            }}
          />
          <br/>
          <label>Amount</label>
          <input
            type = "Int"
            ref={node => {
                
                amount = node;
            }}
          />
          <br/>
          <label>Price</label>
          <input
            type = "Int"
            ref={node => {
                
                price = node;
            }}
          />
          <button type="submit">Add Item</button>
        </form>
      </div>
    );
  }

  export default ItemForm