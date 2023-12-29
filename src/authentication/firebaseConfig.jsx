// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASLXcs3_8Xd_GYmqgjyG3ZWYLtH35RGis",
  authDomain: "starbook-d43f5.firebaseapp.com",
  projectId: "starbook-d43f5",
  storageBucket: "starbook-d43f5.appspot.com",
  messagingSenderId: "273147120399",
  appId: "1:273147120399:web:a9c9f4083e023ae8180c7a",
  measurementId: "G-WKG8P0Y309",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export default firebaseConfig;
