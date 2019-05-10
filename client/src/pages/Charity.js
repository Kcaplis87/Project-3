import React, { Component } from 'react';
import Spinner from "../components/Spinner/Spinner";
import AuthContext from '../context/auth-context';
import CharityList from '../components/Charities/CharityList';
import { List } from '../components/List';
import API from '../utils/API';

class CharityPage extends Component {
    state = {
        isLoading: false,
        charities: []
    };

    static contextType = AuthContext

    componentDidMount() {
        this.getSavedCharities();
      }

      getSavedCharities = () => {
        API.getSavedCharities()
          .then(res =>
            this.setState({
              charities: res.data
            })
          )
          .catch(err => console.log(err));
      };

      handleCharityDelete = id => {
        API.deleteCharity(id).then(res => this.getSavedCharities());
      };

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? (
                    <Spinner />
                ) : (
                    <List>
                    <h1 className="text-center">
                  <strong>Charity Search</strong>
                </h1>
                <h2 className="text-center">Search for and Save Charities of Interest.</h2>
                    
                      {this.state.charities.map(charity => (
                        <CharityList
                          key={charity._id}
                          charityName={charity.charityName}
                          url={charity.url}
                          donationUrl={charity.donationUrl}
                          city={charity.city}
                          state={charity.state}
                          score={charity.score}
                          category={charity.category}
                          missionStatement={charity.missionStatement}
                          Button={() => (
                            <button
                              onClick={() => this.handleCharityDelete(charity._id)}
                              className="btn btn-danger ml-2">Delete
                            </button>
                          )}
                        />
                      ))};
                    </List>
        )};
    </React.Fragment>
    )};
}

export default CharityPage;