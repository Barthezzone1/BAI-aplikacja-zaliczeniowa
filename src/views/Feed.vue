
<template>
    <div>
      <!-- Pasek nawigacyjny -->
      <header class="bg-lime-500">
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
      <br>
    
  
      <!-- Kalendarz -->
      <div class="container mx-auto">
      <div class="calendar-container">
        <table class="mx-auto">
          <thead>
            <tr>
              <th v-for="day in days" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="day in week" :key="day.getTime()" @click="selectDate(day)" :class="{ active: isSameDay(day, currentDate) }">
                {{ day.getDate() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
        <div class="flex justify-center my-8"> <!-- Dodaj margines górny dla odstępu -->
      <button @click="showProductForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Add Product
      </button>
      </div>
  
      <!-- Rozwijana lista produktów -->
      <div class="flex justify-center mb-4">
        <select v-model="selectedProduct" @change="addSelectedProductToCalendar" class="border border-gray-300 rounded px-4 py-2">
          <option disabled value="">Select a product</option>
          <option v-for="product in products" :key="product.id" :value="product">{{ product.id }}</option>
        </select>
      </div>
    </div>
    <div v-if="selectedProductToAdd" class="fixed inset-x-0 bottom-0 bg-white z-50">
      <div class="container mx-auto py-4">
        <div class="max-w-xl mx-auto bg-gray-100 rounded-lg p-6 shadow-md">
          <h2 class="text-lg font-semibold">{{ selectedProductToAdd.id }}</h2>
          <img :src="selectedProductToAdd.imageURL" alt="Product Image" class="w-full my-4">
          <p>
            Carbs: {{ selectedProductToAdd.carbs }}g <br>
            Fat: {{ selectedProductToAdd.fat }}g <br>
            Grams: {{ selectedProductToAdd.grams }}g <br>
            Kcal: {{ selectedProductToAdd.kcal }} <br>
            Protein: {{ selectedProductToAdd.protein }}g <br>
          </p>
        </div>
      </div>
    </div>
  
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { collection, getDocs } from "firebase/firestore";
  import { db } from '../main.js';
  
  export default {
    name: 'Calendar',
    data() {
      return {
        currentDate: new Date(),
        week: this.generateWeek(),
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        products: [],
        selectedProduct: null
      };
    },
    methods: {
      generateWeek() {
        const week = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
          const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
          week.push(day);
        }
        return week;
      },
      selectDate(date) {
        console.log('Wybrano datę:', date.toLocaleDateString());
        this.currentDate = date;
        // Tutaj możesz zaimplementować logikę aktualizacji obecnego arkusza komponentu
      },
      isSameDay(day1, day2) {
        return day1.getFullYear() === day2.getFullYear() && 
               day1.getMonth() === day2.getMonth() && 
               day1.getDate() === day2.getDate();
      },
      async fetchProducts() {
        const querySnapshot = await getDocs(collection(db, "products"));
        let allProducts = [];
        querySnapshot.forEach((doc) => {
          const prod = {
            id: doc.id,
            carbs: doc.data().carbs,
            fat: doc.data().fat,
            grams: doc.data().grams,
            kcal: doc.data().kcal,
            protein: doc.data().protein,
            imageURL: doc.data().imageURL
          };
          allProducts.push(prod);
        });
        this.products = allProducts;
      },
      addSelectedProductToCalendar() {
        // Tutaj możesz dodać logikę dodawania wybranego produktu do kalendarza
        
        console.log('Selected product:', this.selectedProduct);
      }
    },
    mounted() {
      this.fetchProducts();
    }
  };
  </script>
  
<style scoped>
.calendar-container {
  font-weight: bold;
  font-size: 20px;
  border: 2px solid lightblue;
  padding: 10px;
  background-color: lightgoldenrodyellow;
}

.calendar-container table {
  margin: 0 auto;
}

.calendar-container th {
  font-weight: bold;
}

.container {
  width: 100%;
}

.calendar-container td {
  padding: 5px; /* Dodaj odstęp między komórkami */
}
</style>
