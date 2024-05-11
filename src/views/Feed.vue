<template>
  <div class="calendar">
    <div class="header">
      <button @click="previousMonth">&lt;</button>
      <h2>{{ currentMonth }}</h2>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="days">
      <div v-for="date in dates" :key="date.day" @click="selectDate(date)" :class="{ active: isSelected(date) }">{{ date.day }}</div>
    </div>
    <div class="selected-date">Wybrana data: {{ wybData }}</div>
  </div>
  <div class="card">
  <h2 class="section-header">ŚNIADANIE</h2>
  <hr class="section-divider">
  <ul>
  <li v-for="(product, index) in breakfastProducts" :key="product.productId" class="list-item">
    {{ product.productId }} - {{ product.totalKcal }} kcal - {{ product.quantity }} szt.
    <button @click="removeProduct('breakfast', index)" class="remove-btn">Usuń</button>
  </li>
</ul>
<hr class="section-divider">
<div class="input-group">
  <select v-model="selectedProductBreakfast" class="select-full-width">
    <option disabled value="">{{ 'Wybierz produkt' }}</option>
    <option v-for="product in products" :value="product.id">{{ product.id }}</option>
  </select>
  <input type="number" v-model.number="productQuantityBreakfast" min="1" class="quantity-input">
  <button @click="addProduct('breakfast', selectedProductBreakfast, productQuantityBreakfast)"class="add-btn">Dodaj produkt</button>
</div>
</div>
<div class="card">
  <h2 class="section-header">OBIAD</h2>
  <hr class="section-divider">
  <ul>
    <li v-for="product in selectedDateProducts('lunch')" :key="product.productId" class="list-item">
      {{ product.productId }} - {{ product.totalKcal }} kcal - {{ product.quantity }} szt.
      <button @click="removeProduct('lunch', index)" class="remove-btn">Usuń</button>
    </li>
  </ul>
  <hr class="section-divider">
  <div class="input-group">
  <select v-model="selectedProductLunch" class="select-full-width">
    <option disabled value="">{{ 'Wybierz produkt' }}</option>
    <option v-for="product in products" :value="product.id">{{ product.id }}</option>
  </select>
  <input type="number" v-model.number="productQuantityLunch" min="1" class="quantity-input">
  <button @click="addProduct('lunch', selectedProductLunch, productQuantityLunch)"class="add-btn">Dodaj produkt</button>
</div>
</div>
<div class="card">
  <h2 class="section-header">KOLACJA</h2>
  <hr class="section-divider">
  <ul>
    <li v-for="product in selectedDateProducts('dinner')" :key="product.productId" class="list-item">
      {{ product.productId }} - {{ product.totalKcal }} kcal - {{ product.quantity }} szt.
      <button @click="removeProduct('dinner', index)" class="remove-btn">Usuń</button>
    </li>
  </ul>
  <hr class="section-divider">
  <div class="input-group">
  <select v-model="selectedProductDinner" class="select-full-width">
    <option disabled value="">{{ 'Wybierz produkt' }}</option>
    <option v-for="product in products" :value="product.id">{{ product.id }}</option>
  </select>
  <input type="number" v-model.number="productQuantityDinner " min="1" class="quantity-input">
  <button @click="addProduct('dinner', selectedProductDinner, productQuantityDinner)"class="add-btn">Dodaj produkt</button>
</div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../main';
import { getAuth } from 'firebase/auth';

export default {
  name: 'Calendar',
  setup() {

    const productQuantityBreakfast = ref(1);
    const productQuantityLunch = ref(1);
    const productQuantityDinner = ref(1);

    const products = ref([]);
  
 
    const currentDate = ref(new Date());
    const selectedDate = ref({
      day: currentDate.value.getDate(),
      month: currentDate.value.getMonth(),
      year: currentDate.value.getFullYear()
    });

    const currentMonth = ref(currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' }));
    const wybData = ref('');
    let userId = ''; // User ID

    // Pobranie bieżącego zalogowanego użytkownika
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      userId = user.uid;
    } else {
      // Obsługa braku zalogowanego użytkownika
      console.error('Użytkownik niezalogowany');
    }
    const generateDates = () => {
      const year = currentDate.value.getFullYear();
      const month = currentDate.value.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const datesArray = [];
      for (let i = 1; i <= daysInMonth; i++) {
        datesArray.push({ day: i, month, year });
      }
      return datesArray;
    };

    const dates = ref([]);

    const isSelected = (date) => {
      if (!selectedDate.value) return false;
      return selectedDate.value.day === date.day && selectedDate.value.month === date.month && selectedDate.value.year === date.year;
    };

    const selectDate = (date) => {
      selectedDate.value = date;
      wybData.value = `${date.year}-${date.month + 1}-${date.day}`;
      console.log('Selected Date:', wybData.value);
      fetchProducts(date);
    };

    const fetchProducts = async (date) => {
  const docRefBreakfast = doc(db, userId, 'dates', `${date.year}-${date.month + 1}-${date.day}`, 'breakfast');
  const docRefLunch = doc(db, userId, 'dates', `${date.year}-${date.month + 1}-${date.day}`, 'lunch');
  const docRefDinner = doc(db, userId, 'dates', `${date.year}-${date.month + 1}-${date.day}`, 'dinner');

  const breakfastSnap = await getDoc(docRefBreakfast);
  const lunchSnap = await getDoc(docRefLunch);
  const dinnerSnap = await getDoc(docRefDinner);

  breakfastProducts.value = await enrichProductData(breakfastSnap);
  lunchProducts.value = await enrichProductData(lunchSnap);
  dinnerProducts.value = await enrichProductData(dinnerSnap);
};

const enrichProductData = async (snapshot) => {
  if (!snapshot.exists()) return [];
  let productsData = snapshot.data().eatenProducts || [];
  return Promise.all(productsData.map(async product => {
    const productDoc = await getDoc(doc(db, "products", product.productId));
    const productDetails = productDoc.data();
    return {
      ...product,
      kcal: productDetails.kcal, // Kalorie na jednostkę
      totalKcal: Math.round(product.quantity * productDetails.kcal), // Zaokrąglenie całkowitej liczby kalorii
      name: productDetails.name
    };
  }));
};

    const fetchProductsList = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  let allProducts = [];
  querySnapshot.forEach((doc) => {
    allProducts.push({ id: doc.id, ...doc.data() });
  });
  products.value = allProducts;
};

onMounted(async () => {
  await fetchProductsList();
});

const addProduct = async (mealType, productId, quantity) => {
  if (!productId || quantity === undefined || quantity < 1) {
    console.error('Product ID or quantity is undefined or invalid');
    return;
  }

  const productToAdd = products.value.find(p => p.id === productId);
  if (!productToAdd) {
    console.error('Product not found');
    return;
  }

  const docRef = doc(db, userId, 'dates', `${selectedDate.value.year}-${selectedDate.value.month + 1}-${selectedDate.value.day}`, mealType);
  const docSnap = await getDoc(docRef);
  let data = {};

  if (docSnap.exists()) {
    data = docSnap.data();
    let existingProduct = data.eatenProducts.find(p => p.productId === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity; // Update existing quantity
    } else {
      data.eatenProducts.push({ productId: productToAdd.id, quantity }); // Add new product
    }
  } else {
    data = { eatenProducts: [{ productId: productToAdd.id, quantity }] }; // Create new entry if none exists
  }

  await setDoc(docRef, data, { merge: true });
  fetchProducts(selectedDate.value);
};

const removeProduct = async (mealType, productIndex) => {
  try {
    const docRef = doc(db, userId, 'dates', `${selectedDate.value.year}-${selectedDate.value.month + 1}-${selectedDate.value.day}`, mealType);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      let products = data.eatenProducts || [];
      products.splice(productIndex, 1);

      await setDoc(docRef, { eatenProducts: products }, { merge: true });
      fetchProducts(selectedDate.value);
    }
  } catch (error) {
    console.error("Failed to remove product:", error);
  }
};

    const selectedDateProducts = (mealType) => {
      switch (mealType) {
        case 'breakfast':
          return breakfastProducts.value;
        case 'lunch':
          return lunchProducts.value;
        case 'dinner':
          return dinnerProducts.value;
        default:
          return [];
      }
    };

    const breakfastProducts = ref([]);
    const lunchProducts = ref([]);
    const dinnerProducts = ref([]);

    const previousMonth = () => {
      currentDate.value.setMonth(currentDate.value.getMonth() - 1);
      dates.value = generateDates();
      currentMonth.value = currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' });
      fetchProducts(selectedDate.value); // Dodaj tę linię
    };

    const nextMonth = () => {
      currentDate.value.setMonth(currentDate.value.getMonth() + 1);
      dates.value = generateDates();
      currentMonth.value = currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' });
      fetchProducts(selectedDate.value); // Dodaj tę linię
    };

    wybData.value = `${currentDate.value.getFullYear()}-${currentDate.value.getMonth() + 1}-${currentDate.value.getDate()}`;
    dates.value = generateDates();
    fetchProducts(selectedDate.value); // Dodaj tę linię

    return {
      currentMonth,
      dates,
      selectDate,
      isSelected,
      previousMonth,
      nextMonth,
      wybData,
      addProduct,
      breakfastProducts,
      lunchProducts,
      dinnerProducts,
      selectedDateProducts,
      products,
      removeProduct,
      productQuantityBreakfast,
      productQuantityLunch,
      productQuantityDinner
    };
  },
};
</script>


<style>
.calendar {
  width: 500px;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.days div {
  padding: 5px;
  text-align: center;
  cursor: pointer;
}

.days div.active {
  background-color: lightblue;
}

.card {
  width: 500px; /* Szerokość karty */
        margin: 0 auto; /* Wyśrodkowanie karty */
        border: 1px solid #ccc; /* Ramka karty */
        padding: 20px; /* Wypełnienie wewnątrz karty */
        border-radius: 5px; /* Zaokrąglenie rogów karty */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Cień */
}

.select-full-width {
  width: 100%; /* Ustawia szerokość na 100% dostępnej przestrzeni */
  padding: 8px; /* Dodaje padding dla lepszego wyglądu */
  box-sizing: border-box; /* Zapewnia, że padding i border są wliczone w szerokość */
  margin-top: 10px; /* Dodaje górny margines */
  border: 2px solid #ccc; /* Dodaje obramówkę o grubości 2px i kolorze szarym */
  border-radius: 4px; /* Dodaje lekko zaokrąglone rogi */
  flex-grow: 1; /* Pozwala <select> rozciągnąć się, aby zająć dostępną przestrzeń */
  margin-right: 10px; /* Dodaje margines po prawej stronie, aby oddzielić od <input> */
  box-sizing: border-box; /* Zapewnia, że padding i border są wliczone w szerokość */
  height: 40px; /* Ustawia wysokość na 40px dla jednolitości */
}

.quantity-input {
  width: 50px; /* Szerokość pola liczbowego */
  padding: 8px; /* Padding dla wygodniejszego wprowadzania */
  margin-left: 10px; /* Odstęp od listy rozwijanej */
  margin-right: 10px; /* Odstęp przed przyciskiem */
  border: 2px solid #ccc; /* Dodaje obramówkę o grubości 2px i kolorze szarym */
  border-radius: 4px; /* Dodaje lekko zaokrąglone rogi */
  box-sizing: border-box; /* Zapewnia, że padding i border są wliczone w szerokość */
  height: 40px; /* Ustawia wysokość na 40px dla jednolitości */
}

.input-group {
  display: flex; /* Ustawia kontener na flexbox */
  align-items: center; /* Wycentrowuje elementy wertykalnie */
  margin-top: 10px; /* Dodaje margines na górze dla odstępu od listy produktów */
}

.selected-date {
    text-align: center; /* Wyśrodkowanie tekstu */
    font-weight: bold; /* Pogrubienie tekstu */
    margin-top: 20px; /* Dodatkowy margines na górze dla lepszego odstępu */
    font-size: 1.2em; /* Nieco większa czcionka dla lepszej widoczności */
  }

  .section-header {
    text-align: center; /* Wyśrodkowanie tekstu */
    font-weight: bold; /* Pogrubienie tekstu */
    margin-top: 20px; /* Dodatkowy margines na górze dla lepszego odstępu */
    font-size: 1.2em; /* Nieco większa czcionka dla lepszej widoczności */
  }

  .add-btn {
  background-color: #4CAF50; /* Zielony */
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.remove-btn {
  background-color: #f44336; /* Czerwony */
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}
.list-item {
  display: flex;
  justify-content: space-between; /* Rozciąga elementy na całą szerokość kontenera */
  align-items: center; /* Wycentrowuje elementy wertykalnie */
  padding: 5px;
}
</style>
