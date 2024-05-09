<template>
 <div>
 <header v-if="!isAuthView" class="bg-lime-500">
  <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div class="flex lg:flex-1">
      <a href="/" class="-m-1.5 p-1.5">
        <span class="sr-only">InFit</span>
        <img class="h-8 w-auto" src="https://firebasestorage.googleapis.com/v0/b/bai-infit.appspot.com/o/logo%2FInFitLogo.PNG?alt=media&token=968fcdec-4cbb-47ac-9139-8b4bbcc6979e" alt="">
      </a>
    </div>
    <div class="flex lg:hidden">
      <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span class="sr-only">Open main menu</span>
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
    <div class="hidden lg:flex lg:gap-x-12">
      <a v-if="isLoggedIn && !isAuthView" href="/feed" class="text-sm font-semibold leading-6 text-gray-900">Dziennik odżywiania</a>
      <a href="/products" class="text-sm font-semibold leading-6 text-gray-900">Baza produktów</a>
      <a href="/about" class="text-sm font-semibold leading-6 text-gray-900">O nas</a>
      <a href="/blog" class="text-sm font-semibold leading-6 text-gray-900">Blog</a>
    </div>
    <div class="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
      <a v-if="isLoggedIn !== null && !isLoggedIn" href="/sign-in" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
      <a> </a>
      <a v-if="isLoggedIn !== null && !isLoggedIn" href="/register" class="text-sm font-semibold leading-6 text-gray-900">Register <span aria-hidden="true">&rarr;</span></a>
      <button v-if="isLoggedIn" @click="goToProfile" class="text-sm font-semibold leading-6 text-gray-900 bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          <span>Account</span>
        </button>
      <button @click="handleSignOut" v-if="isLoggedIn" class="text-sm font-semibold leading-6 text-gray-900 bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"><span>Sign out</span></button>
    </div>
    
  </nav>
 
</header>
</div>
  
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const isLoggedIn = ref(false);
const isAuthView = ref(false);
const router = useRouter();


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



  
router.beforeEach((to, from, next) => {
    if (to.path === '/register' || to.path === '/sign-in') {
      isAuthView.value = true;
    } else {
      isAuthView.value = false;
    }
    next();
  });




const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};

const goToProfile = () => {
  router.push("/account");
};
</script>
