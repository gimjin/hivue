<template>
  <div id="app">
    <div class="bg">
      {{ say }} 世界
    </div>
    <div>
      Real server cat: {{ cat }}
    </div>
    <div>
      Mock server url: {{ url }}
    </div>
    <img
      style="width: 10rem; height: 10rem;"
      src="@/assets/icon.png"
      alt="icon"
    >
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      say: 'Hello',
      cat: 'Loading',
      url: 'Loading',
      errored: 'error'
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      axios
        .get('/api/test-url')
        .then(response => {
          this.url = response.data.url
        })
        .catch(error => {
          this.errored = error
        })
      axios
        .post('/api/test-cat')
        .then(response => {
          this.cat = response.data.cat
        })
        .catch(error => {
          this.errored = error
        })
    })
  }
}
</script>

<style>
.bg {
  background: url('~@/assets/icon.png') center;
}
</style>
