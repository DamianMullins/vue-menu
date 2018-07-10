import i18n from './i18n';
import store from './store';

new Vue({
    i18n,

    el: '[data-basket-items]',

    data: {
        shared: store
    },

    methods: {
        itemTotal (item) {
            return item.price * item.quantity;
        },

        removeItem (item) {
            const exisingItem = this.shared.basket.items
                .find(i => i.name === item.name);

            if (exisingItem.quantity > 1) {
                exisingItem.quantity -= 1;
            } else {
                this.shared.basket.items = this.shared.basket.items.filter(i => i.name !== item.name);
            }
        }

    }
});
