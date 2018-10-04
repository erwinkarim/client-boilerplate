import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactMarkdown from 'react-markdown';

import privacy from '../docs/privacy.md';
import TOUfile from '../docs/termsOfUse.md';

const styles = theme => ({
  root: {
    // flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

/**
 * Component describing legal user of this app
 * @param {shape} props The props
 * @returns {shape} The component
 */
class Legal extends Component {
  /**
   * The constructor
   * @param {shape} props The props
   * @returns {shape} The component
   */
  constructor(props) {
    super(props);

    this.state = {
      privacyStmt: null,
      termsOfUseStmt: null,
    };
  }

  componentWillMount = () => {
    fetch(privacy)
      .then(response => response.text())
      .then((text) => {
        this.setState({ privacyStmt: text });
      });

    fetch(TOUfile)
      .then(response => response.text())
      .then((text) => {
        this.setState({ termsOfUseStmt: text });
      });
  }

  render = () => {
    const { classes } = this.props;
    const { privacyStmt, termsOfUseStmt } = this.state;

    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="headline" component="h3">
              Legal Papers
            </Typography>
            <Typography component="p">
              Contains Terms of Use and Privacy Policy
            </Typography>
          </Paper>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Terms of Use</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ReactMarkdown source={termsOfUseStmt} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Privacy Policy</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ReactMarkdown source={privacyStmt} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </div>
    );
  };
}

Legal.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Legal);
