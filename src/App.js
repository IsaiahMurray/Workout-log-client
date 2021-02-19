import React, {useState, useEffect} from 'react';
import './App.css';
import Sitebar from '../src/components/Home/Navbar';
import Auth from './components/Auth/Auth';
import WorkoutIndex from './components/Workouts/WorkoutIndex'; 


function App() {

  const [sessionToken, setSessionToken] = useState(null);

  const clearToken = () => {
    localStorage.clear();
    setSessionToken(null);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const protectedView = () => {
    return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken} /> : <Auth updateToken={updateToken} />)
  }

  return (
    <div className="App">
      <Sitebar clearToken={clearToken} />
      {protectedView()}
    </div>
  );
}

export default App;