<template>
  
  <nav>
    <button @click="handleSignOut" v-if="isLoggedIn" >Sign out</button>

  </nav>
  
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const isLoggedIn = ref(false);

let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
    
  });

});





const router = useRouter()

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>
