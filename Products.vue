<template>
  <div>
    <div class="flex justify-center">
      <a href="/" class="-m-1.5 p-1.5">
        <span class="sr-only">Your Company</span>
        <img class="h-8 w-auto" src="https://firebasestorage.googleapis.com/v0/b/bai-infit.appspot.com/o/logo%2FInFitLogo.PNG?alt=media&token=968fcdec-4cbb-47ac-9139-8b4bbcc6979e" alt="">
      </a>
    </div>

    <header class="text-4xl font-bold text-center py-6">Products</header>

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
