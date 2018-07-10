<template>
<div>
    <div v-for="item in shared.basket.items" :key="item.name">
        <div class="c-basket-row">
            <button class="o-btn o-btn--small" @click="removeItem(item)">
                -
                <span class="is-visuallyHidden" v-html="$t('menu.removeItem', { item: item.name })"></span>
            </button>
            <p class="c-basket-item">
                {{ item.quantity }} x
                <span v-html="item.name">{{ item.name }}</span>
            </p>
            <p class="c-basket-price">{{ $n(itemTotal(item), 'currency') }}</p>
        </div>
    </div>
</div>
</template>

<script>
import store from "./store";

export default {
  data() {
    return {
      shared: store
    };
  },

  methods: {
    itemTotal(item) {
      return item.price * item.quantity;
    },

    removeItem(item) {
      const exisingItem = this.shared.basket.items.find(
        i => i.name === item.name
      );

      if (exisingItem.quantity > 1) {
        exisingItem.quantity -= 1;
      } else {
        this.shared.basket.items = this.shared.basket.items.filter(
          i => i.name !== item.name
        );
      }
    }
  }
};
</script>
