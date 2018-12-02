<template>
  <div id="app">
    <div class="text-color">
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
      url: 'Loading'
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
          console.log(error)
          this.errored = true
        })
      axios
        .post('/api/test-cat')
        .then(response => {
          this.cat = response.data.cat
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    })
  }
}
</script>

<style>
.text-color {
  color: blue;
}
</style>
