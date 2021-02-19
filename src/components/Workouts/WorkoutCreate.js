import React, { useState, useEffect } from "react";
import APIURL from "../../helpers/environment";
import {
  FormControl,
  TextField,
  Button,
  InputLabel,
  Select,
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
    console.log(logEntry)

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
        console.log(res)
      })
      .then((logData) => {
        console.log(logData);
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
        <FormControl className={""}>
          <InputLabel htmlFor="age-native-simple">Activity</InputLabel>
          <Select
            native
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
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
