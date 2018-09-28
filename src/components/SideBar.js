import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  list: {
    width: 250,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

// list containing 'pages'/ modules for your app
const moduleList = (
  <List component="nav">
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </List>
);

// user related list (profile, etc ...)
const userList = (
  <List component="nav">
    <ListItem button component={Link} to="/profile">
      <ListItemText primary="Profile" />
    </ListItem>
  </List>
);

// list containing legal stuff, etc
const etcList = (
  <List component="nav">
    <ListItem button component={Link} to="/about">
      <ListItemText primary="About" />
    </ListItem>
    <ListItem button component={Link} to="/legal">
      <ListItemText primary="Legal" />
    </ListItem>
  </List>
);

const signOut = () => {
  Auth.signOut()
    .then(() => {
      window.location = '/sign_out';
    });
};

const SideBar = (props) => {
  const { classes, handleDrawerClose } = props;
  return (
    <div className={classes.list}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      { moduleList }
      <Divider />
      { userList }
      <Divider />
      { etcList }
      <Divider />
      <List component="nav">
        <ListItem button onClick={() => { signOut(); }}>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </div>
  );
};

SideBar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(SideBar);
