import { createStore } from 'vuex';
import quotes from './modules/quotes';

const store = createStore({
    modules: {
        quotes: quotes,
    }
});

export default store;