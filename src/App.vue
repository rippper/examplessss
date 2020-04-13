<template>
  <div class="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>

    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"/>
    </transition>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  .router-fade-enter-active,
  .router-fade-leave-active {
    transition: opacity 0.3s;
  }

  .router-fade-enter,
  .router-fade-leave-active {
    opacity: 0;
  }
</style>
