<template>
  
    <!-- Pasek nawigacyjny -->
    <header class="bg-lime-500">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
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
          <a href="/products" class="text-sm font-semibold leading-6 text-gray-900">Baza produktów</a>
          <a href="/about" class="text-sm font-semibold leading-6 text-gray-900">O nas</a>
          <a href="/blog" class="text-sm font-semibold leading-6 text-gray-900">Blog</a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
          <a href="/sign-in" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
          <a> </a>
          <a href="/register" class="text-sm font-semibold leading-6 text-gray-900">Register <span aria-hidden="true">&rarr;</span></a>
        </div>
      </nav>
    </header>

    <!-- Products -->
    <div class="flex justify-center">
    </div>
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Poznaj zespół InFit</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">Jesteśmy zespołem pasjonatów zdrowego odżywiania, którzy codziennie dostarczają świeże, zrównoważone i inspirujące treści dotyczące żywienia. Nasz dziennik odżywiania to miejsce, w którym dzielimy się wiedzą, przepisami, poradami i motywacją, aby pomóc innym w osiągnięciu ich celów zdrowotnych i wellnessowych. Razem tworzymy społeczność wspierającą się nawzajem w drodze do lepszego samopoczucia i stylu życia.</p>
        </div>
        <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          <li v-for="person in people" :key="person.name">
            <div class="flex items-center gap-x-6">
              <img class="h-16 w-16 rounded-full" :src="person.imageUrl" alt="" />
              <div>
                <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">{{ person.name }}</h3>
                <p class="text-sm font-semibold leading-6 text-indigo-600">{{ person.role }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  

<script setup>

import { ref, onMounted  } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../main.js';


const people = ref([

]);

onMounted(async() => {
  const querySnapshot = await getDocs(collection(db, "about"));
  let allPeople = []
  querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  const prod = {
    id: doc.id,
    name: doc.data().name,
    role: doc.data().role,
    imageUrl: doc.data().imageUrl,
  }
  allPeople.push(prod)
  });
    people.value = allPeople
});



</script>
