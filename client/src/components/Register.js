import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import { registerUser, selectUserError } from '../features/users/usersSlice';

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userError = useSelector(selectUserError);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return setError('Please provide unique name');
    if (!email) return setError('Please provide unique email');
    if (!password) return setError('Please provide password');

    if (password !== confirmPassword) {
      setError('Your password fields do not match');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    const action = await dispatch(registerUser({ name, email, password }));

    if (action.type === 'users/registerUser/fulfilled') {
      if (action.payload.error) {
        setError(userError);
      } else {
        history.push('/users/profile');
      }
    } else if (action.type === 'users/registerUser/rejected') {
      setError(userError);
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Container>
      <h4>
        Please fill in your details and register! Already registered?{' '}
        <LinkContainer to='/users/login' className='mt-2 mb-3'>
          <Button variant='secondary'>Sign In</Button>
        </LinkContainer>
      </h4>
      <Form onSubmit={handleSubmit}>
        {error ? <Alert variant='danger'>{error}</Alert> : null}

        <Form.Group controlId='formBasicName'>
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter unique name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPasswordConfirm'>
          <Form.Label className='text-center'>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <p className='text-center mt-4'>
          <Button variant='secondary' type='submit'>
            Register
          </Button>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
