import React, { Component } from 'react';

import Spinner from "../components/Spinner/Spinner";
import AuthContext from '../context/auth-context';
import CharityList from '../components/Charities/CharityList'


class CharityPage extends Component {
    state = {
        isLoading: false,
        charities: []
    };

    static contextType = AuthContext

    componentDidMount() {
        this.fetchCharities();
    }

    fetchCharities = () => {
        this.setState({});
    }

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? (
                    <Spinner />
                ) : (
                
                    <CharityList
                        charities={this.state.charities} onDelete={this.unfollowCharityHandler}
                />
                )}
            </React.Fragment>
        );
    }
}

export default CharityPage;