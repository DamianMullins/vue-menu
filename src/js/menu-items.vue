<template>
<div>
    <div v-for="item in shared.menu.items" :key="item.name">
        <section class="g c-listing-item">
            <div class="g-col g-span9">
                <p class="c-listing-item-text" v-html="item.name">{{ item.name }}</p>
                <p class="c-listing-item-text">{{ $n(item.price, 'currency') }}</p>
            </div>
            <div class="g-col g-span3 text-right">
                <button class="o-btn o-btn--primary o-btn--small" @click="addItem(item)">
                    +
                    <span class="is-visuallyHidden" v-html="$t('menu.addItem', { item: item.name })"></span>
                </button>
            </div>
        </section>
    </div>
</div>
</template>

<script>
import store from "./store";

const menuItems = [
  {
    name: "Traditional Lemonade &amp; Mint",
    price: 2.39
  },
  {
    name: "Mojo Juice, Apple",
    price: 2.39
  },
  {
    name: "Mojo Juice, Mango",
    price: 2.39
  },
  {
    name: "Mojo Juice, Orange",
    price: 2.39
  },
  {
    name: "Tropical Lightning, Apple",
    price: 2.39
  }
];

export default {
  data() {
    return {
      shared: store
    };
  },

  created() {
    // Should be ajax call or similar
    this.shared.menu.items = menuItems;
  },

  methods: {
    addItem(item) {
      const exisingItem = this.shared.basket.items.find(
        i => i.name === item.name
      );

      if (exisingItem) {
        exisingItem.quantity += 1;
      } else {
        this.shared.basket.items.push({ ...item, quantity: 1 });
      }
    }
  }
};
</script>
