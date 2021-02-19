import React, { useState } from "react";
import APIURL from "../../helpers/environment";
import {
  TextField,
  Button,
} from "@material-ui/core/";

const WorkoutCreate = (props) => {
  const [date, setDate] = useState("");
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let logEntry = {
      log: {
        date: date,
        activity: activity,
        duration: duration,
        notes: notes,
      },
    };

    fetch(`${APIURL}log/create`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
      body: JSON.stringify(logEntry),
    })
      .then((res) => { 
        res.json();
      })
      .then(() => {
        setDate("");
        setActivity("");
        setDuration("");
        setNotes("");
        props.fetchWorkouts();
      });
  };

  return (
    <div>
      <h3>Log a Workout</h3>

      <form id="workout-create-form" onSubmit={handleSubmit}>
        <br />
        <TextField
          variant="outlined"
          margin="normal"
          id="date"
          onChange={(e) => setDate(e.target.value)}
          name="date"
          value={date}
          type="date"
          autoFocus
        />
        <br />
        <TextField
          variant="outlined"
          margin="normal"
          label="Activity"
          type="text"
          id="activity"
          onChange={(e) => setActivity(e.target.value)}
          name="activity"
          value={activity}
        />
        <br />
        <TextField
          variant="outlined"
          margin="normal"
          label="Duration"
          type="text"
          id="duration"
          onChange={(e) => setDuration(e.target.value)}
          name="duration"
          value={duration}
        />
        <br />
        <TextField
          variant="outlined"
          margin="normal"
          label="Notes"
          type="text"
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          name="notes"
          value={notes}
        />
        <br />
        <Button
          id="login-signup-button"
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default WorkoutCreate;
