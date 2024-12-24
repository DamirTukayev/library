<template>
  <div id="app">
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/admin">Админка</router-link>
      <router-link to="/feed">Журнал</router-link>
      <router-link to="/register">Регистрация</router-link>
      <router-link to="/sign-in">Вход</router-link>
      <button @click="handleSignOut" v-if="isLoggedIn">Log out</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isLoggedIn = ref(false);
    const router = useRouter();
    const auth = ref(null); // Используем ref для auth

    onMounted(() => {
      console.log('here');
      
      auth.value = getAuth(); // Инициализация auth внутри onMounted
      onAuthStateChanged(auth.value, (user) => {
        if (user) {
          isLoggedIn.value = true;
        } else {
          isLoggedIn.value = false;
        }
      });
    });

    const handleSignOut = () => {
      signOut(auth.value).then(() => {
        router.push("/");
      });
    };

    return {
      isLoggedIn,
      handleSignOut,
    };
  },
};
</script>

<style>
nav {
  margin-bottom: 20px;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}
nav a.router-link-active {
  font-weight: bold;
}
</style>
