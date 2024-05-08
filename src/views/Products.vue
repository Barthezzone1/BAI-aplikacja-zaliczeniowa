<template>
    <div>
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
      <header class="text-4xl font-bold text-center py-6">Products</header>
    </div>

    <div class="flex justify-center mb-4">
      <input type="text" v-model="searchQuery" @input="updateFilteredProducts" placeholder="Search products..." class="border border-gray-300 rounded px-4 py-2">
    </div>

    <div class="flex flex-wrap justify-center">
      <div v-for="product in filteredProducts" :key="product.id" class="max-w-sm rounded overflow-hidden shadow-lg border-black m-4">
        <div class="px-6 py-4 flex flex-col items-center"> <!-- Dodaliśmy klasę "flex flex-col items-center" -->
          <div class="font-bold text-xl mb-2 text-center">{{ product.id }}</div> <!-- Dodaliśmy klasę "text-center" -->
          <img :src="product.imageURL" alt="Product Image" class="w-full mb-4">
          <p class="text-gray-700 text-base text-center"> <!-- Dodaliśmy klasę "text-center" -->
            Carbs: {{ product.carbs }}g <br>
            Fat: {{ product.fat }}g <br>
            Grams: {{ product.grams }}g <br>
            Kcal: {{ product.kcal }} <br>
            Protein: {{ product.protein }}g <br>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted  } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../main.js';

const products = ref([]);
const searchQuery = ref('');

onMounted(async() => {
  const querySnapshot = await getDocs(collection(db, "products"));
  let allProducts = []
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    const prod = {
      id: doc.id,
      carbs: doc.data().carbs,
      fat: doc.data().fat,
      grams: doc.data().grams,
      kcal: doc.data().kcal,
      protein: doc.data().protein,
      imageURL: doc.data().imageURL // Dodajemy URL obrazka
    }
    allProducts.push(prod);
  });
  products.value = allProducts;
  updateFilteredProducts();
});

const filteredProducts = ref([]);

const updateFilteredProducts = () => {
  if (!searchQuery.value) {
    filteredProducts.value = products.value;
  } else {
    const searchTerm = searchQuery.value.toLowerCase().trim();
    filteredProducts.value = products.value.filter(product => product.id.toLowerCase().includes(searchTerm));
  }
};
</script>
