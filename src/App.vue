<template>
  <div id="app">
    <div class="bg">
      {{ say }} 世界
    </div>
    <div class="cat">
      Real server cat: {{ cat }}
    </div>
    <div class="url">
      Mock server list: {{ list }}
    </div>
    <img
      style="width: 10rem; height: 10rem;"
      src="@/assets/images/icon.png"
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
      list: 'Loading',
      errored: 'error'
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      axios
        .get('/api/cat')
        .then(res => {
          this.cat = res.data.cat
        })
        .catch(error => {
          this.errored = error
        })
      axios
        .post('/api/list')
        .then(res => {
          this.list = res.data
        })
        .catch(error => {
          this.errored = error
        })
    })
  }
}
</script>

<style>
:root {
  --myColor: red;
}

.bg {
  color: var(--myColor);
  background: url('~@/assets/images/icon.png') center;
}

.red {
  color: red;
  font-size: 5rem;
}
</style>
