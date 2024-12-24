<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Добавить книгу</v-card-title>
      <v-card-text>
        <v-form ref="bookForm" v-model="valid">
          <v-text-field
            label="Название книги"
            v-model="book.title"
          ></v-text-field>

          <v-text-field
            label="Автор книги"
            v-model="book.author"
          ></v-text-field>

          <v-text-field
            label="Кто берет книгу"
            v-model="book.borrowedBy"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn :disabled="!valid" color="primary" @click="addBook">
          Добавить
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar" :timeout="3000" color="success">
      Книга добавлена успешно!
    </v-snackbar>

    <v-snackbar v-model="errorSnackbar" :timeout="3000" color="error">
      Ошибка при добавлении книги
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const valid = ref(false);
const snackbar = ref(false);
const errorSnackbar = ref(false);

const book = ref({
  title: '',
  author: '',
  borrowedBy: ''
});

const rules = {
  required: value => !!value || 'Обязательное поле'
};

const addBook = async () => {
  try {
    await axios.post('http://localhost:3000/books', book.value);
    snackbar.value = true;
    book.value.title = '';
    book.value.author = '';
    book.value.borrowedBy = '';
  } catch (error) {
    console.error('Ошибка при добавлении книги:', error);
    errorSnackbar.value = true;
  }
};
</script>

<style scoped>
.v-container {
  max-width: 500px;
  margin: 0 auto;
}
</style>
