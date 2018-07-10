import i18n from './i18n';
import store from './store';

new Vue({
    i18n,

    el: '[data-basket-totals]',

    data: {
        shared: store
    },

    computed: {
        subtotal () {
            return this.shared.basket.items
                .reduce((prev, item) => prev + (item.price * item.quantity), 0);
        },

        total () {
            return this.subtotal + this.shared.basket.deliveryFee;
        }
    }
});
