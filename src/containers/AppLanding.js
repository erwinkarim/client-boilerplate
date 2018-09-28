import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';

/**
 * App Landing component
 * First page when user logs in
 * @returns {object} The App Landing react obbject
 */
const AppLanding = () => (
  <div><p>App Landing</p></div>
);

export default withAuthenticator(AppLanding);
