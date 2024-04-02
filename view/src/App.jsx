import { useState } from 'react';
import './App.css';
import Signup from './components/Signup';
import Signin from './components/Signin';

export default () =>
{

  const [showSignup, setShowSignup] = useState(false);

  const handleSignUp = () =>
  {
    setShowSignup(true);
  }

  return (
    <>
      {showSignup ? <Signup /> : <Signin onSignupClick={handleSignUp} />}
    </>
  );
}
