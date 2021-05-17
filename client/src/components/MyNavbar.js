import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import { setUserLocalStorage } from '../app/localStorage';
import { logoutUser, selectUser } from '../features/users/usersSlice';

const MyNavbar = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    setUserLocalStorage('');
  };

  return (
    <Navbar bg='dark' variant='dark' collapseOnSelect expand='md' fixed='top'>
      <Container>
        <LinkContainer to='/jokes'>
          <Navbar.Brand className='mr-auto'>
            <img
              alt=''
              src='/logo192.png'
              width='30'
              height='30'
              className='d-inline-block align-top'
            />{' '}
            Funny Jokes
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            {user ? (
              <React.Fragment>
                <LinkContainer to='/'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/users/profile'>
                  <Nav.Link>My Profile</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/jokes/add'>
                  <Nav.Link>Add Joke</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/users/login' onClick={handleLogout}>
                  <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <LinkContainer to='/users/login'>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/users/register'>
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
