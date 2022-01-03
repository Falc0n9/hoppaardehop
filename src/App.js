import React, { Component } from 'react'
import Counters from './components/counters';
import NavBar from './components/navbar';
import {initializeApp} from "firebase/app";
import { getDatabase, ref, set, child, update, get } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// import { getFirestore, collection, doc, getDocs, addDoc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// const firebaseConfig = {
//   apiKey: "AIzaSyBh79PREZEkKFZ11H7q60xouz_bwH32E8Y",
//   authDomain: "hoppaardjehop-e1bf7.firebaseapp.com",
//   projectId: "hoppaardjehop-e1bf7",
//   storageBucket: "hoppaardjehop-e1bf7.appspot.com",
//   messagingSenderId: "990841126479",
//   appId: "1:990841126479:web:6ca4bdbc5585629879f43a",
//   measurementId: "G-9R06DNPX8Q"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBh79PREZEkKFZ11H7q60xouz_bwH32E8Y",
  authDomain: "hoppaardjehop-e1bf7.firebaseapp.com",
  databaseURL: "https://hoppaardjehop-e1bf7-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "hoppaardjehop-e1bf7.appspot.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

class App extends Component {
  state = {
    counters: [
        {id: 1, value: 100, prev_value: 100, checked: false, color: "#E94F37"},
        {id: 2, value: 100, prev_value: 100, checked: false, color: "#1C89BF"},  
        {id: 3, value: 100, prev_value: 100, checked: false, color: "#A1D363"},
        {id: 4, value: 100, prev_value: 100, checked: false, color: "#297373"}
    ],
    synchronizing: false
  };

  getPoles = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `test`)).then((snapshot) => {
      if (snapshot.exists()) {
        const counters = [...this.state.counters];
        counters[0].value = snapshot.val().pole1.newHeight;
        counters[0].prev_value = snapshot.val().pole1.currentHeight;
        counters[1].value = snapshot.val().pole2.newHeight;
        counters[1].prev_value = snapshot.val().pole2.currentHeight;
        counters[2].value = snapshot.val().pole3.newHeight;
        counters[2].prev_value = snapshot.val().pole3.currentHeight;
        counters[3].value = snapshot.val().pole4.newHeight;
        counters[3].prev_value = snapshot.val().pole4.currentHeight;

        this.setState({ counters: counters });

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  componentDidMount() {
    window.addEventListener('load', this.getPoles);
  }

 componentWillUnmount() { 
   window.removeEventListener('load', this.getPoles);  
  }

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    if (counter.checked === true) {
      for (let index = 0; index < counters.length; index++) {
        if (counters[index].checked === true) {
          counters[index].value === 160 ? counters[index].value = 160 : counters[index].value += 5;
        }
      }
    }
    else {
      const index = counters.indexOf(counter);
      counters[index] = {...counter};
      counters[index].value === 160 ? counters[index].value = 160 : counters[index].value += 5;
    }
    this.setState({ counters: counters });
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    if (counter.checked === true) {
      for (let index = 0; index < counters.length; index++) {
        if (counters[index].checked === true) {
          counters[index].value === 0 ? counters[index].value = 0 : counters[index].value -= 5;
        }
      }
    }
    else {
      const index = counters.indexOf(counter);
      counters[index] = {...counter};
      counters[index].value === 0 ? counters[index].value = 0 : counters[index].value -= 5;
    }
    this.setState({ counters: counters });
  };

  handleReset = () => {
      const counters = this.state.counters.map(c => {
          if (c.checked === true) {
            c.value = 100;
          }
          return c;
      });
      this.setState({ counters: counters });
  };

  handleDelete = counterId => {
      const counters = this.state.counters.filter(c => c.id !== counterId);
      this.setState({ counters: counters });
  };

  handleCheckboxChange = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = {...counter};
    counters[index].checked === false ? counters[index].checked = true : counters[index].checked = false;
    this.setState({ counters: counters });
  }

  handleSelectAll = () => {
    const counters = this.state.counters
    if (counters.length === counters.filter(c => c.checked === true).length) {
      for (let index = 0; index < counters.length; index++) {
        counters[index].checked = false;
      }
    }
    else {
      for (let index = 0; index < counters.length; index++) {
        counters[index].checked = true;
      }
    }
    this.setState({counters: counters });
  };

  handleSynchronize = () => {
    const counters = this.state.counters;
    var synchronizing = this.state.synchronizing;
    synchronizing = true;
    console.log('Synchronizing...')
    console.log(this.state.counters)
    this.setState({ counters, synchronizing})
    setTimeout(() => {
      this.setState({synchronizing: false});},
      4000)
  };

  updatePoles = () => {
    const db = getDatabase();
    this.state.counters.forEach(counter => {
      update(ref(db, "test/pole" + counter.id), {
        poleId: counter.id,
        jumpId: counter.id,
        accountId: "Camille Bogman",
        // currentHeight: 100,
        newHeight: counter.value });
      });
    var synchronizing = this.state.synchronizing;
    synchronizing = true;
    this.setState({ synchronizing})
    setTimeout(() => {
      this.setState({synchronizing: false});},
      2000)
  };

  setPoles = () => {
    const db = getDatabase();
    this.state.counters.forEach(counter => {
      set(ref(db, "test/pole" + counter.id), {
        poleId: counter.id,
        jumpId: counter.id,
        accountId: "Camille Bogman",
        currentHeight: 100,
        newHeight: counter.value });
      });
  };

  render () {
    return (
        <React.Fragment>
          <NavBar 
            totalCounters={this.state.counters.filter(c => c.value > 0).length}
          />
          <main className="container">
            <Counters
              counters={this.state.counters}
              synchronizing={this.state.synchronizing}
              onReset={this.handleReset}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
              onSynchronize={this.updatePoles}
              onCheckboxChange={this.handleCheckboxChange}
              onSelectAll={this.handleSelectAll}
            />        
          </main>
        </React.Fragment>
    )
  };
};

export default App;
