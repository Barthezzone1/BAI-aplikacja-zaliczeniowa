<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="mt-4">
        <router-link to="/" class="text-lime-500 hover:text-indigo-500 font-semibold">Wstecz</router-link>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://firebasestorage.googleapis.com/v0/b/bai-infit.appspot.com/o/logo%2FInFitLogo.PNG?alt=media&token=968fcdec-4cbb-47ac-9139-8b4bbcc6979e" alt="Your Company">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an Account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>
  
          <div>
            <button @click="register" type="button" class="flex w-full justify-center rounded-md bg-lime-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
          </div>
        </form>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          Masz już konto?
          <a href="/sign-in" class="font-semibold leading-6 text-lime-500 hover:text-indigo-500">Logowanie</a>
        </p>
      </div>
    </div>
  </template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import { useRouter } from 'vue-router'
import { db } from '../main.js';
const email = ref('');
const password = ref('');
const router = useRouter()

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "Email/Password",
        email: user.email,
      })
        .then(() => {
          console.log("Registration successful");
          router.push('/info');
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          alert(error.message);
        });
    })
    .catch((error) => {
      console.error("Error registering user: ", error.code);
      alert(error.message);
    });
};


const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result) => {
        console.log(result.user);
        router.push('/info')
    })
    .catch((error) => {
        console.log(error.code);
        alert(error.message);
    });
};


</script>