import React, { Component } from 'react';

import './Auth.css';
import AuthContext from '../context/auth-context';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';




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

      <div id="maindiv">

        <Jumbotron fluid id="jumbo">


          <div>


      
            <Form id="signin">
              <Form.Group controlId="formBasicEmail" onSubmit={this.submitHandler}>
                <Form.Label>

                </Form.Label>
                <Form.Label>Email address: </Form.Label>
                <br></br>
                <input type="email" id="email" ref={this.emailEl} />
                {/* <Form.Control type="email" placeholder="Enter email" /> */}
                {/* <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text> */}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password: </Form.Label>
                <br></br>
                <input type="password" id="password" ref={this.passwordEl} />
                {/* <Form.Control type="password" placeholder="Password" /> */}
              </Form.Group>
              {/* <Form.Group controlId="formBasicChecbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group> */}
              <Button variant="primary" type="submit">
                Submit
  </Button>
              <Button type="button" onClick={this.switchModeHandler}>
                Switch to {this.state.isLogin ? 'Signup' : 'Login'}
              </Button>

            </Form>
          </div>

        </Jumbotron>


        <CardGroup id="card">
          <Card>
            <Card.Img variant="top" id="img1" src="https://images.pexels.com/photos/1493374/pexels-photo-1493374.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <Card.Body>
              <Card.Title>Volunteer</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis lectus, facilisis id enim nec.
      </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"></small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" id="img2" src="https://cdn.pixabay.com/photo/2016/03/05/21/21/agree-1238964_1280.jpg" />
            <Card.Body>
              <Card.Title>Organize</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis lectus, facilisis id enim nec.{' '}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"></small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" id="img3" src="https://cdn.pixabay.com/photo/2014/09/26/21/51/heart-462873_1280.jpg" />
            <Card.Body>
              <Card.Title>Donate</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis lectus, facilisis id enim nec.
      </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"></small>
            </Card.Footer>
          </Card>
        </CardGroup>




        <Container>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/678637/pexels-photo-678637.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="First slide"
                id="img-1"
              />
              <Carousel.Caption>
                <h3>Impact Lives</h3>
                {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.pixabay.com/photo/2017/07/29/00/09/child-2550326_1280.jpg"
                alt="Third slide"
                id="img-2"
              />

              <Carousel.Caption>
                <h4>Change Futures</h4>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.pixabay.com/photo/2017/02/03/17/41/poverty-2035694_1280.jpg"
                alt="Third slide"
                id="img-3"
              />

              <Carousel.Caption>
                <h2>Lend A Helping Hand</h2>
                {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>

        <CardGroup id="card">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
    </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Cras justo odio</ListGroupItem>
              <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>

          </Card>




        </CardGroup>
        <Card>

          <Card.Body id="footer">
            <Card.Title>Helping Hands 2019
    <br></br>
              UCF Coding Bootcamp
    </Card.Title>
            <Card.Text>
              Eric Naiman<br></br>
              Dylan Armstrong<br></br>
              Kyle Caplis<br></br>
            </Card.Text>

          </Card.Body>
        </Card>
      </div>






    );

  }

}


export default AuthPage;