import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Hub, Auth } from 'aws-amplify';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import SideBar from './SideBar';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  grow: {
    flexGrow: 1,
    textDecoration: 'none',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
});

// TopNav state should be based on currentUser state
/**
 * TopNav component
 * @returns {object} The Top Navigation react obbject
 */
class TopNav extends Component {
  /**
   * Adds two numbers together.
   * @param {shape} props The props
   * @returns {int} The sum of the two numbers.
   */
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      openDrawer: false,
    };

    // setup event listener for auth events
    Hub.listen('auth', this, 'MyListener');
  }

  // handle auth events
  onHubCapsule = (capsule) => {
    switch (capsule.payload.event) {
      case 'signIn':
        this.setState({ authenticated: true });
        break;
      case 'signOut':
        this.setState({ authenticated: false });
        break;
      default:
        console.log(`unhandled event ${capsule.payload.event}`);
    }
  }

  handleDrawerClose = () => { this.setState({ openDrawer: false }); }

  componentDidMount = () => {
    // should check on authenticated state
    Auth.currentSession()
      .then(() => {
        this.setState({ authenticated: true });
      });
  }

  render = () => {
    const { classes } = this.props;
    const { openDrawer, authenticated } = this.state;

    const menu = authenticated ? (
      <IconButton
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
        onClick={() => { this.setState({ openDrawer: true }); }}
      >
        <MenuIcon />
      </IconButton>
    ) : null;
    const loginBtn = authenticated ? null : (
      <Button color="inherit" to="/app" component={Link}>Login</Button>
    );


    const drawer = authenticated ? (
      <SwipeableDrawer
        open={openDrawer}
        onClose={() => { this.setState({ openDrawer: false }); }}
        onOpen={() => { this.setState({ openDrawer: true }); }}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={() => { this.setState({ openDrawer: false }); }}
          onKeyDown={() => { this.setState({ openDrawer: false }); }}
        >
          <SideBar handleDrawerClose={this.handleDrawerClose} />
        </div>
      </SwipeableDrawer>
    ) : null;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            { menu }
            <Typography variant="title" color="inherit" className={classes.grow} component={Link} to="/">
              AppName
            </Typography>
            { loginBtn }
          </Toolbar>
        </AppBar>
        { drawer }
      </div>
    );
  }
}

TopNav.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles, { withTheme: true })(TopNav);
