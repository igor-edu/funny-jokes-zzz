import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import MyNavbar from './components/MyNavbar';
import Profile from './components/Profile';
import Register from './components/Register';
import AddNewJoke from './features/jokes/AddNewJoke';
import Jokes from './features/jokes/Jokes';

function App() {
  return (
    <Router>
      <section className='App'>
        <MyNavbar></MyNavbar>
        <div className='App-main'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/jokes' component={Jokes} />
            <Route exact path='/jokes/add' component={AddNewJoke} />
            <Route exact path='/users/login' component={Login} />
            <Route exact path='/users/register' component={Register} />
            <Route exact path='/users/profile' component={Profile} />
            <Route>
              <Container>
                <h2>No Match. Please use links above.</h2>
              </Container>
            </Route>
          </Switch>
        </div>
        <Footer />
      </section>
    </Router>
  );
}

export default App;
