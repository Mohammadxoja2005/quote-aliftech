<script lang="ts">
import { computed, reactive, onMounted } from "vue";
import { RouterLink } from 'vue-router'
import { useStore } from "vuex";
import UpdateModal, { actions as updateActions, getData as updateGetData } from "@/components/UpdateModal.vue";
import DeleteModal, { actions as deleteActions, getData as deleteGetData } from "@/components/DeleteModal.vue";
import Loader, { actions as LoaderActions } from "@/components/Loader.vue"
import ErrorPage, { actions as ErrorActions, textActions as ErrorText } from "@/components/ErrorPage.vue";
import type { IQuote } from "@/models";
import mitt from 'mitt'

export const emitter = mitt()

export default {
    name: "HomeView",
    components: {
        'update-modal': UpdateModal,
        'delete-modal': DeleteModal,
        'loader': Loader,
        'error-page': ErrorPage
    },
    setup() {
        const store = useStore();

        const state: {
            quotes: Array<IQuote>,
            selectLabel: string,
            searchInput: string
        } = reactive({
            quotes: [],
            selectLabel: "quote",
            searchInput: ""
        })

        const fetchQuotes = async () => {
            await store.dispatch('getQuotes')
                .then(() => {
                    state.quotes = store.getters.getQuotes;
                })
        }

        onMounted(async () => {
            LoaderActions.open();
            try {
                await fetchQuotes()
            } catch (error: any) {
                ErrorActions.open();
                ErrorText.setText(error.message)
            } finally {
                LoaderActions.close();
            }
        });

        emitter.on("triggerQuote", fetchQuotes)

        const selectedQuoteSearch = computed(() => {
            if (state.selectLabel === 'quote') {
                return state.quotes.filter((item) =>
                    item.quote.toLowerCase().trim().includes(state.searchInput.toLowerCase().trim())
                )
            }

            if (state.selectLabel === 'author') {
                return state.quotes.filter((item) =>
                    item.author.toLowerCase().trim().includes(state.searchInput.toLowerCase().trim())
                )
            }
        })

        const actions = (object: IQuote, type: string, event: MouseEvent) => {
            event.preventDefault();

            if (type === "edit") {
                updateActions.open();
                updateGetData(object);
                return;
            }

            if (type === "delete") {
                deleteActions.open();
                deleteGetData(object);
                return;
            }
        }

        return {
            state,
            selectedQuoteSearch,
            actions
        }
    }
}

</script>

<template>
    <form>
        <loader />
        <error-page />
        <div class="form-container">
            <div class="form-inputs">
                <router-link to="/create" class="create-link"><button>создать цитату</button></router-link>
                <div class="search-container">
                    <div class="search-input">
                        <input type="text" v-model="state.searchInput" placeholder="Поиск...">
                    </div>
                    <select class="search-options" v-model="state.selectLabel" name="options">
                        <option value="quote">Цитата</option>
                        <option value="author">Автор</option>
                    </select>
                </div>
            </div>

            <div class="card-container">
                <div class="card" v-for="(item) in  selectedQuoteSearch" :key="item.id">
                    <div class="card-author">{{ item.author }}</div>
                    <div class="card-quote">{{ item.quote }}</div>

                    <div class="card-container-updates">
                        Genre:
                        <div class="card-genre" v-for="(genre, index) in item.genre.split(',')" :key="index">
                            <p class="card-genre-text">{{ genre }}</p>
                        </div>
                    </div>

                    <div class="card-container-updates">
                        <div class="card-updated">Created: {{ item.createdAt }}</div>
                        <div class="card-updated">Last Updated: {{ item.updatedAt }}</div>
                    </div>

                    <div class="card-btns">
                        <router-link class="card-see" :to="'/detail/' + item.id">
                            <button>Смотреть детали</button>
                        </router-link>
                        <button class="card-delete" @click="actions(item, 'delete', $event)">Удалить цитату</button>
                        <button class="card-update" @click="actions(item, 'edit', $event)">Редактировать цитату</button>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <update-modal />
    <delete-modal />
</template>
  
<style scoped> .search-container {
     display: flex;
     align-items: center;
 }

 .search-options {
     padding: 0.5rem;
     border: none;
     border-radius: 5px;
     box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
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

 .input-container {
     display: flex;
     flex-direction: column;
     gap: 0.5rem;
 }

 .label {
     font-size: 1.2rem;
     font-weight: bold;
 }

 .input {
     padding: 0.5rem;
     border-radius: 5px;
     border: 1px solid #ccc;
     font-size: 1rem;
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

 @media screen and (min-width: 768px) {
     .form-container {
         flex-direction: row;
         justify-content: space-between;
         align-items: center;
         padding: 2rem;
     }
 }


 .create-link {
     margin-bottom: 10px;
 }

 .form-container {
     display: flex;
     flex-direction: column;
     align-items: center;
 }

 .form-inputs {
     display: flex;
     flex-direction: column;
     align-items: center;
     margin-bottom: 1rem;
 }

 .search-input {
     display: flex;
     align-items: center;
 }

 .search-input input {
     margin-right: 1rem;
     padding: 0.5rem;
     border: none;
     border-radius: 5px;
     box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
 }

 .search-input button {
     padding: 0.5rem 1rem;
     border: none;
     border-radius: 5px;
     background-color: #0099ff;
     color: #fff;
     cursor: pointer;
 }

 button {
     padding: 0.5rem 1rem;
     border: none;
     border-radius: 5px;
     background-color: #0099ff;
     color: #fff;
     cursor: pointer;
 }

 .radio-buttons {
     display: flex;
     justify-content: center;
     margin-bottom: 1rem;
 }

 .radio-buttons label {
     display: flex;
     align-items: center;
     margin-right: 1rem;
     font-weight: bold;
 }

 .radio-buttons input[type="radio"] {
     margin-right: 0.5rem;
 }

 .card-container {
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     flex-direction: column;
 }

 .card-container-updates {
     display: flex;
     align-items: center;
     gap: 10px;
 }

 .card {
     display: flex;
     flex-direction: column;
     align-items: center;
     padding: 1rem;
     border: 1px solid #ccc;
     border-radius: 5px;
     margin: 0.5rem;
     max-width: 300px;
     box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
 }

 .card-author {
     font-size: 1.2rem;
     font-weight: bold;
     margin-bottom: 0.5rem;
 }

 .card-quote {
     font-size: 1.1rem;
     margin-bottom: 0.5rem;
 }

 .card-genre {
     font-size: 0.9rem;
     margin-bottom: 0.5rem;
 }

 .card-genre-text {
     max-width: 100px;
 }

 .card-updated {
     font-size: 0.8rem;
     color: #999;
 }

 .card-btns {
     display: flex;
     gap: 10px;
 }

 .card-delete {
     background-color: red;
 }

 .card-update {
     background-color: orange;
 }
</style>

@/models/Quote