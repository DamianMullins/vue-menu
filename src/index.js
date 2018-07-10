/* global Vue */

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

const store = {
  menu: {
    items: []
  },
  basket: {
    items: [],
    deliveryFee: 0.5
  }
};

Vue.filter('toCurrency', value => {
  if (typeof value !== 'number') {
    return value;
  }

  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
  });

  return formatter.format(value);
});

new Vue({
  el: '[data-menu-items]',
  data: {
    shared: store
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
});

new Vue({
  el: '[data-basket-items]',
  data: {
    shared: store
  },
  methods: {
    itemTotal(item) {
      return item.price * item.quantity;
    }
  }
});

new Vue({
  el: '[data-basket-totals]',
  data: {
    shared: store
  },
  computed: {
    subtotal() {
      return this.shared.basket.items.reduce(
        (prev, item) => prev + item.price * item.quantity,
        0
      );
    },
    total() {
      return this.subtotal + this.shared.basket.deliveryFee;
    }
  }
});
