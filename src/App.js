import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import './App.scss'

const firebaseConfig = {
  apiKey: "AIzaSyCfZK8W_BE0zNhQwn1Tc-kAaf5o4U5Jwsg",
  authDomain: "auth-874fa.firebaseapp.com",
  projectId: "auth-874fa",
  storageBucket: "auth-874fa.appspot.com",
  messagingSenderId: "718589742269",
  appId: "1:718589742269:web:66bfdc65983436fb59bbd4"
};

initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [])

  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
