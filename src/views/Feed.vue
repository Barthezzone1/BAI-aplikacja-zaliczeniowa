<template>
    <div>
     
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