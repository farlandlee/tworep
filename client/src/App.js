import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
      <HelmetProvider>
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/volumes" element={<Volumes />} />
              <Route path="/contact" element={<Contact title="Contact Us" />} />
              <Route path="/about" element={<About title="About Us" />} />
              <Route path="/article/:id" element={<Article />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Router>
          <Footer />
        </div>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
