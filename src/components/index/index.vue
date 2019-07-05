<template lang="html">
  <div>
    <router-link to="child">
      Go to child.
    </router-link>
    <router-view />
    <!-- 定义 -->
    <portal
      v-for="(cat, index) in ['shorthair', 'siamese']"
      :key="index"
      :to="cat"
    >
      <img
        v-if="index === 0"
        style="width: 10rem; height: 10rem;"
        src="@/assets/icon.png"
        alt="icon"
      >
      <p>猫咪是人类很好的朋友。</p>
      <p class="cat">
        {{ cat }}
      </p>
      <p v-if="cat === 'shorthair'">
        英国短毛猫非常漂亮。
      </p>
      <p v-if="cat === 'siamese'">
        暹罗猫是泰国的皇室猫。
      </p>
    </portal>
    <!-- 引用 -->
    <portal-target name="shorthair" />
    <portal-target name="siamese" />
    <el-button type="primary">
      主要按钮
    </el-button>
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
