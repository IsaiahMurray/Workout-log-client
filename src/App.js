import React, {useState, useEffect} from 'react';
import './App.css';
import Sitebar from '../src/components/Home/Navbar';
import Auth from './components/Auth/Auth';
import WorkoutIndex from './components/Workouts/WorkoutIndex'; 


function App() {
  const [sessionToken, setSessionToken] = useState(null); 

  useEffect(() => { 
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => { 
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('')
  }

  const protectedViews = () => {

    const authorized = sessionToken;

    return (authorized ? <WorkoutIndex token={sessionToken} /> : <Auth updateToken={updateToken} />)
  }

  return (
    <div className="App">
      <Sitebar clearToken={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default App;