<template>
  <div>
    <h1 class="mb-4">Войти</h1>
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
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button class="mb-4" @click="register">Войти</button></p>
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
const errMsg = ref("");
const router = useRouter();

const register = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully signed in!");
      router.push("/feed");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
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