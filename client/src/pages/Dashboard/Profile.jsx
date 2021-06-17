import React, { Component } from 'react'

class Profile extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="homeComp">
            <h1>Your Profile</h1>
            <br /><br />
            <h4 style={{ color: "white" }}>Your Name : {this.props.name}</h4>
            <br /><br />
            <h4 style={{ color: "white" }}>Your Mobile : {this.props.mobile}</h4>
        </div>
    }
}

export default Profile