<template>
  <Header />
  <router-view></router-view>
  <!-- <Footer /> -->
</template>

<script>
import Header from '@/components/Header.vue';
// import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: { Header },
}
</script>

<style>
* {
  font-family: 'XMYekanRegular';
  font-weight: normal;
  font-style: normal;
}
</style>