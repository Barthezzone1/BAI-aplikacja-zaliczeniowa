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
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">InFit blog</h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">Porady żywieniowe ekspertów</p>
        </div>
        <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article v-for="post in posts" :key="post.id" class="flex max-w-xl flex-col items-start justify-between">
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="post.datetime" class="text-gray-500">{{ post.date }}</time>
              <a :href="post.category.href" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{ post.category }}</a>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a>
                  <span class="absolute inset-0" />
                  {{ post.title }}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.description }}</p>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4">
              <div class="text-sm leading-6">
                <p class="font-semibold text-gray-900">
                  <a>
                    <span class="absolute inset-0" />
                    {{ post.name }}
                  </a>
                </p>
                <p class="text-gray-600">{{ post.role }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </template>
  

<script setup>

import { ref, onMounted  } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../main.js';


const posts = ref([

]);

onMounted(async() => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  let allPosts = []
  querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  const prod = {
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    category: doc.data().category,
    date: doc.data().date,
    name: doc.data().name,
    role: doc.data().role,
  }
  allPosts.push(prod)
  });
    posts.value = allPosts
});



</script>
