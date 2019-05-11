import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/auth-context';
import './mainNavigation.css';


const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <React.Fragment>
                    <header className="main-navigation">
                        <h1>The Charity App that lends a hand</h1>
                        <div className="main-naviation_logo">

                        </div>



                        <nav className="main-navigation_items">

                            <ul>
                                {!context.token && (
                                    <li>
                                        <NavLink to="/auth">Authenticate</NavLink>
                                    </li>
                                )}
                                {!context.token && (
                                    <li>
                                        <NavLink to="/events">Events</NavLink>
                                    </li>
                                )}
                                {!context.token && (
                                    <li>
                                        <NavLink to="/charities">Charities</NavLink>
                                    </li>
                                )}
                                {!context.token && (
                                    <li>
                                        <NavLink to="/bookings">Bookings</NavLink>
                                    </li>
                                )}
                                <li>
                                    <Button onClick={context.logout}>Logout</Button>
                                </li>


                            </ul>
                        </nav>
                    </header>
                </React.Fragment>
            )

        }}

    </AuthContext.Consumer>
)


export default mainNavigation;