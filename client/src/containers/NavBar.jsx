import React, { Component } from 'react'

class NavBar extends Component {

    render() {
        return <div className="topnav">
            <div className="topnav-centered">
                <a href="" className="active">Made By Sukant Thakur</a>
            </div>

            <a href="">Offers</a>
            <a href="">Contact Us</a>

            <div className="topnav-right">
                <a href="#">Log In</a>
                <a href="#">Sign Up</a>
            </div>
        </div>
    }
}

export default NavBar