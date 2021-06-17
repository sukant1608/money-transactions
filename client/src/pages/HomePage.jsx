import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { authUser } from "../store/actions"

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blurIsActive: true,
            loginFormIsActive: false,
            signFormIsActive: false,
            username: "",
            mobile: "",
            password: "",
            email: ""
        }
        if (this.props.auth) {
            let path = `dashboard`;
            this.props.history.push(path);
        }
        this.handleLogInToggle = this.handleLogInToggle.bind(this)
        this.handleSignInToggle = this.handleSignInToggle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleLogInToggle = () => {
        this.setState({ blurIsActive: !this.state.blurIsActive, loginFormIsActive: !this.state.loginFormIsActive })
        this.setState({
            username: "",
            mobile: "",
            password: "",
            email: ""
        })
    }
    handleSignInToggle = () => {
        this.setState({ blurIsActive: !this.state.blurIsActive, signFormIsActive: !this.state.signFormIsActive })
        this.setState({
            username: "",
            mobile: "",
            password: "",
            email: ""
        })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = async (e) => {
        const { username, email, password, mobile } = this.state
        const authType = e.target.name
        e.preventDefault()
        await this.props.authUser(authType || "login", { username, password, email, password, mobile })
        window.location.reload();

    }
    render() {
        const { blurIsActive, loginFormIsActive, signFormIsActive, username, mobile, password, email } = this.state
        return <>
            <div className={`container ${blurIsActive ? "" : "active"}`} id="blur">
                <div className="topnav">
                    <div className="topnav-centered">
                        <a href="" className="active">Made By Sukant Thakur</a>
                    </div>

                    <a href="">Offers</a>
                    <a href="">Contact Us</a>

                    <div className="topnav-right">
                        <a ><div className="auth-box" onClick={this.handleLogInToggle} href="/">Log In</div></a>
                        <a ><div className="auth-box" onClick={this.handleSignInToggle} href="/">Sign Up</div></a>
                    </div>
                </div>
                <div className="sign">
                    <span className="flicker">U</span>
                    <span className="">d</span><span className="fast-flicker">ha</span>r
                </div>
                <div className="home-box">
                    <div className="home-box-child">
                        <h1>What is Udhar?</h1>
                        <p>
                            It is a record maintaining platform where you can sign up and record
                            all your expenses. It provides you a place to manage your money
                            transactions and also keep record of all the money you have lended
                            or borrowed from people. All that for freeee!!!
                        </p>
                    </div>
                    <div className="home-box-child">
                        <img
                            src="https://i1.wp.com/media.giphy.com/media/xT5LMMDSxJappDIPx6/giphy.gif?resize=480%2C362&ssl=1"
                            alt="Money Spending"
                            style={{ width: "85%" }}
                        />
                    </div>
                </div>
                <div style={{ top: "150vh", marginTop: "150px" }} className="home-box">
                    <div className="home-box-child">
                        <img
                            src="http://clipartmag.com/images/animated-computer-images-29.gif"
                            alt="Money Spending"
                            style={{ width: "85%" }}
                            id="home-img"
                        />
                    </div>
                    <div className="home-box-child">
                        <h1>How to use it?</h1>
                        <p>
                            It is really very easy to use Udhar all you need is a email id and
                            mobile phone to register. NO opening charges and NO maintainence
                            cost. You will understand the process as you register.
                        </p>
                    </div>
                </div>
            </div>

            <div className={loginFormIsActive ? "active" : ""} id="login-form">
                <center>
                    <h1>Log In</h1>
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Your mobile number"
                        name="mobile"
                        onChange={this.handleChange}
                        value={mobile}
                        autoComplete="off"
                    />
                    <br /><br />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Your Password"
                        name="password"
                        onChange={this.handleChange}
                        value={password}
                    />
                    <br /><br />
                    <button onClick={this.handleSubmit} name="login" className="light-btn">Login</button>
                    <button className="dark-btn" onClick={this.handleLogInToggle}>Not Now</button>
                    <br /><br />
                </center>
            </div>
            <div className={signFormIsActive ? "active" : ""} id="sign-form">
                <center>
                    <h1>Sign Up</h1>
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Your username"
                        name="username"
                        onChange={this.handleChange}
                        value={username}
                        autoComplete="off"

                    />
                    <br /><br />
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Your mobile number"
                        name="mobile"
                        onChange={this.handleChange}
                        value={mobile}
                        autoComplete="off"

                    />
                    <br /><br />
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Your Email address"
                        name="email"
                        onChange={this.handleChange}
                        value={email}
                        autoComplete="off"

                    />
                    <br /><br />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Your Password"
                        name="password"
                        onChange={this.handleChange}
                        value={password}
                    />
                    <br /><br />
                    <button onClick={this.handleSubmit} name="register" className="light-btn">Sign Up</button>
                    <button className="dark-btn" onClick={this.handleSignInToggle}>Not Now</button>
                    <br /><br />
                </center>
            </div>
            <div className="home-slide"></div>
        </>
    }
}

export default withRouter(connect((store) => ({ auth: store.auth.isAuthenticated }), { authUser })(HomePage))