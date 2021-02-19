import React, { useState } from "react";
import APIURL from "../../helpers/environment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = (props) => {
  const [email, setEmail] = useState(""); //2
  const [password, setPassword] = useState(""); //2

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${APIURL}user/login`, {
      method: "POST",
      body: JSON.stringify({ user: { email: email, password: password } }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        props.updateToken(data.sessionToken);
        // window.location.reload();
      })
      .catch((err) => console.log("error: ", err));
  };

  return (
    <div>
      <h1>Login</h1>
      <form id="login-signup-form" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
          autoFocus
        />
        <br />
        <TextField
          variant="outlined"
          margin="normal"
          required
          label="Password"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
        />
        <br />
        <Button
          id="login-signup-button"
          type="submit"
          variant="contained"
          color="primary"
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
