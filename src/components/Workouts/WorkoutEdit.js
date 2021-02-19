import React, { useState } from "react";
import APIURL from "../../helpers/environment";
import {
  FormControl,
  TextField,
  Button,
  InputLabel,
  Select,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const WorkoutEdit = (props) => {
  const classes = useStyles();

  const [editDate, setEditDate] = useState(props.workout.date);
  const [editActivity, setEditActivity] = useState(props.workout.activity);
  const [editDuration, setEditDuration] = useState(props.workout.duration);
  const [editNotes, setEditNotes] = useState(props.workout.notes);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const workoutUpdate = (event) => {
    event.preventDefault();
    fetch(`${APIURL}log/${props.workout.id}`, {
      method: "PUT",
      body: JSON.stringify({
        log: {
          date: editDate,
          activity: editActivity,
          duration: editDuration,
          notes: editNotes,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })

  };
  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        Update
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form id="workout-create-form" onSubmit={workoutUpdate}>
              <br />
              <TextField
                variant="outlined"
                margin="normal"
                id="date"
                onChange={(e) => setEditDate(e.target.value)}
                name="date"
                value={editDate}
                type="date"
                autoFocus
              />
              <br />
              <FormControl className={""}>
                <InputLabel htmlFor="age-native-simple">Activity</InputLabel>
                <Select
                  native
                  value={editActivity}
                  onChange={(e) => setEditActivity(e.target.value)}
                  inputProps={{
                    name: "activity",
                    id: "age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="Gardening">Gardening</option>
                  <option value="Horse Riding">Horse Riding</option>
                  <option value="Swimming">Swimming</option>
                  <option value="Walk">Walk</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <br />
              <TextField
                variant="outlined"
                margin="normal"
                label="Duration"
                type="text"
                id="duration"
                onChange={(e) => setEditDuration(e.target.value)}
                name="duration"
                value={editDuration}
                defaultValue={props.workout.duration}
              />
              <br />
              <TextField
                variant="outlined"
                margin="normal"
                label="Notes"
                type="text"
                id="notes"
                onChange={(e) => setEditNotes(e.target.value)}
                name="notes"
                value={editNotes}
                defaultValue={props.workout.notes}
              />
              <br />
              <Button
                id="login-signup-button"
                type="submit"
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default WorkoutEdit;
