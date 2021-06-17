import React from 'react'
import api from '../services/api'

const DuePayment = ({ mobile, transaction }) => {
    async function handleCLick(e) {
        const id = String(e)
        await api.call('post', 'due/delete', { mobile: mobile, Id: id })
        window.location.reload(false);
    }
    return <div className="debit-transaction">
        <p style={{ display: 'inline-block', }}>Pay ₹ {transaction.amount} to {transaction.name}</p> <button onClick={() => handleCLick(transaction._id)} style={{ padding: '5px', display: 'block', margin: '0 0 auto auto' }} className="danger-btn">Payed</button>
    </div>
}

export default DuePayment