<template>
    <div class="meal-container">
      <h1 class="meal-title">{{ mealName }}</h1>
      <!-- Lista produktów -->
      <div v-for="product in products" :key="product.id" class="product-item">
        <h3 class="product-name">{{ product.name }}</h3> <!-- Nazwa produktu -->
        <img :src="product.imageURL" alt="Product Image" class="product-image">
        <p>Kcal: {{ product.kcal }}</p>
        <p>Grams: {{ product.grams }}</p>
        <p>Carbs: {{ product.carbs }}</p>
        <p>Protein: {{ product.protein }}</p>
        <p>Fat: {{ product.fat }}</p>
      </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../main'; // Uaktualnij ścieżkę do twojej konfiguracji Firebase

export default defineComponent({
  name: 'Meal',
  setup() {
    const route = useRoute();
    const mealName = computed(() => route.params.mealName);
    const products = ref([]);

    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products")); // Użyj właściwej nazwy kolekcji
      products.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    };

    onMounted(fetchProducts);

    return { mealName, products };
  }
});
</script>

<style scoped>
.meal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3em;
  margin-top: 60px;
  width: 100%;
}

.meal-title {
  font-weight: bold;
  font-size: 24px;
  text-align: center;
}

.product-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  width: 80%;
  text-align: center;
}

.product-image {
  width: 100px;
  height: auto;
}
</style>
