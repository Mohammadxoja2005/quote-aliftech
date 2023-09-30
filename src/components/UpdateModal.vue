<script lang="ts">
import { reactive } from 'vue';
import { useStore } from "vuex";
import { VisibilityHandler } from "@/utils/VisibilityHandler";
import { emitter } from '@/views/HomeView.vue';
import Loader, { actions as LoaderActions } from "../components/Loader.vue";

const state: any = reactive({
    id: '',
    quote: '',
    author: '',
    genre: '',
    createdAt: '',
    updatedAt: ''
})

export const actions = new VisibilityHandler();

export const getData = (object: any) => {
    const { id, quote, author, genre, createdAt } = object;

    state.id = id;
    state.quote = quote;
    state.author = author;
    state.genre = genre;
    state.createdAt = createdAt;
    state.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
}

export default {
    name: "UpdateModal",
    components: {
        'loader': Loader
    },
    setup() {
        const store = useStore();

        const handleSubmit = async () => {
            LoaderActions.open();
            try {
                await store.dispatch('updateQuote', state);
            } catch (error) {
                console.log(error)
            } finally {
                emitter.emit('triggerQuote');
                LoaderActions.close();
                actions.close();
            }
        }

        return {
            actions,
            handleSubmit,
            state
        }
    }
}
</script>

<template>
    <div class="modal-container" v-if="actions.isHide.value">
        <loader />
        <form>
            <div class="form-container">
                <div class="input-container">
                    <label for="quote" class="label">Текст цитаты:</label>
                    <input type="text" v-model="state.quote" id="quote" class="input" placeholder="Введите текст цитаты">
                </div>
                <div class="input-container">
                    <label for="author" class="label">Автор цитаты:</label>
                    <input type="text" v-model="state.author" id="author" class="input" placeholder="Введите автора цитаты">
                </div>

                <div class="input-container">
                    <label for="author" class="label">Жанры:</label>
                    <input type="text" v-model="state.genre" id="author" class="input" placeholder="Введите автора цитаты">
                </div>

                <!-- <div class="input-container">
                    <label for="genre" class="label">Жанр:</label>
                    <select v-model="state.genre" id="genre" class="input">
                        <option disabled value="">Выберите один жанр</option>
                        <option v-for="( item ) in  state.genres " :value="item">{{ item }}</option>
                    </select>  
                    
                </div> -->

                <div @click="handleSubmit()" class="button">Обновить цитату</div>
                <div @click="() => actions.close()" class="button">Закрыть</div>
            </div>
        </form>
    </div>
</template> 

<style scoped> .modal-container {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.5);
     display: flex;
     justify-content: center;
     align-items: center;
     font-size: 24px;
     color: white;
 }

 .form-container {
     display: flex;
     flex-direction: column;
     gap: 1rem;
     margin: 0 auto;
     max-width: 600px;
     padding: 1rem;
     background-color: #f5f5f5;
     border-radius: 10px;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
 }

 .input {
     padding: 0.5rem;
     border-radius: 5px;
     border: 1px solid #ccc;
     font-size: 1rem;
 }

 .input-container {
     display: flex;
     flex-direction: column;
     gap: 0.5rem;
 }

 .label {
     font-size: 1.2rem;
     font-weight: bold;
 }

 .button {
     padding: 0.5rem;
     border-radius: 5px;
     border: none;
     background-color: #007aff;
     color: #fff;
     font-size: 1rem;
     cursor: pointer;
     transition: background-color 0.2s ease-in-out;
     text-align: center;
 }

 .button:hover {
     background-color: #0062cc;
 }
</style>