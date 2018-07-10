import Vue from 'vue';
import VueI18n from 'vue-i18n';
import i18n from './i18n';
import localeChanger from './locale-changer.vue';
import menuItems from './menu-items.vue';
import basketItems from './basket-items.vue';
import basketTotals from './basket-totals.vue';

Vue.use(VueI18n);

new Vue({
    i18n,
    el: '[data-locale-changer]',
    render: h => h(localeChanger)
});

new Vue({
    i18n,
    el: '[data-menu-items]',
    render: h => h(menuItems)
});

new Vue({
    i18n,
    el: '[data-basket-items]',
    render: h => h(basketItems)
});

new Vue({
    i18n,
    el: '[data-basket-totals]',
    render: h => h(basketTotals)
});
