
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB-GSSw2swYi-2g3CJZDRUfW7AgYaoE9U",
  authDomain: "bai-infit.firebaseapp.com",
  projectId: "bai-infit",
  storageBucket: "bai-infit.appspot.com",
  messagingSenderId: "259015079439",
  appId: "1:259015079439:web:1dea482ad65f8b1b17957a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = createApp(App)

app.use(router)

app.mount('#app')

export { db }
