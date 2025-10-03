// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7FUFLyFSO_FfhkFsJ6fYHQj1Hyj8i7OE",
  authDomain: "tb-booking-214f2.firebaseapp.com",
  projectId: "tb-booking-214f2",
  storageBucket: "tb-booking-214f2.firebasestorage.app",
  messagingSenderId: "1028893460471",
  appId: "1:1028893460471:web:36e42f287165e86f3d10f2",
  measurementId: "G-CE8T4VFJS8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();

// Check
console.log(firebase.app().name);