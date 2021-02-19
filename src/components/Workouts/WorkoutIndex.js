import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import WorkoutCreate from "./WorkoutCreate";
import WorkoutTable from "./WorkoutTable";
import WorkoutEdit from "./WorkoutEdit";
import APIURL from "../../helpers/environment";

const WorkoutIndex = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [workoutToUpdate, setWorkoutToUpdate] = useState({});

  const fetchWorkouts = () => {
    fetch(`http://localhost:3000/log/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: props.token,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  };

  const editUpdateWorkout = (workout) => {
    console.log(workout);
    setWorkoutToUpdate(workout);
  };

  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  console.log(workouts);

  return (
    <div>
      <Container>
        <Row>
          <Col md="3">
            <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token} />
          </Col>
          <Col md="9">
          {(!workouts.length === 0) ? <WorkoutTable workouts={workouts} editUpdateWorkout={editUpdateWorkout} updateOn={updateOn} fetchWorkouts={fetchWorkouts} token={props.token}/> : <h1>Log a workout!</h1>}
        </Col>
          {updateActive ? (
            <WorkoutEdit
              workoutToUpdate={workoutToUpdate}
              updateOff={updateOff}
              token={props.token}
              fetchWorkouts={fetchWorkouts}
            />
          ) : (
            <div></div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default WorkoutIndex;
