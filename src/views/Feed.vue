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
        <li v-for="product in breakfastProducts" :key="product.id">
          {{ product.id }}
        </li>
      </ul>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

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
    };

    const previousMonth = () => {
      currentDate.value.setMonth(currentDate.value.getMonth() - 1);
      dates.value = generateDates();
      // Aktualizacja etykiety miesiąca po zmianie miesiąca
      currentMonth.value = currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    const nextMonth = () => {
      currentDate.value.setMonth(currentDate.value.getMonth() + 1);
      dates.value = generateDates();
      // Aktualizacja etykiety miesiąca po zmianie miesiąca
      currentMonth.value = currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    // Ustawienie początkowej wartości wybData na dzisiejszą datę
    wybData.value = `${currentDate.value.getFullYear()}-${currentDate.value.getMonth() + 1}-${currentDate.value.getDate()}`;

    // Initial generation of dates
    dates.value = generateDates();
    

    return {
      currentMonth,
      dates,
      selectDate,
      isSelected,
      previousMonth,
      nextMonth,
      wybData
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
