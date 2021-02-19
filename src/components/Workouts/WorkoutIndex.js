import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import WorkoutCreate from "./WorkoutCreate";
import WorkoutTable from "./WorkoutTable";
import APIURL from "../../helpers/environment";

const WorkoutIndex = (props) => {
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = () => {
    fetch(`${APIURL}log/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: props.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWorkouts(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col md="3">
            <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token} />
          </Col>
          <WorkoutTable
            workouts={workouts}
            fetchWorkouts={fetchWorkouts}
            token={props.token}
          />
        </Row>
      </Container>
    </div>
  );
};

export default WorkoutIndex;
