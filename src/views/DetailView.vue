<script lang="ts">
import { onMounted, reactive } from 'vue';
import Loader, { actions as LoaderActions } from "../components/Loader.vue";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import ErrorPage, { actions as ErrorActions, textActions as ErrorText } from '@/components/ErrorPage.vue';

export default {
    name: "DefaultView",
    components: {
        "loader": Loader,
        "error-page": ErrorPage
    },
    setup() {
        const store = useStore();
        const route = useRoute();

        const state: any = reactive({
            quote: "",
            author: "",
            genre: "",
            createdAt: "",
            updatedAt: ""
        })

        onMounted(async () => {
            LoaderActions.open();
            try {
                await store.dispatch('getSingleQuote', route.params.id).then(() => {
                    const { quote, author, genre, createdAt, updatedAt } = store.getters.getSingleQuote;

                    state.quote = quote;
                    state.author = author;
                    state.genre = genre;
                    state.createdAt = createdAt;
                    state.updatedAt = updatedAt;
                })
            } catch (error: any) {
                ErrorActions.open();
                ErrorText.setText(error.message);
            } finally {
                LoaderActions.close();
            }
        })

        return {
            state
        };
    }
}
</script>

<template>
    <form>
        <loader />
        <error-page />
        <div class="form-container">
            <div class="input-container">
                <label for="quote">Текст цитаты: {{ state.quote }}</label>
            </div>

            <div class="input-container">
                <label for="author">Автор цитаты: {{ state.author }}</label>
            </div>

            <div class="input-container">
                <label for="genre" class="label">Жанры: {{ state.genre }}</label>
            </div>

            <div class="input-container">
                <label for="genre" class="label">Дата создание: {{ state.createdAt }}</label>
            </div>

            <div class="input-container">
                <label for="genre" class="label">Дата обновление: {{ state.updatedAt }}</label>
            </div>
            <router-link to="/" class=""><button>Пойти в основеую страницу</button></router-link>
        </div>
    </form>
</template>
  
<style scoped> .form-container {
     display: flex;
     flex-direction: column;
     align-items: center;
     gap: 20px;
 }

 .input-container {
     display: flex;
     flex-direction: column;
     margin-bottom: 1rem;
     width: 100%;
     max-width: 500px;
 }

 label {
     margin-bottom: 0.5rem;
     font-weight: bold;
 }

 input,
 select {
     padding: 0.5rem;
     font-size: 1rem;
     border: 1px solid #ccc;
     border-radius: 5px;
     width: 100%;
     box-sizing: border-box;
 }

 button {
     background-color: #007bff;
     color: #fff;
     padding: 0.5rem 1rem;
     border-radius: 5px;
     border: none;
     font-size: 1rem;
     cursor: pointer;
     transition: background-color 0.2s ease-in-out;
 }

 button:hover {
     background-color: #0062cc;
 }

 @media screen and (min-width: 768px) {
     form {
         flex-direction: row;
         justify-content: center;
         align-items: flex-start;
         flex-wrap: wrap;
     }

     .input-container {
         margin-right: 1rem;
         margin-bottom: 0;
         width: 33.33%;
     }

     button {
         width: 100%;
         max-width: 150px;
     }
 }
</style>
