import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Routes from './Routes';
import './App.css';
import TopNav from './components/TopNav';
import configureAmp from './libs/amplify';

configureAmp();

const styles = theme => ({
  root: {
    flexGrow: 1,
    /*
      breakpoints to limit width based on screen size. you can
      comment out below to remove width limits
     */
    [theme.breakpoints.up('md')]: {
      maxWidth: '960px',
      marginTop: theme.spacing.unit * 2,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1280px',
      marginTop: theme.spacing.unit * 2,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const App = (props) => {
  const { classes } = props;

  return (
    <div className="App">
      <TopNav />
      <Grid container spacing={12} className={classes.root}>
        <Routes />
      </Grid>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(App);
