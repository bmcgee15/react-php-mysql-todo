import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import Footer from './components/footer';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      action: 'all',
      query: ''
    };
  }

  renderItem({ id, item_name, item_description, item_assignment, due_date }) {
    return (
      <tr key={id}>
        <td>{item_name}</td>
        <td>{item_description}</td>
        <td>{item_assignment}</td>
        <td>{due_date}</td>
      </tr>
    );
  }

  componentDidMount() {
    fetch(
      'https://csunix.mohawkcollege.ca/~000207475/portfolio/5/backend.php',
      {
        method: 'POST',
        headers: new Headers(),
        body: JSON.stringify({
          action: this.state.action,
          query: this.state.query
        })
      }
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ items: data });
        console.log(this.state.items);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="body">
          <h2>Taskr Items</h2>
          <table id="myTable">
            <tbody>
              <tr className="header">
                <th id="header1">Task</th>
                <th id="header2">Description</th>
                <th id="header3">Assigned</th>
                <th id="header4">Due</th>
              </tr>
              {this.state.items.map(this.renderItem.bind(this))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      action: 'search',
      query: ''
    };
  }

  textChangeHandler = event => {
    this.setState({
      query: event.target.value
    });
    this.filterItems();
    console.log(`${JSON.stringify(this.state)}`);
  };

  submitHandler = event => {
    event.preventDefault();
    this.filterItems();
    console.log(`STATE: ${JSON.stringify(this.state)}`);
    document.getElementById('usr').focus(); // TRY TO FIGURE PROPER REACT WAY?
  };

  filterItems() {
    var formData = new FormData();
    formData.append('query', this.state.query);
    console.log(this.state.query);
    fetch('https://csunix.mohawkcollege.ca/~000207475/portfolio/5/search.php', {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ items: data });
        console.log(this.state.items);
      })
      .catch(err => console.log(err));
  }

  // filterItems() {
  //   console.log(this.state.query);
  //   fetch('https://csunix.mohawkcollege.ca/~000207475/portfolio/5/search.php', {
  //     method: 'POST',
  //     headers: new Headers(),
  //     body: JSON.stringify({
  //       action: this.state.action,
  //       query: this.state.query
  //     })
  //   })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       this.setState({ items: data });
  //       console.log(this.state.items);
  //     })
  //     .catch(err => console.log(err));
  // }

  renderItem({ id, item_name, item_description, item_assignment, due_date }) {
    return (
      <tr key={id}>
        <td>{item_name}</td>
        <td>{item_description}</td>
        <td>{item_assignment}</td>
        <td>{due_date}</td>
      </tr>
    );
  }

  componentDidMount() {
    // fetch('https://csunix.mohawkcollege.ca/~000207475/portfolio/5/backend.php')
    fetch('https://csunix.mohawkcollege.ca/~000207475/portfolio/5/backend.php')
      .then(response => response.json())
      .then(data => {
        this.setState({ items: data });
        console.log(this.state.items);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="body">
          <h2>Search Taskr Items</h2>
          <form onSubmit={this.submitHandler}>
            <div>
              <input
                autoFocus
                name="text"
                placeholder="Search"
                value={this.state.query}
                onChange={this.textChangeHandler}
                type="text"
                className="form-control"
                id="usr"
              />
            </div>
            <button type="submit" className="btn btn-success col-xs-2">
              Filter Items
            </button>
          </form>
          <table id="myTable">
            <tbody>
              <tr className="header">
                <th id="header1">Task</th>
                <th id="header2">Description</th>
                <th id="header3">Assigned</th>
                <th id="header4">Due</th>
              </tr>
              {this.state.items.map(this.renderItem.bind(this))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  setQuery() {
    let q = document.getElementById('searchbar').innerText;
    this.setState({ query: q });
    console.log(this.state.query);
    this.filterItems();
  }
}

class Edit extends React.Component {
  render() {
    return (
      <div>
        <div className="body">
          <p>Edit</p>
        </div>
      </div>
    );
  }
}

class About extends React.Component {
  render() {
    return (
      <div>
        <div className="about">
          <h2>About Taskr</h2>
          <p>
            Taskr is the task manager component of a larger project management
            application called 2Done.
          </p>
          <p>
            Tasker allows you to create, edit, delete, set due dates and assign
            people to the task.
          </p>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="app">
        {/* <Header /> */}
        <Router>
          <div>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
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
            </header>
            <hr />
            <Route exact path="/" component={Items} />
            <Route path="/search" component={Search} />
            <Route path="/edit" component={Edit} />
            <Route path="/about" component={About} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
