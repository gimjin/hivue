<template lang="html">
  <div>
    <img
      style="width: 2rem; display: block;"
      src="@/assets/icon.png"
      alt="icon"
    >
    <el-link @click="$router.push('child')">
      Go to child
    </el-link>
    <router-view />
    <p>
      <span class="cat">{{ name }}</span> is Thai royal cat.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.cat {
  color: red;
  user-select: none;
  background: url("~@/assets/icon.png") center;
}
</style>

<script src="./index.js"></script>
