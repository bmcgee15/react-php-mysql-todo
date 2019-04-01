import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Items from './items';
import Search from './search';
import Edit from './edit';
import About from './about';

export default class Header extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <p>Header</p>
          <ul>
            <li>
              <NavLink exact to="/">
                Items
              </NavLink>
            </li>
            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
            <li>
              <NavLink to="/edit">Edit</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
          <hr />
          <Route exact path="/" component={Items} />
          <Route path="/search" component={Search} />
          <Route path="/edit" component={Edit} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}
