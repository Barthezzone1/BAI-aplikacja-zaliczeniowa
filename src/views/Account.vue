<template>
    <div class="max-w-xl mx-auto mt-8">
      <h1 class="text-2xl font-bold mb-4 text-center">Twoje konto</h1>
      <div v-if="userData">
        <p><strong>Wiek:</strong> {{ userData.age }}</p>
        <p><strong>Płeć:</strong> {{ userData.gender }}</p>
        <p><strong>Waga:</strong> {{ userData.weight }} kg</p>
        <p><strong>Wzrost:</strong> {{ userData.height }} cm</p>
        <p><strong>Aktywność w tygodniu:</strong> {{ userData.activity }}</p>
        <p><strong>Cel kaloryczny:</strong> {{ userData.caloricGoal }}</p>
      </div>
      <button @click="redirectToInfo" class="mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 block">Zmień dane</button>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '../main';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const router = useRouter();
const auth = getAuth();

const userData = ref(null);
const userUid = ref(null); // Zmienna do przechowywania UID użytkownika

const redirectToInfo = () => {
  router.push('/info');
};

const fetchData = async () => {
  const user = auth.currentUser;
  if (user) {
    userUid.value = user.uid; // Przypisanie UID użytkownika
    const q = query(collection(db, 'info'), where('userId', '==', userUid.value));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("Brak danych dla użytkownika");
      return;
    }
    querySnapshot.forEach((doc) => {
      userData.value = doc.data();
    });
    console.log(userData.value);
  } else {
    console.error('User not logged in');
  }
};


onMounted(() => {
  fetchData();
});
</script>

  
  <style scoped>
  .button-center {
    text-align: center;
  }
  </style>
  