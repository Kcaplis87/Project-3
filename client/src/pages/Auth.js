import React, { Component } from 'react';

import './Auth.css';
import AuthContext from '../context/auth-context';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  // connecting to get auth-context data
  static contextType = AuthContext;


  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
          query Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              userId
              token
              tokenExpiration
            }
          }
        `,
      variables: {
        email: email,
        password: password
      }
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
            mutation CreateUser($email: String!, $password: String!) {
              createUser(userInput: {email: $email, password: $password}) {
                _id
                email
              }
            }
          `,
        variables: {
          email: email,
          password: password
        }
      };
    }


    // send request data to graphql
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {


    return (
      <div>
        <Jumbotron fluid id="jumbo">
          <Container>
            <form className="auth-form" onSubmit={this.submitHandler}>
              <div className="form-control">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" ref={this.emailEl} />
              </div>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordEl} />
              </div>
              <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={this.switchModeHandler}>
                  Switch to {this.state.isLogin ? 'Signup' : 'Login'}
                </button>
              </div>
            </form>
          </Container>
        </Jumbotron>
        <CardGroup>
        <Card>
    <Card.Img variant="top" src="https://images.pexels.com/photos/1493374/pexels-photo-1493374.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This card has supporting text below as a natural lead-in to additional
        content.{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://images.pexels.com/photos/1266005/pexels-photo-1266005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
        </CardGroup>
      </div>
      

 

    );

  }

}


export default AuthPage;