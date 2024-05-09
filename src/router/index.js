import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router';
import Info from '../views/Info.vue';
import Meal from '../views/Meal.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/meal/:mealName',
      name: 'Meal',
      component: () => import('../views/Meal.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/Products.vue')
    },
    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: () => import('../views/ProductDetails.vue'),
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/Blog.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/feed',
      name: 'feed',
      component: () => import('../views/Feed.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../views/Info.vue'),
      meta: {
        requiresAuth: true,
        requiresFormFilled: true
      },
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/Account.vue'),
      meta: {
        requiresAuth: true,
      },
    },

  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListner = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListner();
        resolve(user);
      },
      reject
    );

  });
};

router.beforeEach((to, from, next) => {
  if (to.meta.requiresFormFilled && !localStorage.getItem('infoCompleted')) {
    next('/info'); // Przekierowanie do formularza, jeśli formularz nie jest wypełniony
  } else {
    next(); // Kontynuacja nawigacji
  }
});




export default router
