import Amplify from 'aws-amplify';
import awsExports from '../aws-exports';

const AuthSpec = {

  // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
  identityPoolId: process.env.REACT_APP_AWS_COGNITO_IDENT_POOL,

  // REQUIRED - Amazon Cognito Region
  region: process.env.REACT_APP_AWS_REGION,

  // OPTIONAL - Amazon Cognito Federated Identity Pool Region
  // Required only if it's different from Amazon Cognito Region
  // identityPoolRegion: 'XX-XXXX-X',
  identityPoolRegion: process.env.REACT_APP_AWS_REGION,

  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL,

  // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_APP_ID,

  // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
  mandatorySignIn: false,

  // OPTIONAL - Configuration for cookie storage
  /*
  cookieStorage: {
    // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    domain: '.yourdomain.com',
    // OPTIONAL - Cookie path
    path: '/',
    // OPTIONAL - Cookie expiration in days
    expires: 365,
    // OPTIONAL - Cookie secure flag
    secure: true
  },
  */

  // OPTIONAL - customized storage object
  // storage: new MyStorage(),

  // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
  // authenticationFlowType: 'USER_PASSWORD_AUTH',
  authenticationFlowType: 'USER_SRP_AUTH',
};

const configureAmp = () => {
  Amplify.configure(awsExports);
  Amplify.configure({
    Auth: AuthSpec,
    // API: ApiSpec,
  });
};

export default configureAmp;
