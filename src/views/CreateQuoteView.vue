<script lang="ts">
import { reactive } from 'vue';
import { RouterLink } from 'vue-router'
import { useStore } from "vuex";
import { uuid } from 'vue-uuid';
import Loader, { actions as LoaderActions } from "@/components/Loader.vue";

export default {
    name: "CreateQuoteView",
    components: {
        loader: Loader
    },
    setup() {
        const store = useStore();

        const state: any = reactive({
            id: '',
            quote: '',
            author: '',
            genre: '',
            createdAt: '',
            updatedAt: ''
        })

        const handleSubmit = async (event: any) => {
            event.preventDefault();

            state.id = uuid.v4();
            state.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
            state.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

            if (state.author === '' || state.quote == '') {
                alert('автор и цитата не может быть пустым')
                return;
            }

            LoaderActions.open();

            try {
                await store.dispatch('createQuote', state)
            } catch (error) {
                console.log(error);
            } finally {
                LoaderActions.close();
                state.id = "",
                    state.quote = "",
                    state.author = "",
                    state.genre = "",
                    state.createdAt = "",
                    state.updatedAt = ""
            }
        }

        return {
            state,
            handleSubmit
        }
    }
}

</script>
<template>
    <form>
        <loader />
        <div class="form-container">
            <div class="input-container">
                <label for="quote">Текст цитаты:</label>
                <input type="text" v-model="state.quote" id="quote" placeholder="Введите текст цитаты">
            </div>

            <div class="input-container">
                <label for="author">Автор цитаты:</label>
                <input type="text" v-model="state.author" id="author" placeholder="Введите автора цитаты">
            </div>

            <div class="input-container">
                <label for="genre" class="label">Жанры:</label>
                <input type="text" v-model="state.genre" id="author" class="input" placeholder="old, motivational">
            </div>

            <button @click="handleSubmit($event)">Создать цитату</button>
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


