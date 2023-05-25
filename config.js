import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-lGj8jW9Nw81vZoIMPhioVqxIisKJrIY",
    authDomain: "euro-5bfbd.firebaseapp.com",
    projectId: "euro-5bfbd",
    storageBucket: "euro-5bfbd.appspot.com",
    messagingSenderId: "722842100650",
    appId: "1:722842100650:web:30396f30f4a43151a801d3"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export { firebase };