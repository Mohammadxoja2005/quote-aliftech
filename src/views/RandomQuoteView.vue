<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { RouterLink } from 'vue-router'

const store = useStore();

store.dispatch('generateRandomQuote');

let randomQuote: any = ref();
let authorName = ref<string>('');
let quote = ref<string>('');
let genre = ref<string>('');
let lastUpdated = ref<string>('');

const generateQuote = () => {
  store.dispatch('generateRandomQuote')
    .then(() => {
      randomQuote.value = computed(() => store.getters.getRandomQuotes);
      authorName.value = randomQuote.value.value.author;
      quote.value = randomQuote.value.value.quote;
      genre.value = randomQuote.value.value.genre;
      lastUpdated.value = randomQuote.value.value.updatedAt;
    })
}

</script> 

<template>
  <div class="quote-generator">
    <router-link to="/">
      <button class="quote-generator__button">
        Пойти в основну страницу
      </button>
    </router-link>
    <button @click="generateQuote" class="quote-generator__button">
      Сгенерировать цитату
    </button>

    <div class="card">
      <div class="card-item" v-if="authorName">
        <div class="card-author">Автор: {{ authorName }} </div>
        <div class="card-quote">{{ quote }}</div>

        <div class="card-container-updates">
          <div class="card-genre">Genre: {{ genre }}</div>
          <div class="card-updated">Last Updated: {{ lastUpdated }}</div>
        </div>

      </div>
      <div v-else>
        <div>нажмите на синию кнопку что бы сгенерировать цитату</div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.quote-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quote-generator__button {
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.quote-generator__button:hover {
  background-color: #0062cc;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 10px;
}

.card-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-author {
  font-weight: bold;
  margin-bottom: 10px;
}

.card-quote {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
}

.card-container-updates {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
}

.card-genre,
.card-updated {
  font-size: 0.8rem;
}

/* @media only screen and (min-width: 768px) {
  .card-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .card-quote {
    margin: 0;
  }
} */
</style>