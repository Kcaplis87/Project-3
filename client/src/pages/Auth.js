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
      <text>
        <br></br>
        <br></br>
        <br></br>
    
  
      </text>

          <div class="flex-container">
            <div>
            <CardGroup id="card">
        <Card>
    <Card.Img variant="top" id="img1" src="https://images.pexels.com/photos/1083619/pexels-photo-1083619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
    <Card.Body>
      <Card.Title>Volunteer</Card.Title>
      <Card.Text>
        Find time to give back
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"></small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" id="img2" src="https://images.pexels.com/photos/1020320/pexels-photo-1020320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
    <Card.Body>
      <Card.Title>Organize</Card.Title>
      <Card.Text>
        Easy Booking and setup right from your cellphone{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"></small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" id="img3" src="https://images.pexels.com/photos/921322/pexels-photo-921322.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
    <Card.Body>
      <Card.Title>Donate</Card.Title>
      <Card.Text>
      Give your time, give your heart.... money helps too
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"></small>
    </Card.Footer>
  </Card>
        </CardGroup>
           </div>
      
    <div>
        
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
        </div>
        </div>
        </Jumbotron>
      </div>
      

 

    );

  }

}


export default AuthPage;