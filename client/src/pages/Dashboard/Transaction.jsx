import React, { Component } from 'react'
import api from '../../services/api'

class Transaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
            amount: null,
            name: "",
            mobile: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async handleSubmit(e) {
        const { name, mobile, amount } = this.state
        if (e.target.name === "Debit") {
            var amt = -1 * amount
            await api.call("post", `debt/${this.props.mobile}`, { name, mobile, debtChange: amt, typeOfTransaction: "Debit" })
        } else {
            await api.call("post", `debt/${this.props.mobile}`, { name, mobile, debtChange: amount, typeOfTransaction: "Credit" })
        }
        this.setState({ amount: null, name: '', mobile: "" })
        this.componentDidMount()
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    async componentDidMount() {
        const response = await api.call("get", `debt/${this.props.mobile}`)
        this.setState({ transactions: response })
    }
    render() {
        const { transactions, name, amount, mobile } = this.state
        return <div className="homeComp">
            <h1>Your Transactions </h1>
            <div className="Container">
                <div className="box-1">
                    <div className="big-box">
                        {transactions.map((trans, key) => {
                            return trans.amount > 0 ? <div className="transaction">
                                <p style={{ display: 'inline-block', }}>Recieved ₹ {trans.amount} from {trans.name}</p>
                            </div> : <div className="debit-transaction">
                                <p style={{ display: 'inline-block', }}>Payed ₹ {trans.amount} to {trans.name}</p>
                            </div>
                        })}
                    </div>
                </div>
                <div className="box-2">
                    <div className="small-box">
                        <center>
                            <h4>Add transaction</h4>
                            <br />
                            <input onChange={this.handleChange} value={name} name="name" type="text" className="login-input" placeholder="Enter name" />
                            <br /><br />
                            <input onChange={this.handleChange} value={mobile} name="mobile" type="text" className="login-input" placeholder="Enter mobile" />
                            <br /><br />
                            <button onClick={this.handleSubmit} name="Credit" className="btn-add" >+</button>
                            <input onChange={this.handleChange} value={amount} name='amount' style={{ border: "2px solid white" }} className="login-input" type="number" />
                            <button onClick={this.handleSubmit} name="Debit" className="btn-sub">-</button>
                        </center>
                    </div>
                </div>
            </div>
        </div>

    }
}

export default Transaction