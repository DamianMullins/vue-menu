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
        subtotal: state => state.basket.items
            .reduce((prev, item) => prev + (item.price * item.quantity), 0),

        total: (state, getters) => getters.subtotal + state.basket.deliveryFee
    },

    actions: {
        getAllMenuItems: ({ commit }) => {
            menuApi.getItems()
                .then(items => {
                    commit(MENU_GET_ALL_ITEMS, { items });
                });
        },

        addItem: ({ state, commit }, item) => {
            const exisingItem = state.basket.items.find(i => i.id === item.id);

            if (exisingItem) {
                commit(BASKET_INCREMENT_ITEM_QUANTITY, { item });
            } else {
                commit(BASKET_ADD_ITEM, { item });
            }
        },

        removeItem: ({ state, commit }, item) => {
            const exisingItem = state.basket.items.find(i => i.name === item.name);

            if (exisingItem.quantity > 1) {
                commit(BASKET_DECREMENT_ITEM_QUANTITY, { item });
            } else {
                commit(BASKET_REMOVE_ITEM, { item });
            }
        }
    },

    mutations: {
        [MENU_GET_ALL_ITEMS]: (state, { items }) => {
            state.menu.items = items;
        },

        [BASKET_ADD_ITEM]: (state, { item }) => {
            state.basket.items.push({ ...item, quantity: 1 });
        },

        [BASKET_REMOVE_ITEM]: (state, { item }) => {
            state.basket.items = state.basket.items.filter(i => i.name !== item.name);
        },

        [BASKET_INCREMENT_ITEM_QUANTITY]: (state, { item }) => {
            const exisingItem = state.basket.items.find(i => i.id === item.id);
            exisingItem.quantity++;
        },

        [BASKET_DECREMENT_ITEM_QUANTITY]: (state, { item }) => {
            const exisingItem = state.basket.items.find(i => i.id === item.id);
            exisingItem.quantity--;
        }
    }
});
