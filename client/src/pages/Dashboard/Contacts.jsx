import React, { Component } from 'react'
import api from '../../services/api'
import Contact from '../../components/Contact'

class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
            name: "",
            mobile: "",
            debt: "",
            amount: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleinput = this.handleinput.bind(this)
    }
    async componentDidMount() {

        const result = await api.call('get', `contacts/${this.props.mobile}`)
        const matrix = this.listToMatrix(result, 4)
        this.setState({ contacts: matrix })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    async handleSubmit(e) {
        const { name, mobile, debt } = this.state
        await api.call('post', `contacts/${this.props.mobile}`, { name, mobile, debt })
        this.setState({ name: "", debt: "", mobile: "" })
        this.componentDidMount()
    }

    listToMatrix(list, elementsPerSubArray) {
        var matrix = [], i, k;

        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }
            matrix[k].push(list[i]);
        }
        return matrix;
    }
    async deleteContact(id) {
        await api.call("post", `contacts/delete/${this.props.mobile}`, { mobile: id })
        this.componentDidMount()
    }
    async handleDebt(id) {
        // console.log(this.props.mobile);
        await api.call("post", `debt/${this.props.mobile}`, { name: id.name, mobile: id.contact, debtChange: this.state.amount, typeOfTransaction: "Debit" })
        // this.componentDidMount()
    }
    handleinput(e) {
        console.log(this.state.amount);
        this.setState({ amount: e.target.value })
    }
    render() {
        const { contacts } = this.state
        return <div className="homeComp">
            <h1>Your Contacts</h1>
            <div className="container">
                <div style={{ width: '100%' }} className="box-1">

                    <div style={{ border: 'none' }} className="big-box">
                        <div style={{ width: '85%' }} className="contact-box">
                            <center>
                                <h2>Add new contact</h2>
                                <br />
                                <input
                                    className="login-input"
                                    type="text"
                                    placeholder="Enter name"
                                    value={this.state.name}
                                    name="name"
                                    onChange={this.handleChange}
                                    autoComplete="off"

                                />
                                <br /><br />
                                <input
                                    className="login-input"
                                    type="text"
                                    placeholder="Enter mobile"
                                    value={this.state.mobile}
                                    name="mobile"
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                />
                                <br /><br />
                                <input
                                    className="login-input"
                                    type="text"
                                    placeholder="Enter debt"
                                    value={this.state.debt}
                                    name="debt"
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                />
                                <br /><br />
                                <button onClick={this.handleSubmit} className="dark-btn">Create</button>
                            </center>
                        </div>
                        {contacts.map((contact, row) => <div className="Container">
                            {
                                contact.map((element, col) =>
                                    <div className="contact-box">
                                        <center>
                                            <button style={{ float: 'right', marginRight: "-12px", marginTop: "-12px" }} className="btn-sub" onClick={() => this.deleteContact(element.contact)}>X</button>
                                            <h4>{element.name}</h4>
                                            <br />
                                            <h4 style={{ color: 'aqua' }}>{element.contact}</h4>
                                            <br />
                                            {element.debt > 0 ? <h4 style={{ color: 'aqua' }}>₹ {element.debt}</h4> : <h4 style={{ color: 'var(--danger)' }}>₹ {element.debt}</h4>}
                                            <br />

                                        </center>
                                    </div>)
                            }
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Contacts