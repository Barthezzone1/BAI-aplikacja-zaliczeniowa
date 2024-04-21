<template>
    <h1>Sign In</h1>
    <p><input type="text" placeholder="Email" v-model="email"/></p>
    <p><input type="text" placeholder="Password" v-model="password"/></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'
const email = ref('');
const password = ref('');
const errMsg = ref()
const router = useRouter()

const register = () => {
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