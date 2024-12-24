<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Библиотека</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="filteredBooks"
          item-value="id"
          class="elevation-1"
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Список книг</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                label="Поиск"
                class="mx-4"
                clearable
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon @click="deleteBook(item.id)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="errorSnackbar" :timeout="3000" color="error">
      Ошибка при загрузке или удалении книги
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const books = ref([]);
const search = ref('');
const errorSnackbar = ref(false);

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Название', value: 'title' },
  { text: 'Автор', value: 'author' },
  { text: 'Кто взял', value: 'borrowedBy' },
  { text: 'Действия', value: 'actions', sortable: false }
];

const fetchBooks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/books');
    books.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке книг:', error);
    errorSnackbar.value = true;
  }
};

const deleteBook = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/books/${id}`);
    books.value = books.value.filter((book) => book.id !== id);
  } catch (error) {
    console.error('Ошибка при удалении книги:', error);
    errorSnackbar.value = true;
  }
};

const filteredBooks = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return books.value.filter((book) =>
    book.title.toLowerCase().includes(searchTerm) ||
    book.author.toLowerCase().includes(searchTerm) ||
    (book.borrowedBy && book.borrowedBy.toLowerCase().includes(searchTerm))
  );
});

onMounted(fetchBooks);
</script>

<style scoped>
.v-container {
  max-width: 900px;
  margin: 0 auto;
}
</style>
