import axios from 'axios';

const state = {
    genres: [],
    quotes: [],
    authors: [],
    randomQuotes: [],
    singleQuote: []
}

const mutations = {
    SET_QUOTES(state: any, payload: any) {
        state.quotes = payload;
    },

    SET_AUTHORS(state: any, payload: any) {
        state.authors = payload;
    },

    SET_RANDOM_QUOTES(state: any, payload: any) {
        state.randomQuotes = payload;
    },

    SET_GENRES(state: any, payload: any) {
        state.genres = payload;
    },
    SET_SINGLE_QUOTE(state: any, payload: any) {
        state.singleQuote = payload;
    }
}

const actions = {
    async createQuote({ commit }: any, quotes: { author: string, quote: string, genre: string, createdAt: string, updatedAt: string }) {

        try {
            await axios.post('https://backend-aliftech.onrender.com/quotes', quotes)
                .then((response: any) => {
                    console.log(response);
                })
        } catch (error) {
            console.log(error);
        }
    },

    async getSingleQuote({ commit }: any, id: string) {
        try {
            await axios.get(`https://backend-aliftech.onrender.com/quotes/${id}`)
                .then((response: any) => {
                    commit("SET_SINGLE_QUOTE", response.data);
                })
        } catch (error) {
            throw new Error('something went wrong');
        }
    },

    async getQuotes({ commit }: any) {
        try {
            await axios.get('https://backend-aliftech.onrender.com/quotes')
                .then((response: any) => {
                    commit("SET_QUOTES", response.data);
                })
        } catch (error) {
            console.log(error);
        }
    },

    async updateQuote({ commit }: any, quote: { id: number, author: string, quote: string, genre: string, updatedAt: string }) {

        try {
            await axios.put(`https://backend-aliftech.onrender.com/quotes/${quote.id}`, quote)
                .then((response: any) => {
                    console.log(response.data);
                })
        } catch (error) {
            console.log(error);
        }
    },

    async deleteQuote({ commit }: any, id: number) {
        try {
            await axios.delete(`https://backend-aliftech.onrender.com/quotes/${id}`)
        } catch (error) {
            console.log(error);
        }
    },

    async getAuthors({ commit }: any) {
        const authors: Array<string> = [];

        try {
            await axios.get('https://backend-aliftech.onrender.com/quotes')
                .then((response) => {
                    response.data.forEach((element: { author: string }) => {
                        authors.push(element.author)
                    });
                    return authors;
                })
                .then((authors) => {
                    commit('SET_AUTHORS', authors);
                })
        } catch (error) {
            console.log(error);
        }
    },

    async generateRandomQuote({ commit }: any) {
        try {
            await axios.get('https://backend-aliftech.onrender.com/quotes')
                .then((response) => {
                    const randomIndex = Math.round(Math.random() * (response.data.length - 1));
                    // console.log(response.data[randomIndex]);
                    commit('SET_RANDOM_QUOTES', response.data[randomIndex]);
                })
        } catch (error) {
            console.log(error);
        }
    },

    async getGenresOfQuote({ commit }: any) {
        try {
            await axios.get('https://backend-aliftech.onrender.com/quotes')
                .then((response) => {
                    const set: any = new Set();

                    response.data.map((genres: any) => {
                        genres.genre.split(",").map((genre: any) => {
                            set.add(genre);
                        })
                    })

                    commit("SET_GENRES", set)
                })
        } catch (error) {
            console.error(error);
        }
    }
}

const getters = {
    getQuotes: (state: any) => state.quotes,
    getGenres: (state: any) => state.genres,
    getAuthors: (state: any) => state.authors,
    getRandomQuotes: (state: any) => state.randomQuotes,
    getSingleQuote: (state: any) => state.singleQuote
}

export default {
    state,
    getters,
    mutations,
    actions,
};