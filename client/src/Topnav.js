import React, { Component } from 'react'
import {Navbar, Container, Nav } from 'react-bootstrap'
import { BiGlobeAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom';

export default class Topnav extends Component {  //Child Class
  constructor(props) {          // Child Constructor
    super(props)    // call props from Parent
    this.state = {
      
    }
  }
  render() {
    return (
      <div>
        <Navbar fixed="top" bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <BiGlobeAlt className='logo' color={'#475d7c'} size={40} />
              <Navbar.Text class='brand'> iService</Navbar.Text>
              {/* <span class='brand'> iService</span> */}
              </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className="me-auto ">
                {/*How do I use these links without refreshing the page?
                  they are currently sending a request to the server 
                  and then being routed back to the client.
                  How to keep the link within the client?
                  
                  Answer: use 'to' attribute instead of 'href' to use spa routing and prevent from refreshing 
                  Also see: https://stackoverflow.com/questions/54843302/reactjs-bootstrap-navbar-and-routing-not-working-together
                */}
                <Nav.Link className='link' as={Link} to="/newtask">New Task</Nav.Link>
                <Nav.Link className='link' as={Link} to="/findtask">Find Task</Nav.Link>
                <Nav.Link className='link' as={Link} to="/ourexperts">Experts</Nav.Link>

                {/* <Nav.Link className='link' href="#">How it Works</Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  <Nav.Link as={Link} to="/login">Sign In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}