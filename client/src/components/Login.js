import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import { loginUser, selectUserError } from '../features/users/usersSlice';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userError = useSelector(selectUserError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please provide email');
      return;
    }
    if (!password) {
      setError('Please provide password');
      return;
    }

    setError('');

    const action = await dispatch(loginUser({ email, password }));

    if (action.type === 'users/loginUser/fulfilled') {
      history.push('/users/profile');
    } else if (action.type === 'users/loginUser/rejected') {
      setPassword('');
    }
  };

  return (
    <Container>
      <h4>
        Please login!
        <br /> Not yet registered?{' '}
        <LinkContainer to='/users/register' className='ml-4'>
          <Button variant='secondary'>Register</Button>
        </LinkContainer>
      </h4>
      <Form onSubmit={handleSubmit}>
        {userError ? <Alert variant='danger'>{userError}</Alert> : null}
        {error ? <Alert variant='danger'>{error}</Alert> : null}

        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>

        <p className='text-center mt-4'>
          <Button variant='secondary' type='submit'>
            Login
          </Button>
        </p>
      </Form>
    </Container>
  );
};

export default Login;
