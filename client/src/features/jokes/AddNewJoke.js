import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectUserToken } from '../users/usersSlice';
import { jokeAdded } from './jokesSlice';

const AddNewJoke = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector(selectUserToken);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return history.push('/users/login');
    }

    const action = await dispatch(
      jokeAdded({ title, content: content.slice(0, 500), token })
    );

    if (action.type === 'jokes/jokeAdded/fulfilled') {
      history.push('/jokes');
    }
  };

  return (
    <Container>
      <h2>Add New Joke</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='exampleForm.ControlInput1'>
          <Form.Label>Joke Title</Form.Label>
          <Form.Control
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </Form.Group>
        <Form.Group controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Joke Content</Form.Label>
          <Form.Control
            as='textarea'
            rows={9}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </Form.Group>
        <p className='text-center mt-3'>
          <Button variant='secondary' type='submit'>
            Create Joke
          </Button>
        </p>
      </Form>
    </Container>
  );
};

export default AddNewJoke;
