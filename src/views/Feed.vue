<template>
  <div class="week-calendar">
    <div class="day" 
         v-for="day in weekDays" 
         :key="day.date" 
         :class="{ 'current': day.isCurrent, 'selected': selectedDate === day.date }"
         @click="selectDay(day.date)">
      {{ day.name }}<br>{{ day.date }}
    </div>
  </div>

  <div class="spacing"></div>

  <div class="meals-container">
    <div class="meal" 
         v-for="meal in ['Śniadanie', 'Obiad', 'Kolacja', 'Przekąski']" 
         :key="meal"
         @click="goToMeal(meal)">
      {{ meal }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'WeekCalendar',
  setup() {
    const router = useRouter();
    const weekDays = ref([]);
    const selectedDate = ref("");

    const getWeekDays = () => {
      const today = new Date();
      for (let i = -3; i <= 3; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        weekDays.value.push({
          name: nextDay.toLocaleDateString('pl-PL', { weekday: 'long' }),
          date: nextDay.toLocaleDateString('pl-PL'),
          isCurrent: i === 0
        });
      }
    };

    const selectDay = (date) => {
      selectedDate.value = date;
    };

    const goToMeal = (meal) => {
  router.push({ name: 'Meal', params: { mealName: meal } });
};

    onMounted(() => {
      getWeekDays();
    });

    return {
      weekDays,
      selectedDate,
      selectDay,
      goToMeal
    };
  }
});
</script>
<style scoped>
.week-calendar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.day {
  flex: 1;
  text-align: center;
  padding: 5px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s;
}

.day:hover, .meal:hover {
  background-color: #f1f1f1;
}

.selected {
  background-color: #ffcccc;
  color: #6358a1;
}

.spacing {
  height: 72px; /* Wysokość odpowiadająca trzem enterom */
}

.meals-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.meal {
  padding: 10px;
  background-color: #e8e8e8;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  text-align: center;
  margin: 5px 0; /* Mały odstęp pomiędzy posiłkami */
  width: 50%; /* Szerokość kontenera posiłków */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}
</style>
