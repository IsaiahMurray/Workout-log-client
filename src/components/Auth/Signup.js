import React, {useState} from 'react';
import APIURL from '../../helpers/environment'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const Signup = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}user/create`, { 
      method: 'POST',
      body: JSON.stringify({user:
        {
          firstName: firstName,
          lastName: lastName,
          email: email, 
          password: password
        }
      }),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
    }).then(
        (response) => response.json()
    ).then((data) => {
      console.log('data', data, 'sessionToken', data.token)
      props.updateToken(data.token)
    })
  }

  return(
    <div>
      <h1>Sign Up</h1>
      <form id="login-signup-form" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="firstName"
          label="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          name="First Name"
          value={firstName}
          autoFocus
        />
        <br />
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="lastname"
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          name="Last name"
          value={lastName}
          autoFocus
        />
        <br />
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
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default Signup;