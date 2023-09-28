<script setup lang="ts">
import { computed, watchEffect, reactive, ref, watch } from "vue";
import { RouterLink } from 'vue-router'
import { useStore } from "vuex";

const store = useStore();

const selectedGenre = ref<string>('');
const selectedAuthor = ref<string>('');
const selectedChoice = ref<string>('quote');
const searchInput = ref<string>('');

const sortByDate = ref<string>('');

const quote = ref<string>('')
const author = ref<string>('');
const genre = ref<number>();

let modalDeletesShow = ref<boolean>(false);
let modalUpdateShow = ref<boolean>(false);
let deleteId = ref<number | undefined>();
let updateId = ref<number | undefined>();
let createdAt = ref<string | undefined>('');

const now = new Date();
const date: string = now.toISOString().slice(0, 19).replace('T', ' ');

const quoteDetails: any = reactive({
    authors: [],
    genres: [],
    quotes: [],
    filteredQuotes: []
})


watchEffect(() => {
    Promise.all([store.dispatch('getAuthors'), store.dispatch("getGenresOfQuote"), store.dispatch('getQuotes')])
        .then(
            () => {
                quoteDetails.authors.push(...store.getters.getAuthors)
                quoteDetails.genres.push(...store.getters.getGenres)
                quoteDetails.quotes.push(...store.getters.getQuotes);
                quoteDetails.filteredQuotes.push(...store.getters.getQuotes);
            })
})

const searchByChoice = computed(() => {

    switch (selectedChoice.value) {
        case 'quote': {
            quoteDetails.quotes = quoteDetails.filteredQuotes.filter((item: any) => item.quote.toLowerCase().trim().includes(searchInput.value.toLowerCase().trim()))
        }; break;
        case 'author': {
            quoteDetails.quotes = quoteDetails.filteredQuotes.filter((item: any) => item.author.toLowerCase().trim().includes(searchInput.value.toLowerCase().trim()))
        }; break;

        default: console.log("nothing worked");
    }

    const filtered = quoteDetails.quotes.filter((item: any) => {
        // Check search text
        const searchTextMatch =
            searchInput.value === '' ||
            item.quote.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            item.author.toLowerCase().includes(searchInput.value.toLowerCase())

        // Check author filter
        const authorFilterMatch =
            selectedAuthor.value === '' || item.author === selectedAuthor.value

        // Check genre filter
        const genreFilterMatch =
            selectedGenre.value === '' || item.genre === selectedGenre.value

        return searchTextMatch && authorFilterMatch && genreFilterMatch
    })

    return filtered;
})

watch(sortByDate, () => {
    switch (sortByDate.value) {
        case 'bycreate': {
            searchByChoice.value.sort((a: { createdAt: string }, b: { createdAt: string }) => {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            });
        }; break;
        case 'byupdate': {
            searchByChoice.value.sort((a: { updatedAt: string }, b: { updatedAt: string }) => {
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            });
        }; break;
    }
    console.log(searchByChoice.value);
})

const openModalDelete = (id: number, event: any) => {
    event.preventDefault();
    modalDeletesShow.value = true;
    deleteId.value = id;
}

const openModalUpdate = (id: number, createdAtReg: string, event: any) => {
    event.preventDefault();
    modalUpdateShow.value = true;
    updateId.value = id;
    createdAt.value = createdAtReg;
}

const closeModal = (event: any) => {
    event.preventDefault();
    modalDeletesShow.value = false;
    modalUpdateShow.value = false;
}

const deleteQuote = (event: any) => {
    event.preventDefault();

    store.dispatch('deleteQuote', deleteId.value)
        .then(() => {
            window.location.reload();
        })
}

const updateQuote = (event: any) => {
    event.preventDefault();

    const updateQuoteObject = {
        id: updateId.value,
        quote: quote.value,
        author: author.value,
        genre: genre.value,
        createdAt: createdAt.value,
        updatedAt: date,
    }
    store.dispatch('updateQuote', updateQuoteObject)
        .then(() => {
            window.location.reload();
        })
}

</script>

<template>
    <form>
        <div class="form-container">
            <div class="form-inputs">
                <router-link to="/create" class="create-link"><button>создать цитату</button></router-link>
                <!-- <router-link to="/random" class="create-link"><button>сделать рандомную цитату</button></router-link> -->
                <div class="search-input">
                    <input type="text" v-model="searchInput" placeholder="Поиск...">
                </div>

                <div class="radio-buttons">
                    <label>
                        <input v-model="selectedChoice" type="radio" name="filter" value="quote">
                        Цитата
                    </label>

                    <label>
                        <input v-model="selectedChoice" type="radio" name="filter" value="author">
                        Автор
                    </label>
                </div>

                <!-- <div class="select-inputs">
                    <select v-model="selectedGenre">
                        <option disabled value="">Выбрать жанр</option>
                        <option v-for="(item) in genres" :value="item">{{ item }}</option>
                    </select>

                    <select v-model="selectedAuthor">
                        <option disabled value="">Выбрать автора</option>
                        <option v-for="(item) in authors" :value="item">{{ item }}</option>
                    </select>
                </div> -->
                <!-- <div class="select-inputs">
                    <select v-model="sortByDate">
                        <option disabled value="">Сортировка по датам</option>
                        <option value="bycreate">По созданию</option>
                        <option value="byupdate">По обновлению</option>
                    </select>
                </div> -->
            </div>

            <div class="card-container">
                <div class="card" v-for="(item, index) in  searchByChoice " :key="index">
                    <div class="card-author">{{ item.author }}</div>
                    <div class="card-quote">{{ item.quote }}</div>

                    <div class="card-container-updates">
                        Genre:
                        <div class="card-genre" v-for="(genre, index) in item.genre.split(',')" :key="index">
                            {{ genre }}
                        </div>
                    </div>

                    <div class="card-container-updates">
                        <div class="card-updated">Created: {{ item.createdAt }}</div>
                        <div class="card-updated">Last Updated: {{ item.updatedAt }}</div>
                    </div>

                    <div class="card-btns">
                        <!-- <button class="card-see">See details</button> -->
                        <button class="card-delete" @click="openModalDelete(item.id, $event)">Удалить цитату</button>
                        <button class="card-update" @click="openModalUpdate(item.id, item.createdAt, $event)">Обновить
                            цитату</button>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <div class="modal-container" v-if="modalDeletesShow">
        <div class="modal">
            <div class="modal-header">
                <h2>Are you sure about deleting data?</h2>
                <button @click="closeModal($event)">X</button>
            </div>
            <div class="modal-footer">
                <button @click="deleteQuote($event)">Удалить</button>
                <button @click="closeModal($event)">Закрыть</button>
            </div>
        </div>
    </div>

    <div class="modal-container" v-if="modalUpdateShow">

        <form>
            <div class="form-container">
                <div class="input-container">
                    <label for="quote" class="label">Текст цитаты:</label>
                    <input type="text" v-model="quote" id="quote" class="input" placeholder="Введите текст цитаты">
                </div>
                <div class="input-container">
                    <label for="author" class="label">Автор цитаты:</label>
                    <input type="text" v-model="author" id="author" class="input" placeholder="Введите автора цитаты">
                </div>

                <div class="input-container">
                    <label for="genre" class="label">Жанр:</label>
                    <select v-model="genre" id="genre" class="input">
                        <option disabled value="">Выберите один жанр</option>
                        <option v-for="( item ) in  quoteDetails.genres " :value="item">{{ item }}</option>
                    </select>
                </div>

                <button @click="updateQuote($event)" class="button">Обновить цитату</button>
                <button @click="closeModal($event)" class="button">Закрыть</button>
            </div>
        </form>
    </div>
</template>
  
<style scoped>
/* modal part */

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

    .input-container {
        flex-direction: row;
        align-items: center;
    }

    .label {
        font-size: 1.5rem;
    }

    .input {
        width: 100%;
        max-width: 300px;
    }

    .button {
        padding: 0.75rem 1.5rem;
        font-size: 1.2rem;
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
    margin-bottom: 1rem;
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

.select-inputs {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.select-inputs select {
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin-right: 1rem;
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


.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background-color: #fff;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.modal-header h2 {
    margin: 0;
}

.modal-header button {
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.modal-body {
    margin-bottom: 1rem;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.modal-footer button {
    background-color: #0099ff;
    color: #fff;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
}

/* modal update part */
</style>

