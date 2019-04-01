import React from 'react';
import Header from './header';
import Footer from './footer';

export default class Search extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="body">
          <p>Search</p>
        </div>
        <Footer />
      </div>
    );
  }
}
