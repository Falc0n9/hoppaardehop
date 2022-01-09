import React, { Component} from 'react'
import {Container} from 'react-bootstrap';
import Login from "./components/login"
import Jumps from "./components/jumps"
import NavBar from './components/navbar';
import PrivateRoute from './components/PrivateRoute';
import {initializeApp} from "firebase/app";
import firebaseConfig from "./firebaseConfig.json";
import { getDatabase} from "firebase/database";
import { getAuth} from "firebase/auth";
import background from "./img/background.jpeg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

class App extends Component {
  authenticated = null;
  render () {
    return (
        <React.Fragment>
          <NavBar />
          <Container 
            className='d-flex align-items-center justify-content-center' 
            style={{ 
              minHeight: "100vh", 
              backgroundImage: `url(${background})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100vw',
              height: '100vh'}}>
            <div className="w-100" style={{maxWidth: "600px"}}>
              <Router>
                <Routes>
                  <Route path="/login" element={<Login authenticated={this.authenticated} />} />
                  <Route exact path='/' element={<PrivateRoute authenticated={this.authenticated}/>}>
                    <Route exact path='/' element={<Jumps/>}/>
                  </Route>
                </Routes>
              </Router>
            </div>
          </Container>
        </React.Fragment>
    )
  };
};

export default App;
