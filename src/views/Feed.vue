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
    <div>Wybrana data: {{ wybData }}</div>
  </div>
  <div class="card">
    <h2 class="section-header">ŚNIADANIE</h2>
    <hr class="section-divider">
    <ul>
      <li v-for="product in selectedDateProducts('breakfast')" :key="product.productId">
        {{ product.productId }} - {{ product.quantity }} szt.
      </li>
    </ul>
    <button @click="addProduct('breakfast')">Dodaj produkt</button>
  </div>
  <div class="card">
    <h2 class="section-header">OBIAD</h2>
    <hr class="section-divider">
    <ul>
      <li v-for="product in selectedDateProducts('lunch')" :key="product.productId">
        {{ product.productId }} - {{ product.quantity }} szt.
      </li>
    </ul>
    <button @click="addProduct('lunch')">Dodaj produkt</button>
  </div>
  <div class="card">
    <h2 class="section-header">KOLACJA</h2>
    <hr class="section-divider">
    <ul>
      <li v-for="product in selectedDateProducts('dinner')" :key="product.productId">
        {{ product.productId }} - {{ product.quantity }} szt.
      </li>
    </ul>
    <button @click="addProduct('dinner')">Dodaj produkt</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../main';
import { getAuth } from 'firebase/auth';

export default {
  name: 'Calendar',
  setup() {
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

      if (breakfastSnap.exists()) {
        const breakfastData = breakfastSnap.data();
        breakfastProducts.value = breakfastData.eatenProducts || [];
      } else {
        breakfastProducts.value = [];
      }

      if (lunchSnap.exists()) {
        const lunchData = lunchSnap.data();
        lunchProducts.value = lunchData.eatenProducts || [];
      } else {
        lunchProducts.value = [];
      }

      if (dinnerSnap.exists()) {
        const dinnerData = dinnerSnap.data();
        dinnerProducts.value = dinnerData.eatenProducts || [];
      } else {
        dinnerProducts.value = [];
      }
    };

    const addProduct = async (mealType) => {
      const product = await prompt('Enter product ID:');
      if (product) {
        const docRef = doc(db, userId, 'dates', `${selectedDate.value.year}-${selectedDate.value.month + 1}-${selectedDate.value.day}`, mealType);
        const docSnap = await getDoc(docRef);
        let data = {};
        if (docSnap.exists()) {
          data = docSnap.data();
        }
        const eatenProducts = data.eatenProducts || [];
        eatenProducts.push({ productId: product, quantity: 1 }); // Assuming quantity starts from 1
        await setDoc(docRef, { eatenProducts }, { merge: true });
        fetchProducts(selectedDate.value);
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
      selectedDateProducts
    };
  },
};
</script>


<style>
.calendar {
  width: 300px;
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
  width: 300px; /* Szerokość karty */
        margin: 0 auto; /* Wyśrodkowanie karty */
        border: 1px solid #ccc; /* Ramka karty */
        padding: 20px; /* Wypełnienie wewnątrz karty */
        border-radius: 5px; /* Zaokrąglenie rogów karty */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Cień */
}
</style>
