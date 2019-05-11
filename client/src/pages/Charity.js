import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import API from '../utils/API';
import Spinner from "../components/Spinner/Spinner";
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from '../components/Form';
import { List } from '../components/List';
import CharityList from '../components/Charity/CharityList';

class CharityPage extends Component {
  state = {
    isLoading: false,
    charities: [],
    q: ""
  };

  static contextType = AuthContext

  componentDidMount() {
    this.getCharities();
    this.setState();
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getCharities();
  };

  getCharities = () => {
    API.getCharities(this.state.q)
      .then(res =>
        this.setState({
          charities: res.data
        })
      )
      .catch(() =>
        this.setState({
          charities: [],
          message: "No Charity Found, Try a Different Keyword"
        })
      );
  };

  getSavedCharities = () => {
    API.getSavedCharities()
      .then(res =>
        this.setState({
          charities: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleCharitySave = id => {
    const charity = this.state.charities.find(charity => charity.id === id);

    API.saveCharity({
      url: charity.url,
      donationUrl: charity.data.donationUrl,
      state: charity.data.state,
      score: charity.data.score,
      category: charity.data.category,
      website: charity.data.website,
      missionStatement: charity.data.missionStatement
    }).then(() => this.getSavedCharities());
  };

  render() {
    return (
      <div id="maindiv">
        <React.Fragment>
          {this.state.isLoading ? (
            <Spinner />
          ) : (
              <Container>
                <Jumbotron fluid id="jumbo">
                  <div id="flex-container">
                    <h1 className="text-center">
                      <strong>Charity Search</strong>
                    </h1>
                    <br></br>
                    <Form handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit} q={this.state.q} />
                  </div>
                </Jumbotron>
                <List>
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
                          onClick={() => this.handleCharitySave(charity._id)}
                          className="btn btn-primary ml-2">Save Charity
                            </button>
                      )}
                    />
                  ))}
                </List>
              </Container>
            )};
    </React.Fragment>
      </div>
    )
  };
}

export default CharityPage;