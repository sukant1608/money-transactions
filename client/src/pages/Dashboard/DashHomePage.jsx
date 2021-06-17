import React, { Component } from 'react'
import { connect } from 'react-redux'

import HomeComp from './HomeComp'
import Contacts from './Contacts'
import Transaction from './Transaction'
import Profile from './Profile'
import { logout } from '../../store/actions'

class DashHomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentActive: "1",
            selected: true
        }
    }
    handelOnClick(e) {
        this.setState({ currentActive: e })
    }
    handleOptions() {
        const { name, mobile } = this.props
        switch (this.state.currentActive) {
            case "1":
                return <HomeComp mobile={mobile} />
            case "2":
                return <Contacts mobile={mobile} />
            case "3":
                return <Profile name={name} mobile={mobile} />
            case "4":
                return <Transaction mobile={mobile} />
            case "5":
                return <h2>Worl</h2>
            case "6":
                return <h2>World</h2>
            default:
                return <h1>None</h1>
        }
    }
    handleLogout() {

        window.location.reload(false)

    }
    render() {
        const { selected } = this.state
        return <div class="main_box">
            <input type="checkbox" id="check" />
            <div class="btn_one">
                <label for="check">
                    <i class="fas fa-bars"></i>
                </label>
            </div>
            <div class="sidebar_menu">
                <div style={{ backgroundColor: '#141114' }} class="logo">
                    <a href="/">Udhar</a>
                </div>
                <div class="btn_two">
                    <label for="check">
                        <i class="fas fa-times"></i>
                    </label>
                </div>

                <div class="menu">
                    <ul style={{ backgroundColor: '#141114' }}>
                        <li>
                            <div class="fas fa-qrcode"></div>
                            <div onClick={() => this.handelOnClick("1")} >Home</div>
                        </li>
                        <li>
                            <div class="fas fa-phone-volume"></div>
                            <div onClick={() => this.handelOnClick("2")} >Contact</div>
                        </li>
                        <li>
                            <div class="fas fa-link"></div>
                            <div onClick={() => this.handelOnClick("3")} >Profile</div>
                        </li>
                        <li>
                            <div class="fas fa-stream"></div>
                            <div onClick={() => this.handelOnClick("4")} >Transactions</div>
                        </li>
                        <li>
                            <div class="far fa-lock" ></div>
                            <div onClick={() => { this.props.logout(); this.handleLogout() }} >Logout</div>
                        </li>
                        <li>
                            <div ></div>
                            <div ></div>
                            {/* <div class="fas fa-calendar-week"></div>
                            <div onClick={() => this.handelOnClick("5")} >Offers</div> */}
                        </li>
                        <li>
                            <div ></div>
                            <div ></div>
                            {/* <div class="far fa-comments"></div>
                            <div onClick={() => this.handelOnClick("6")}>Feedback</div> */}
                        </li>

                        <li>
                            <div ></div>
                            <div ></div>
                        </li>
                        <li>
                            <div ></div>
                            <div ></div>
                        </li>
                        <li>
                            <div ></div>
                            <div ></div>
                        </li>
                        <li>
                            <div ></div>
                            <div ></div>
                        </li>

                    </ul>
                </div>
                <div class="social_media">
                    <ul>
                        <a href="https://github.com/sukant1608"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://github.com/sukant1608"><i class="fab fa-twitter"></i></a>
                        <a href="https://github.com/sukant1608"><i class="fab fa-instagram"></i></a>
                        <a href="https://github.com/sukant1608"><i class="fab fa-youtube"></i></a>
                    </ul>
                </div>
            </div>
            <div>
                {this.handleOptions()}
            </div>
        </div>
    }
}

export default connect((store) => ({ name: store.auth.user.username, mobile: store.auth.user.mobile }), { logout })(DashHomePage);