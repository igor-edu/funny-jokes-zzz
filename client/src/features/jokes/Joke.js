import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { useHistory } from 'react-router';

import { selectUser } from '../users/usersSlice';
import { jokeDeleted, selectJokeById, updateJoke } from './jokesSlice';

const Joke = ({ jokeId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const joke = useSelector((state) => selectJokeById(state, jokeId));
  const user = useSelector(selectUser);
  const token = user && user.token;

  const updateVote = (e) => {
    if (!user) {
      return history.push('/users/login');
    }

    const iconName = e.target.closest('button').dataset.iconName;

    dispatch(updateJoke({ jokeId, iconName, token }));
  };

  const handleDelete = () => {
    dispatch(jokeDeleted({ jokeId, token }));
  };

  const myJoke = user && user.name === joke.creator;

  return (
    <Card className={`Joke mb-3 ${myJoke ? 'mine' : ''}`}>
      <Card.Body>
        <Card.Title>
          {joke.title} {myJoke ? <i className='fas fa-user-check'></i> : ''}
        </Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          created by: {myJoke ? 'me' : joke.creator},{' '}
          {formatDistanceToNow(new Date())} ago
        </Card.Subtitle>
        <Card.Text>{joke.content.slice(0, 500)}</Card.Text>
        <>
          <Button
            data-icon-name='votesUp'
            onClick={updateVote}
            variant='outline-primary'
            disabled={myJoke}
          >
            {joke.votesUp.length} <i className='fas fa-arrow-up'></i>
          </Button>{' '}
          <Button
            data-icon-name='votesDown'
            onClick={updateVote}
            variant='outline-success'
            disabled={myJoke}
          >
            {joke.votesDown.length} <i className='fas fa-arrow-down'></i>
          </Button>{' '}
          <Button
            data-icon-name='likes'
            onClick={updateVote}
            variant='outline-danger'
            disabled={myJoke}
          >
            {joke.likes.length} <i className='far fa-heart'></i>
          </Button>{' '}
        </>
        {myJoke ? (
          <Button onClick={handleDelete} variant='outline-dark'>
            <i className='far fa-trash-alt'></i>
          </Button>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default Joke;
