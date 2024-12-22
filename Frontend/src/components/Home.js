import React, { useContext } from 'react';
import { AuthContext } from '../Context'; 
import './common.css';

function Home() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="home-container">
      <h1>Welcome to Music Palyer</h1>
      <button onClick={() => { logout(); window.location.href = '/signin'; }}>
        Log Out
      </button>
    </div>
  );
}

export default Home;