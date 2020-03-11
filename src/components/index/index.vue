<template lang="html">
  <div>
    <el-link @click="$router.push('child')">
      Go to child
    </el-link>
    <router-view />
    <!-- template -->
    <portal
      v-for="(cat, index) in ['shorthair', 'siamese']"
      :key="index"
      :to="cat"
    >
      <p v-if="cat === 'shorthair'">
        <span class="cat">{{ name }}</span> is very beautiful.
      </p>
      <p v-if="cat === 'siamese'">
        <span class="cat">{{ name }}</span> is Thai royal cat.
      </p>
    </portal>
    <!-- use template -->
    <portal-target name="shorthair" />
    <portal-target name="siamese" />
    <img
      style="width: 2rem; height: 2rem;"
      src="@/assets/icon.png"
      alt="icon"
    >
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
