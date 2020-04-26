<template lang="html">
  <div>
    <img
      style="width: 2rem; display: block;"
      src="@/assets/icon.png"
      alt="icon"
    >
    <el-link class="btn" @click="$router.push('child')">
      Go to child
    </el-link>
    <router-view />
    <p>{{ getCatDetail }}</p>
  </div>
</template>

<!-- Webapp NOT recommend write css in component -->
<style lang="scss" scoped>
.btn:hover {
  color: red;
  background: url("~@/assets/icon.png") center;
}
</style>

<script src="./Parent.js"></script>
