import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Redirect } from 'react-router-dom';

// should show promo page or landing page based on session state
/**
 * Home component
 * @returns {object} The home react obbject
 */
class Home extends Component {
  /**
   * Adds two numbers together.
   * @param {shape} props The props
   * @returns {int} The sum of the two numbers.
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticated: false,
    };
  }

  componentDidMount = () => {
    // check authenticated
    Auth.currentSession()
      .then(() => {
        this.setState({ authenticated: true, loading: false });
      })
      .catch(() => {
        // no user detected
        this.setState({ authenticated: false, loading: false });
      });
  }

  render = () => {
    const { loading, authenticated } = this.state;

    if (loading) {
      return (
        <div><p>Loading ...</p></div>
      );
    }

    //  should redirect to app landing page
    if (authenticated) {
      return (
        <Redirect to="/app" />
      );
    }

    return (
      <div><p>Promo page here ...</p></div>
    );
  }
}

export default Home;
