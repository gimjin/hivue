<template>
  <div id="app">
    <div class="cat">
      {{ cat }}
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
      cat: '$ npm run mock'
    }
  },
  mounted () {
    this.$axios
      .get(api.cat)
      .then(res => {
        this.cat = res.data.list
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
