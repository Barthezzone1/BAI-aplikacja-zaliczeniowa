<template>
  <!-- Products -->
  <div class="flex justify-center">
  </div>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
      <div class="max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Poznaj zespół InFit</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">Jesteśmy zespołem pasjonatów zdrowego odżywiania, którzy codziennie dostarczają świeże, zrównoważone i inspirujące treści dotyczące żywienia. Nasz dziennik odżywiania to miejsce, w którym dzielimy się wiedzą, przepisami, poradami i motywacją, aby pomóc innym w osiągnięciu ich celów zdrowotnych i wellnessowych. Razem tworzymy społeczność wspierającą się nawzajem w drodze do lepszego samopoczucia i stylu życia.</p>
      </div>
      <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        <li v-for="person in people" :key="person.name">
          <div class="flex items-center gap-x-6">
            <img class="h-16 w-16 rounded-full" :src="person.imageUrl" alt="" />
            <div>
              <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">{{ person.name }}</h3>
              <p class="text-sm font-semibold leading-6 text-indigo-600">{{ person.role }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup>

import { ref, onMounted  } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../main.js';


const people = ref([

]);

onMounted(async() => {
const querySnapshot = await getDocs(collection(db, "about"));
let allPeople = []
querySnapshot.forEach((doc) => {
console.log(doc.id, " => ", doc.data());
const prod = {
  id: doc.id,
  name: doc.data().name,
  role: doc.data().role,
  imageUrl: doc.data().imageUrl,
}
allPeople.push(prod)
});
  people.value = allPeople
});



</script>
