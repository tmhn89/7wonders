<template>
  <span>{{ animatedValue }}</span>
</template>

<script>
import { TweenLite } from 'gsap/TweenMax'

export default {
  name: 'Animated-Num',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      tweenTime: 0.5,
      tweenedNumber: 0
    }
  },
  computed: {
    animatedValue: function () {
      return this.tweenedNumber.toFixed(0)
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      TweenLite.to(this.$data, this.tweenTime, { tweenedNumber: newValue })
    }
  }
}
</script>
