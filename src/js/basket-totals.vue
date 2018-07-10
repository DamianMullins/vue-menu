<template>
<div>
    <div class="c-basket-row c-basket-row--spaced">
        <p class="c-basket-item c-basket-subtotal u-uppercase">subtotal</p>
        <p class="c-basket-price c-basket-subtotal">{{ $n(subtotal, 'currency') }}</p>
    </div>

    <div class="c-basket-group c-basket-group--spaced">
        <div class="c-basket-row">
            <p class="c-basket-item">Delivery Fee</p>
            <p class="c-basket-price">{{ $n(shared.basket.deliveryFee, 'currency') }}</p>
        </div>
    </div>

    <div class="c-basket-row">
        <p class="c-basket-item c-basket-total gamma u-uppercase">total</p>
        <p class="c-basket-price c-basket-total gamma">
            {{ $n(total, 'currency') }}
        </p>
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
};
</script>
