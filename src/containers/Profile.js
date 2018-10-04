import React, { Component } from 'react';
import { Auth, Logger } from 'aws-amplify';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  table: {
    minWidth: 700,
  },
});

const logger = new Logger();

/**
 * Component describing the user of this app
 * @param {shape} event event properties when button is clicked
 * @param {shape} props The props
 * @returns {shape} The component
 */
class Profile extends Component {
  /**
   * The constructor
   * @param {shape} props The props
   * @returns {shape} The component
   */
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      updateMode: false,
      newAttributes: {
        address: '',
        gender: '',
        name: '',
        locale: '',
        website: '',
        phone_number: '',
      },
    };
  }

  componentDidMount = () => {
    this.loadProfile();
  }

  loadProfile = () => {
    // should load up profile here
    Auth.currentUserInfo()
      .then((res) => {
        this.setState({ profile: res });
      });
  }

  enableUpdateProfile = () => {
    const { newAttributes, profile } = this.state;
    const updatedAttr = {};
    Object.keys(newAttributes).forEach((elm) => {
      updatedAttr[elm] = profile.attributes[elm] === undefined
        ? ''
        : profile.attributes[elm];
    });
    this.setState({ newAttributes: updatedAttr, updateMode: true });
  }

  updateProfileAttribute = (event) => {
    const { newAttributes: updateAttr } = this.state;
    const { id, value } = event.target;

    updateAttr[id] = value;
    this.setState({ newAttributes: updateAttr });
  }

  updateProfile = () => {
    const { newAttributes } = this.state;

    // action to update profile here
    Auth.currentUserPoolUser()
      .then((user) => {
        Auth.updateUserAttributes(user, newAttributes)
          .then(() => {
            this.loadProfile();
            this.setState({ updateMode: false });
          })
          .catch((attrErr) => {
            logger.error('attributes failed');
            logger.error(attrErr);
          });
      })
      .catch((err) => {
        logger.error('failed to get current User');
        logger.error(err);
      });
  }

  render = () => {
    const { classes } = this.props;
    const { profile, updateMode, newAttributes } = this.state;
    let content = null;

    if (!profile) {
      content = (
        <Typography component="p">
          Loading profile ...
        </Typography>
      );
    } else if (updateMode) {
      content = (
        <div>
          <Typography className={classes.title} color="textSecondary">
            Update profile form here
          </Typography>
          {
            Object.keys(newAttributes).map(key => (
              <TextField
                key={key}
                id={key}
                label={key}
                value={newAttributes[key]}
                className={classes.textField}
                onChange={this.updateProfileAttribute}
                margin="normal"
                variant="filled"
              />
            ))
          }
        </div>
      );
    } else {
      // default mode when loaded
      content = (
        <div>
          <Typography className={classes.title} color="textSecondary">
            User Profile
          </Typography>
          <Table className={classes.table}>
            <TableBody>
              {
                Object.entries(profile.attributes).map(elm => (
                  <TableRow key={elm[0]}>
                    <TableCell variant="head">{elm[0]}</TableCell>
                    <TableCell>{elm[1]}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      );
    }

    const buttonContent = updateMode ? (
      <div>
        <Button size="small" color="secondary" onClick={() => { this.setState({ updateMode: false }); }}>Cancel</Button>
        <Button size="small" color="primary" onClick={this.updateProfile}>Confirm Update Profile</Button>
      </div>
    ) : (
      <Button size="small" disabled={!profile} onClick={this.enableUpdateProfile}>
        Update Profile
      </Button>
    );

    return (
      <Grid xs={12}>
        <Card className={classes.card}>
          <CardContent>
            { content }
          </CardContent>
          <CardActions>
            { buttonContent }
          </CardActions>
        </Card>
      </Grid>
    );
  };
}


Profile.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Profile);
