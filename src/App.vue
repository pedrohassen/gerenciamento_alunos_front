<template>
  <v-app>
    <v-main class="fill-height">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss">
@import 'vuetify/styles';

html, body, #app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

.v-application {
  min-height: 100vh;
}
</style>
