import axios from 'axios';
import type { IQuote } from '@/models';

const state: {
    quotes: Array<IQuote>,
    singleQuote: Partial<IQuote>
} = {
    quotes: [],
    singleQuote: {}
}

const mutations = {
    SET_QUOTES(state: { quotes: Array<IQuote> }, payload: Array<IQuote>) {
        state.quotes = payload;
    },

    SET_SINGLE_QUOTE(state: { singleQuote: IQuote }, payload: IQuote) {
        state.singleQuote = payload;
    }
}

const actions = {
    async createQuote({ commit }: any, quotes: IQuote) {

        try {
            await axios.post('https://backend-aliftech.onrender.com/quotes', quotes)
        } catch (error) {
            throw new Error('Произошла ошибка при создании цитаты');
        }
    },

    async getSingleQuote({ commit }: any, id: string) {
        try {
            await axios.get(`https://backend-aliftech.onrender.com/quotes/${id}`)
                .then((response) => {
                    commit("SET_SINGLE_QUOTE", response.data);
                })
        } catch (error) {
            throw new Error('Произошла ошибка при получении цитаты.');
        }
    },

    async getQuotes({ commit }: any) {
        try {
            await axios.get('https://backend-aliftech.onrender.com/quotes')
                .then((response) => {
                    commit("SET_QUOTES", response.data);
                })
        } catch (error) {
            throw new Error('Произошла ошибка при получении цитат.');
        }
    },

    async updateQuote({ commit }: any, quote: IQuote) {

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
    getQuotes: (state: { quotes: Array<IQuote> }) => state.quotes,
    getSingleQuote: (state: { singleQuote: IQuote }) => state.singleQuote
}

export default {
    state,
    getters,
    mutations,
    actions,
};