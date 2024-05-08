<template>
  <div class="feed">
    <!-- Kalendarz -->
    <div class="calendar-container">
      <VueDatePicker v-model="selectedDate" inline auto-apply />
    </div>

    <!-- Lista produktów na śniadanie -->
    <div class="card">
      <h2 class="section-header">ŚNIADANIE</h2>
      <hr class="section-divider">
      <ul>
        <li v-for="product in breakfastProducts" :key="product.id">
          {{ product.id }} - {{ product.quantity }} szt.
        </li>
      </ul>
      <button @click="showProductDialog">Dodaj</button>
    </div>

    <!-- Okno dialogowe z wyborem produktów -->
    <div v-if="showDialog" class="dialog">
      <h3>Wybierz produkty</h3>
      <div class="scroll-container">
        <ul>
          <li v-for="product in products" :key="product.id">
            <input type="checkbox" v-model="selectedProducts" :value="product">
            {{ product.id }}
          </li>
        </ul>
      </div>
      <button @click="saveSelectedProducts">Zapisz</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { db } from '../main.js';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const auth = getAuth(); // Pobierz obiekt autoryzacji
const user = ref(auth.currentUser); // Referencja do obiektu użytkownika

const selectedDate = ref(new Date());
const products = ref([]);
const breakfastProducts = ref([]);
const showDialog = ref(false);
const selectedProducts = ref([]);

// Funkcja wywołująca się przy każdym renderowaniu komponentu
onMounted(async () => {
  // Subskrybuj zmiany w stanie autoryzacji Firebase Authentication
  const unsubscribe = auth.onAuthStateChanged(newUser => {
    user.value = newUser; // Zaktualizuj obiekt użytkownika przy zmianach
  });

  // Pobierz produkty z Firestore przy renderowaniu komponentu
  const querySnapshot = await getDocs(collection(db, "products"));
  let allProducts = [];
  querySnapshot.forEach((doc) => {
    allProducts.push({ id: doc.id, ...doc.data() });
  });
  products.value = allProducts;

  // Pobierz produkty użytkownika na śniadanie
  await fetchBreakfastProducts();

  // Zatrzymaj subskrypcję przy usuwaniu komponentu
  return unsubscribe;
});

// Funkcja wyświetlająca okno dialogowe z wyborem produktów
const showProductDialog = () => {
  showDialog.value = true;
};

// Funkcja zapisująca wybrane produkty do listy śniadaniowej
const saveSelectedProducts = async () => {
  const selectedProductsData = selectedProducts.value.map(product => ({ ...product, quantity: 1 }));
  breakfastProducts.value.push(...selectedProductsData);

  // Zapisz wybrane produkty do bazy danych
  if (user.value) {
    const docRef = await addDoc(collection(db, "nutritionHistory"), {
      userId: user.value.uid, // Dodaj UID użytkownika
      date: serverTimestamp(),
      products: selectedProductsData
    });
  } else {
    console.error('Użytkownik niezalogowany'); // Komunikat w konsoli w przypadku braku zalogowania
  }

  // Zakończ wyświetlanie okna dialogowego po zapisaniu produktów
  showDialog.value = false;
};

// Funkcja pobierająca produkty użytkownika na śniadanie
const fetchBreakfastProducts = async () => {
  if (user.value) {
    const q = query(collection(db, 'nutritionHistory'), where('userId', '==', user.value.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const productsData = doc.data().products;
      productsData.forEach(product => {
        breakfastProducts.value.push({ ...product, quantity: 1 });
      });
    });
  } else {
    console.error('Użytkownik niezalogowany'); // Komunikat w konsoli w przypadku braku zalogowania
  }
};
</script>

<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  align-items: center; /* Wyśrodkowanie zawartości w pionie */
}

.calendar-container {
  margin-top: 20px; /* Odstęp od góry */
}

.card {
  width: 300px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.card button {
  margin-top: 10px;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.scroll-container {
  max-height: 200px; /* Ustaw maksymalną wysokość dla przewijania */
  overflow-y: auto; /* Włącz przewijanie */
}

.scroll-container ul {
  padding: 0;
  margin: 0;
}

.section-header {
  font-size: 24px;
  font-weight: bold;
}

.section-divider {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
