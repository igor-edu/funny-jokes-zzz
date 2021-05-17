import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import Joke from '../features/jokes/Joke';
import { fetchJokes, selectAllJokes } from '../features/jokes/jokesSlice';
import { selectUser } from '../features/users/usersSlice';

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJokes());
  }, [dispatch]);

  const user = useSelector(selectUser);
  const allJokes = useSelector(selectAllJokes);
  const myJokes = allJokes.filter((joke) => joke.creator === user.name);

  if (!user) {
    return history.push('/users/login');
  }

  return (
    <Container className='Profile'>
      <h2>Welcome to your profile, {user.name}</h2>

      <p className='mt-4'>
        <LinkContainer to='/jokes'>
          <Button variant='secondary'>See Other Jokes</Button>
        </LinkContainer>{' '}
        <LinkContainer to='/jokes/add'>
          <Button variant='secondary'>Create New Joke</Button>
        </LinkContainer>
      </p>

      {myJokes.length === 0 ? (
        <h3 className='mt-3'>
          You have not created any jokes yet.{' '}
          <LinkContainer to='/jokes/add'>
            <Button variant='secondary'>Create your first joke</Button>
          </LinkContainer>
        </h3>
      ) : (
        <h3 className='mt-3'>Here is a list of jokes you created:</h3>
      )}

      {myJokes.map((joke) => (
        <Joke jokeId={joke._id} key={joke._id} />
      ))}
    </Container>
  );
};

export default Profile;
