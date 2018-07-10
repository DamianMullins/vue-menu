<template>
<div>
    <select v-model="locale" @change="updateLocale">
        <option v-for="lang in langs" :value="lang" :key="lang">{{ lang }}</option>
    </select>
</div>
</template>

<script>
import i18n from "./i18n";
import store from "./store";

export default {
  data() {
    return {
      shared: store,
      langs: ["en-GB", "en-US"],
      locale: i18n.locale
    };
  },

  methods: {
    updateLocale() {
      i18n.locale = this.locale;
    }
  }
};
</script>
