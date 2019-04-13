<template>
  <div id="app">
    <div class="cat">
      {{ cat }} <br>
      {{ list }}
    </div>
    <img
      style="width: 10rem; height: 10rem;"
      src="@/assets/icon.png"
      alt="icon"
    >
  </div>
</template>

<script>
import api from '@/axios/api'

export default {
  name: 'App',
  data: function () {
    return {
      cat: 'British shorthair',
      list: 'Cats list'
    }
  },
  mounted () {
    this.$axios
      .post(api.cat)
      .then(res => {
        this.cat = res.data.cat
      })

    this.$axios
      .get(api.list)
      .then(res => {
        this.list = res.data.list
      })
  }
}
</script>

<style>
:root {
  --myColor: red;
}

.cat {
  color: var(--myColor);
  user-select: none;
  background: url("~@/assets/icon.png") center;
}
</style>
