import React from 'react';
import Search from './Search';
import { Router, Link } from '@reach/router';
import Details from './Details';



function App() {
  return (
    <React.StrictMode>
      <div>
        <header>
          <Link to="/">
            Adopt me
          </Link>
        </header>


        <Router>
          <Search path="/" />
          <Details path="/details/:id" />
        </Router>


      </div>
    </React.StrictMode>
  );
}

export default App;
