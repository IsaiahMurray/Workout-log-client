import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  logout: {
    
  },
  title: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
}));

const Sitebar = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return(
    <div className={classes.root}>
      <AppBar id="app-bar" position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          Workout
        </Typography>
        <Button className={classes.logout} id="logout-button" onClick={props.clearToken}>Logout</Button>
      </Toolbar>
    </AppBar>
    </div>
    
  );
};

export default Sitebar;