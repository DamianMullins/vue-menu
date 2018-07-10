import i18n from './i18n';
import store from './store';

const menuItems = [
    {
        name: 'Traditional Lemonade &amp; Mint',
        price: 2.39
    },
    {
        name: 'Mojo Juice, Apple',
        price: 2.39
    },
    {
        name: 'Mojo Juice, Mango',
        price: 2.39
    },
    {
        name: 'Mojo Juice, Orange',
        price: 2.39
    },
    {
        name: 'Tropical Lightning, Apple',
        price: 2.39
    }
];

new Vue({
    i18n,

    el: '[data-menu-items]',

    data: {
        shared: store
    },

    created () {
        // Should be ajax call or similar
        this.shared.menu.items = menuItems;
    },

    methods: {
        addItem (item) {
            const exisingItem = this.shared.basket.items
                .find(i => i.name === item.name);

            if (exisingItem) {
                exisingItem.quantity += 1;
            } else {
                this.shared.basket.items
                    .push({ ...item, quantity: 1 });
            }
        }
    }
});
