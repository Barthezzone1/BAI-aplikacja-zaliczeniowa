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
      <div class> Witaj użytkowniku</div>
  
      <!-- Kalendarz -->
      <div class="calendar-container">
        <table>
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
  </template>
  
  <script>
  export default {
    name: 'Calendar',
    data() {
      return {
        currentDate: new Date(),
        week: this.generateWeek(),
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
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
      }
    }
  };
  </script>
  
  <style scoped>
  .calendar-container {
    margin: 0 auto; /* Wyśrodkowanie kalendarza */
    font-weight: bold; /* Ustawienie pogrubionej czcionki */
    font-size: 20px; /* Zwiększenie rozmiaru czcionki */
    border: 2px solid lightblue; /* Dodanie obramowania */
    padding: 10px; /* Dodanie wypełnienia */
    display: inline-block; /* Dopasowanie wielkości do zawartości */
    background-color: lightgoldenrodyellow;
  }
  
  td {
    cursor: pointer; /* Zmiana kursora na wskaźnik podczas najechania na dzień */
    padding: 5px; /* Dodanie spacji między datami */
  }
  
  .active {
    background-color: lightcoral; /* Zaznaczenie aktywnego dnia */
  }
  
  /* Dodaj swoje style tutaj, jeśli są potrzebne */
  </style>
  