<template>
  <div>
    <h1 class="mb-4">Регистрация</h1>
    <p>
      <v-text-field
        type="text"
        placeholder="Email"
        v-model="email"
      ></v-text-field>
    </p>
    <p>
      <v-text-field
        type="password"
        placeholder="Пароль"
        v-model="password"
      ></v-text-field>
    </p>
    <p><button class="mb-4" @click="Регистрация">Submit</button></p>
    <p><button @click="signInWithGoogle">Войти с помощью Google</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!");
      router.push("/feed");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};

const signInWithGoogle = () => {
  console.log("Google sign-in button clicked!");
  const provider = new GoogleAuthProvider();

  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result);
      router.push("/feed");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>