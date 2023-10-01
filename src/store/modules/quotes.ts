import axios from 'axios';

const state = {
    quotes: [],
    singleQuote: []
}

const mutations = {
    SET_QUOTES(state: any, payload: any) {
        state.quotes = payload;
    },

    SET_SINGLE_QUOTE(state: any, payload: any) {
        state.singleQuote = payload;
    }
}

const actions = {
    async createQuote(quotes: { author: string, quote: string, genre: string, createdAt: string, updatedAt: string }) {

        try {
            await axios.post('https://backend-aliftech.onrender.com/quotes', quotes)
        } catch (error) {
            throw new Error('Произошла ошибка при создании цитаты');
        }
    },

    async getSingleQuote({ commit }: any, id: string) {
        try {
            await axios.get(`https://backend-aliftech.onrender.com/quotes/${id}`)
                .then((response: any) => {
                    commit("SET_SINGLE_QUOTE", response.data);
                })
        } catch (error) {
            throw new Error('Произошла ошибка при получении цитаты.');
        }
    },

    async getQuotes({ commit }: any) {
        try {
            await axios.get('https://backend-aliftech.onrender.com/quotes')
                .then((response: any) => {
                    commit("SET_QUOTES", response.data);
                })
        } catch (error) {
            throw new Error('Произошла ошибка при получении цитат.');
        }
    },

    async updateQuote({ commit }: any, quote: { id: number, author: string, quote: string, genre: string, updatedAt: string }) {

        try {
            await axios.put(`https://backend-aliftech.onrender.com/quotes/${quote.id}`, quote)
        } catch (error) {
            throw new Error('Произошла ошибка при обновлении цитаты.');
        }
    },

    async deleteQuote({ commit }: any, id: number) {
        try {
            await axios.delete(`https://backend-aliftech.onrender.com/quotes/${id}`)
        } catch (error) {
            throw new Error('Произошла ошибка при удалении цитаты.');
        }
    }
}

const getters = {
    getQuotes: (state: any) => state.quotes,
    getSingleQuote: (state: any) => state.singleQuote
}

export default {
    state,
    getters,
    mutations,
    actions,
};