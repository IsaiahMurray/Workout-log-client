import React from "react";
import APIURL from "../../helpers/environment";
import WorkoutEdit from '../Workouts/WorkoutEdit';

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const WorkoutTable = (props) => {
  const classes = useStyles();

  const deleteWorkout = (workout) => {
    fetch(`${APIURL}${workout.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => props.fetchWorkouts());
  };

  let rows = props.workouts;

  console.log("rows: ", rows);

  return (
    <div>
      <h3>Workout History</h3>
      <hr />

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.activity}>
                <TableCell component="th" scope="row">
                  {row.activity}
                </TableCell>
                <TableCell align="right">{row.duration}</TableCell>
                <TableCell align="right">{row.notes}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">
                  <WorkoutEdit token={props.token} workout={row}/>
                  <Button
                    onClick={() => {
                      // deleteWorkout(row);
                      console.log(row)
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WorkoutTable;
