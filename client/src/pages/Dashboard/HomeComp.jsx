import React, { Component } from 'react'

import api from '../../services/api'
import DuePayment from '../../components/DuePayment'

class HomeComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            due: [],
            name: "",
            amount: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state.name);
        console.log(this.state.amount);
    }
    handleSubmit = async (e) => {
        const { name, amount } = this.state
        const { mobile } = this.props
        if (amount === null || name === "") {
            console.log("Please enter name and amount");
        } else {
            await api.call("post", "due/create", { name: name, amount: amount, mobile: mobile })
        }
        this.setState({ name: "", amount: null })
        window.location.reload();

    }
    async componentDidMount() {
        const response = await api.call("post", "auth/profile", { mobile: this.props.mobile })
        this.setState({ user: response })
        const result = await api.call('get', `due/${this.props.mobile}`)
        this.setState({ due: result })
    }
    render() {
        const { user, due, name, amount } = this.state
        const { mobile } = this.props
        return <div className="homeComp">
            <h1>Welcome back, {user.username} !!</h1>
            <div className="Container">
                <div className="box-1">
                    <div className="big-box">
                        <h1>Due Payments</h1>
                        {due.map((element, key) => <DuePayment mobile={mobile} transaction={element} key={key} />)}
                    </div>
                </div>
                <div className="box-2">
                    {/* <div className="small-box">
                        <center>
                            <h2>Udhar Balance</h2>
                            <h1>₹ {user.wallet}</h1>
                        </center>
                    </div> */}
                    <div className="small-box">
                        <center>
                            <h2>Add due payments</h2>
                            <br />
                            <input
                                style={{ width: "70%" }}
                                type="text"
                                className="login-input"
                                placeholder="Name or mobile of person"
                                value={name}
                                onChange={this.handleChange}
                                name="name"
                                autoComplete="off"
                            /> <br /><br />
                            <input
                                style={{ width: "70%" }}
                                type="number"
                                className="login-input"
                                placeholder="Amount to be paid"
                                value={amount}
                                onChange={this.handleChange}
                                name="amount"
                            /> <br /><br />
                            <button onClick={this.handleSubmit} className="dark-btn">Create</button>
                        </center>
                    </div>
                </div>
            </div>

        </div>
    }
}

export default HomeComp