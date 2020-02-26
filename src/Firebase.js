import firebase from "firebase/app";
import "firebase/firestore";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCvdWJqHd_iXpGwx5MenUtWkOkwisBh01U",
    authDomain: "hittapp-dda5d.firebaseapp.com",
    databaseURL: "https://hittapp-dda5d.firebaseio.com",
    projectId: "hittapp-dda5d",
    storageBucket: "hittapp-dda5d.appspot.com",
    messagingSenderId: "593605950315",
    appId: "1:593605950315:web:68c1a56bdbf77cb1bdaa2e",
    measurementId: "G-BP75K47QBW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase;