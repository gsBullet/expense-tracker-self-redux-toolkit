import React from 'react'
import { useSelector } from 'react-redux'

function TransactionTopCart() {
  const {transactions} = useSelector(state=> state.transaction)
  let balance = 0;
  transactions.forEach(element => {
    const {type,amount} = element
    if(type==='income'){
      balance += amount
    }else{
      balance-= amount
    }
    
  });
  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>
        <span>{balance}</span>
      </h3>
    </div>
  )
}

export default TransactionTopCart
