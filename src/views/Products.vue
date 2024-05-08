<template>
  <div>
    <!-- Products -->
    <div class="flex justify-center">
      <header class="text-4xl font-bold text-center py-6">Products</header>
    </div>

    <div class="flex justify-center mb-4">
      <input type="text" v-model="searchQuery" @input="updateFilteredProducts" placeholder="Search products..." class="border border-gray-300 rounded px-4 py-2">
    </div>

    <div class="flex flex-wrap justify-center">
      <!-- Iteruj przez produkty i wyświetlaj je w kartach -->
      <div v-for="product in filteredProducts" :key="product.id" class="max-w-sm rounded overflow-hidden shadow-lg border-black m-4">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ product.id }}</div>
          <!-- Wyświetl informacje o produkcie -->
          <p class="text-gray-700 text-base">
            Carbs: {{ product.carbs }}g <br>
            Fat: {{ product.fat }}g <br>
            Grams: {{ product.grams }}g <br>
            Kcal: {{ product.kcal }} <br>
            Monounsaturates: {{ product.monounsaturates }}g <br>
            Polyunsaturates: {{ product.polyunsaturates }}g <br>
            Protein: {{ product.protein }}g <br>
            Saturates: {{ product.saturates }}g
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
import { RouterLink } from 'vue-router';

const products = ref([]);
const searchQuery = ref('');

onMounted(async () => {
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
    monounsaturates: doc.data().monounsaturates,
    polyunsaturates: doc.data().polyunsaturates,
    protein: doc.data().protein,
    saturates: doc.data().saturates,
  }
  allProducts.push(prod)
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

