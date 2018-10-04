import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const About = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="headline" component="h3">
            About
          </Typography>
          <Typography component="p">
            Put your company history and team members here.
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

About.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(About);
