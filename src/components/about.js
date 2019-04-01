import React from 'react';
import Header from './header';
import Footer from './footer';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="body">
          <h2>About Taskr</h2>
          <p>
            Taskr is the task manager component of a larger project management
            application called 2Done. Tasker allows you to create, edit, delete,
            set due dates and assign people to the task.
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}
