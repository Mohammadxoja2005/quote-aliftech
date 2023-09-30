<script lang="ts">
import { reactive } from 'vue';
import { useStore } from "vuex";
import { toggleModal } from "../utils/toggleModal.vue";

const quoteContext: any = reactive({
    quote: '',
    author: '',
    genre: ''
})

const quoteData: any = reactive({
    id: '',
    quote: '',
    author: '',
    genre: '',
    createdAt: '',
    updatedAt: ''
})

export const actions = new toggleModal();

export const getData = (object: any) => {
    const { id, quote, author, genre, createdAt } = object;

    quoteData.id = id;
    quoteData.quote = quote;
    quoteData.author = author;
    quoteData.genre = genre;
    quoteData.createdAt = createdAt;
    quoteData.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
}

export default {
    name: "UpdateModal",
    setup() {
        const store = useStore();

        const handleSubmit = () => {
            // store.dispatch('updateQuote',);
        }

        return {
            actions,
            handleSubmit,
            quoteContext
        }
    }
}
</script>

<template>
    <div class="modal-container" v-if="actions.isHide.value">

        <form>
            <div class="form-container">
                <div class="input-container">
                    <label for="quote" class="label">Текст цитаты:</label>
                    <input type="text" v-model="quoteContext.quote" id="quote" class="input"
                        placeholder="Введите текст цитаты">
                </div>
                <div class="input-container">
                    <label for="author" class="label">Автор цитаты:</label>
                    <input type="text" v-model="quoteContext.author" id="author" class="input"
                        placeholder="Введите автора цитаты">
                </div>

                <div class="input-container">
                    <label for="genre" class="label">Жанр:</label>
                    <select v-model="quoteContext.genre" id="genre" class="input">
                        <option disabled value="">Выберите один жанр</option>
                        <!-- <option v-for="( item ) in  quoteContext.genres " :value="item">{{ item }}</option> -->
                    </select>
                </div>

                <button class="button">Обновить цитату</button>
                <div @click="() => actions.close()" class="button">Закрыть</div>
            </div>
        </form>
    </div>
</template> 

<style scoped> .form-container {
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
 }

 .button:hover {
     background-color: #0062cc;
 }
</style>