import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.scss';
import {
  Navbar,
  Home,
  Contact,
  About,
  Search,
  Volumes,
  NoMatch,
  Article,
  Footer
} from './components';

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/volumes" component={Volumes} />
            <Route path="/contact" render={() => <Contact title="Contact Us" />} />
            <Route path="/about" render={() => <About title="About Us" />} />
            <Route path="/article" component={Article} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
