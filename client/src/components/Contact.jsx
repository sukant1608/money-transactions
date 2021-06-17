import React, { useState } from 'react'
import api from '../services/api'

const Contact = (props) => {
    const [temp, setTemp] = useState("1")
    async function deleteContact(id) {
        console.log(props.mobile);
        await api.call("post", `contacts/delete/${props.mobile}`, { mobile: id })
        setTemp("")
    }
    async function handleDebt() {

    }
    return <div className="Container">
        {
            props.contact.map((element, key) =>
                <div className="contact-box">
                    <center>
                        <button style={{ float: 'right', marginRight: "-12px", marginTop: "-12px" }} className="btn-sub" onClick={() => deleteContact(element.contact)}>X</button>
                        <h4>{element.name}</h4>
                        <br />
                        <h4 style={{ color: 'aqua' }}>{element.contact}</h4>
                        <br />
                        {element.debt > 0 ? <h4 style={{ color: 'aqua' }}>₹ {element.debt}</h4> : <h4 style={{ color: 'var(--danger)' }}>₹ {element.debt}</h4>}
                        <br />
                        <button className="btn-add" >+</button>
                        <input style={{ border: "2px solid white" }} className="login-input" type="number" />
                        <button className="btn-sub">-</button>

                    </center>
                </div>)
        }
    </div>
}

export default Contact