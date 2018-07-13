import Vue from 'vue';
import i18n from './i18n';
import store from './vuex/store';
import menuItems from './menu-items.vue';
import basketItems from './basket-items.vue';
import basketTotals from './basket-totals.vue';

new Vue({
    el: '[data-menu-items]',
    i18n,
    store,
    render: h => h(menuItems)
});

new Vue({
    el: '[data-basket-items]',
    i18n,
    store,
    render: h => h(basketItems)
});

new Vue({
    el: '[data-basket-totals]',
    i18n,
    store,
    render: h => h(basketTotals)
});
