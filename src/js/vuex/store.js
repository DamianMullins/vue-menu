import Vue from 'vue';
import Vuex from 'vuex';
import menuApi from '../../api/menu';
import {
    MENU_GET_ALL_ITEMS,
    BASKET_ADD_ITEM,
    BASKET_REMOVE_ITEM,
    BASKET_INCREMENT_ITEM_QUANTITY,
    BASKET_DECREMENT_ITEM_QUANTITY
} from './mutation-types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict: debug,

    state: {
        menu: {
            items: []
        },

        basket: {
            items: [],
            deliveryFee: 0.5
        }
    },

    getters: {
        basketItems: (state, getters, { menu }) =>
            state.basket.items.map(({ id, quantity }) =>
                ({
                    ...menu.items.find(item => item.id === id),
                    quantity
                })),

        subtotal: (state, getters) => getters.basketItems
            .reduce((total, item) => total + (item.price * item.quantity), 0),

        total: (state, getters) => getters.subtotal + state.basket.deliveryFee
    },

    actions: {
        getAllMenuItems: ({ commit }) => {
            menuApi.getItems()
                .then(items => {
                    commit(MENU_GET_ALL_ITEMS, items);
                });
        },

        addItem: ({ state, commit }, { id }) => {
            const item = state.basket.items.find(i => i.id === id);

            if (item) {
                commit(BASKET_INCREMENT_ITEM_QUANTITY, id);
            } else {
                commit(BASKET_ADD_ITEM, id);
            }
        },

        removeItem: ({ state, commit }, { id }) => {
            const item = state.basket.items.find(i => i.id === id);

            if (item.quantity > 1) {
                commit(BASKET_DECREMENT_ITEM_QUANTITY, id);
            } else {
                commit(BASKET_REMOVE_ITEM, id);
            }
        }
    },

    mutations: {
        [MENU_GET_ALL_ITEMS]: (state, items) => {
            state.menu.items = items;
        },

        [BASKET_ADD_ITEM]: (state, id) => {
            state.basket.items.push({ id, quantity: 1 });
        },

        [BASKET_REMOVE_ITEM]: (state, id) => {
            state.basket.items = state.basket.items.filter(item => item.id !== id);
        },

        [BASKET_INCREMENT_ITEM_QUANTITY]: (state, id) => {
            const exisingItem = state.basket.items.find(item => item.id === id);
            exisingItem.quantity++;
        },

        [BASKET_DECREMENT_ITEM_QUANTITY]: (state, id) => {
            const exisingItem = state.basket.items.find(item => item.id === id);
            exisingItem.quantity--;
        }
    }
});
