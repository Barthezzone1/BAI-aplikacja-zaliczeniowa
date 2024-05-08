<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="mt-4">
        <router-link to="/" class="text-lime-500 hover:text-indigo-500 font-semibold">Wstecz</router-link>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://firebasestorage.googleapis.com/v0/b/bai-infit.appspot.com/o/logo%2FInFitLogo.PNG?alt=media&token=968fcdec-4cbb-47ac-9139-8b4bbcc6979e" alt="Your Company">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
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
            <button @click="login" type="button" class="flex w-full justify-center rounded-md bg-lime-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>
  
      </div>
    </div>
  </template>
<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'
const email = ref('');
const password = ref('');
const errMsg = ref()
const router = useRouter()

const login = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log("succ log");
        router.push('/feed')
    })
    .catch((error) => {
        console.log(error.code);
        switch (error.code) {
            case "auth/invalid-email":
                errMsg.value= "invalid email";
                break;
            
            case "auth/user-not-found":
                errMsg.value= "No acc with that email was found";
                break;    
        
            case "auth/wrong-password":
                errMsg.value= "incorrect password";
                break;
            
            default:
                errMsg.value = "Email or password was incorrect"
                break;
        }
    });
};

const signInWithGoogle = () => {

};


</script>