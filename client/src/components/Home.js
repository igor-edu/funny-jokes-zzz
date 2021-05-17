import { Button, Container, Jumbotron, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Home = () => {
  return (
    <Container className='Home'>
      <section className='text-center'>
        <Jumbotron>
          <h1>Welcome to Funny Jokes!!!</h1>
          <p>
            Here you can find a list of jokes, vote on them, add your own...
            Have fun!
          </p>
          <p>
            <LinkContainer to='/jokes'>
              <Button variant='secondary'>See All Jokes</Button>
            </LinkContainer>{' '}
            <LinkContainer to='/jokes/add'>
              <Button variant='secondary'>Create New Joke</Button>
            </LinkContainer>
          </p>
        </Jumbotron>
      </section>
      <section className='mt-4'>
        <h2 className='pl-4 text-center'>Rules of the game:</h2>
        <ListGroup>
          <ListGroup.Item>
            You can only vote on other people's jokes.
          </ListGroup.Item>
          <ListGroup.Item>
            Each user can only give one (or none) upvote, downvote or like for
            each joke.
          </ListGroup.Item>
          <ListGroup.Item>
            Once a joke is uploaded it can not be modified, only deleted by
            creator.
          </ListGroup.Item>
          <ListGroup.Item>
            Jokes can be sorted by using specific sort method.
          </ListGroup.Item>
          <ListGroup.Item>
            Maximum number of characters per joke is 500.
          </ListGroup.Item>
        </ListGroup>
      </section>
    </Container>
  );
};

export default Home;
