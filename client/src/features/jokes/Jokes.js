import React, { useEffect } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Joke from './Joke';
import { fetchJokes, selectAllJokes, selectJokeIds } from './jokesSlice';

const Jokes = ({ location }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJokes());
  }, [dispatch]);

  let jokeIds = useSelector(selectJokeIds);
  let sortedJokes = useSelector(selectAllJokes);
  const sortMethod = location.search && location.search.slice(6);

  if (['votesUp', 'votesDown', 'likes'].includes(sortMethod)) {
    sortedJokes = sortedJokes
      .slice()
      .sort(
        (jokeA, jokeB) => jokeB[sortMethod].length - jokeA[sortMethod].length
      );

    jokeIds = sortedJokes.map((joke) => joke._id);
  }

  if (jokeIds.length === 0) {
    return <h2>No jokes at this time. Please create a new joke!</h2>;
  }

  const renderedJokes = jokeIds.map((jokeId) => (
    <Joke jokeId={jokeId} key={jokeId} />
  ));

  return (
    <Container className='Jokes'>
      <h2>List of all jokes</h2>
      <Alert variant='info'>
        Sort by{' '}
        <LinkContainer to={`/jokes?sort=time`}>
          <Button variant='outline-warning'>
            <i className='far fa-clock'></i>
          </Button>
        </LinkContainer>{' '}
        <LinkContainer to={`/jokes?sort=votesUp`}>
          <Button variant='outline-primary'>
            <i className='fas fa-arrow-up'></i>
          </Button>
        </LinkContainer>{' '}
        <LinkContainer to={`/jokes?sort=votesDown`}>
          <Button variant='outline-success'>
            <i className='fas fa-arrow-down'></i>
          </Button>
        </LinkContainer>{' '}
        <LinkContainer to={`/jokes?sort=likes`}>
          <Button variant='outline-danger'>
            <i className='far fa-heart'></i>
          </Button>
        </LinkContainer>{' '}
      </Alert>
      {renderedJokes}
    </Container>
  );
};

export default Jokes;
