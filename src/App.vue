<template>
  <div id="app">
    <div class="bg">
      {{ say }} 世界
    </div>
    <div class="cat">
      Real server cat: {{ cat }}
    </div>
    <div class="url">
      Mock server url: {{ url }}
    </div>
    <img
      style="width: 10rem; height: 10rem;"
      src="@/assets/icon.png"
      alt="icon"
    >
    <div class="card">
      &nbsp;
    </div>
    <div class="message">
      &nbsp;
    </div>
    <div class="google">
      &nbsp;
    </div>
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
  --myColor: red;
  color: var(--myColor);
  background: url('~@/assets/icon.png') center;
}

/* postcss-sprites 不能使用~@别名，因为会被url-loader优先处理 */
.card {
  display: block;
  width: 200px;
  height: 200px;
  background: url('assets/sprite/card.jpg');
}

.message {
  display: block;
  width: 174px;
  height: 174px;
  background: url('assets/sprite/message.jpg');
}
</style>
<style lang="scss">
 /* 引入node_modules时需要用到 ～ 符号 */
@import '~retinajs/dist/_retina.scss';

.google {
  display: block;
  width: 300px;
  height: 99px;
  @include retina(
    '~@/assets/google-logo.png',
    3,
    cover,
    center center no-repeat
  );
}
</style>
