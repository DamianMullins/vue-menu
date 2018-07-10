import i18n from './i18n';
import store from './store';

new Vue({
    i18n,

    el: '[data-locale-changer]',

    data: {
        shared: store,
        langs: ['en-GB', 'en-US'],
        locale: i18n.locale
    },

    methods: {
        updateLocale () {
            i18n.locale = this.locale;
        }
    }
});
